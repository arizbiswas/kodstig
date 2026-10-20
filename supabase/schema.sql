-- Kodstig: kontolagring i Supabase (Postgres).
-- Kör hela filen en gång i Supabase: SQL Editor -> New query -> Run.
--
-- Säkerhet: varje rad tillhör auth.uid() från den inloggades verifierade JWT.
-- Klienten skickar aldrig något användar-ID; servern avgör ägaren.
-- Radnivåsäkerhet (RLS) gör att en användare bara kan läsa och skriva sin egen rad.

create table if not exists public.kodstig_profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  doc jsonb not null default '{}'::jsonb,
  rev bigint not null default 0,
  epoch integer not null default 0,
  updated_at timestamptz not null default now(),
  constraint kodstig_doc_size check (pg_column_size(doc) < 1500000)
);

alter table public.kodstig_profiles enable row level security;

drop policy if exists "egen profil: läsa" on public.kodstig_profiles;
drop policy if exists "egen profil: skapa" on public.kodstig_profiles;
drop policy if exists "egen profil: ändra" on public.kodstig_profiles;
create policy "egen profil: läsa" on public.kodstig_profiles
  for select to authenticated using (user_id = auth.uid());
create policy "egen profil: skapa" on public.kodstig_profiles
  for insert to authenticated with check (user_id = auth.uid());
create policy "egen profil: ändra" on public.kodstig_profiles
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

revoke all on public.kodstig_profiles from anon;
revoke all on public.kodstig_profiles from public;
grant select, insert, update on public.kodstig_profiles to authenticated;

-- Hämtar den inloggades profil, eller null om den inte finns än.
create or replace function public.kodstig_load()
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select jsonb_build_object('doc', doc, 'rev', rev, 'epoch', epoch)
  from public.kodstig_profiles
  where user_id = auth.uid();
$$;

-- Sparar profilen med optimistisk låsning. Om någon annan flik eller enhet
-- hunnit spara (rev) eller om profilen nollställts (epoch) returneras den
-- aktuella versionen i stället, så att klienten kan slå ihop eller byta ut.
create or replace function public.kodstig_save(p_doc jsonb, p_rev bigint, p_epoch integer)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cur public.kodstig_profiles;
begin
  if uid is null then
    raise exception 'Inte inloggad' using errcode = '28000';
  end if;
  if jsonb_typeof(p_doc) <> 'object' then
    raise exception 'Ogiltig profil' using errcode = '22023';
  end if;

  select * into cur from public.kodstig_profiles where user_id = uid for update;

  if not found then
    if p_rev <> 0 then
      return jsonb_build_object('ok', false, 'current', null);
    end if;
    insert into public.kodstig_profiles (user_id, doc, rev, epoch)
    values (uid, jsonb_set(p_doc, '{epoch}', '0'::jsonb), 1, 0)
    on conflict (user_id) do nothing;
    if not found then
      select * into cur from public.kodstig_profiles where user_id = uid;
      return jsonb_build_object('ok', false, 'current',
        jsonb_build_object('doc', cur.doc, 'rev', cur.rev, 'epoch', cur.epoch));
    end if;
    return jsonb_build_object('ok', true, 'rev', 1, 'epoch', 0);
  end if;

  if cur.rev <> p_rev or cur.epoch <> p_epoch then
    return jsonb_build_object('ok', false, 'current',
      jsonb_build_object('doc', cur.doc, 'rev', cur.rev, 'epoch', cur.epoch));
  end if;

  update public.kodstig_profiles
     set doc = jsonb_set(p_doc, '{epoch}', to_jsonb(cur.epoch)),
         rev = cur.rev + 1,
         updated_at = now()
   where user_id = uid;
  return jsonb_build_object('ok', true, 'rev', cur.rev + 1, 'epoch', cur.epoch);
end;
$$;

-- Nollställer framstegen. Epoch ökar, så äldre flikar och enheter kan inte
-- återställa gammal data efteråt.
create or replace function public.kodstig_reset(p_doc jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cur public.kodstig_profiles;
begin
  if uid is null then
    raise exception 'Inte inloggad' using errcode = '28000';
  end if;
  insert into public.kodstig_profiles as p (user_id, doc, rev, epoch)
  values (uid, p_doc, 1, 1)
  on conflict (user_id) do update
    set doc = excluded.doc, epoch = p.epoch + 1, rev = p.rev + 1, updated_at = now()
  returning * into cur;
  update public.kodstig_profiles
     set doc = jsonb_set(cur.doc, '{epoch}', to_jsonb(cur.epoch))
   where user_id = uid
  returning * into cur;
  return jsonb_build_object('doc', cur.doc, 'rev', cur.rev, 'epoch', cur.epoch);
end;
$$;

revoke all on function public.kodstig_load() from public, anon;
revoke all on function public.kodstig_save(jsonb, bigint, integer) from public, anon;
revoke all on function public.kodstig_reset(jsonb) from public, anon;
grant execute on function public.kodstig_load() to authenticated;
grant execute on function public.kodstig_save(jsonb, bigint, integer) to authenticated;
grant execute on function public.kodstig_reset(jsonb) to authenticated;
