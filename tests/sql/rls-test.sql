\set ON_ERROR_STOP on
\set A '11111111-1111-1111-1111-111111111111'
\set B '22222222-2222-2222-2222-222222222222'
set role authenticated;
-- A sparar sin första profil
select set_config('request.jwt.claim.sub', :'A', false);
select 'A load (tom)' as steg, public.kodstig_load() as res;
select 'A save rev0' as steg, public.kodstig_save('{"completed":{"cs-hello":{"at":"x"}},"epoch":0}', 0, 0) as res;
select 'A save gammal rev -> konflikt' as steg, public.kodstig_save('{"completed":{}}', 0, 0)->>'ok' as ok;
select 'A save rev1' as steg, public.kodstig_save('{"completed":{"cs-hello":{"at":"x"},"cs-int":{"at":"y"}}}', 1, 0) as res;
-- B ser inte A:s data
select set_config('request.jwt.claim.sub', :'B', false);
select 'B load' as steg, public.kodstig_load() as res;
select 'B ser rader' as steg, count(*) from public.kodstig_profiles;
select 'B save' as steg, public.kodstig_save('{"completed":{}}', 0, 0) as res;
-- B försöker skriva A:s rad direkt: RLS stoppar
update public.kodstig_profiles set doc = '{"hack":true}' where user_id = :'A';
select 'B direkt-update påverkade' as steg, (select count(*) from public.kodstig_profiles where doc ? 'hack') as rader;
do $$ begin
  begin
    insert into public.kodstig_profiles(user_id, doc) values ('11111111-1111-1111-1111-111111111111', '{}');
    raise notice 'FEL: B kunde skapa rad åt A';
  exception when others then raise notice 'OK: B kan inte skapa rad åt A (%)', sqlerrm;
  end;
end $$;
-- A nollställer; äldre flik med epoch 0 får konflikt
select set_config('request.jwt.claim.sub', :'A', false);
select 'A reset' as steg, public.kodstig_reset('{"completed":{}}') as res;
select 'gammal flik sparar epoch0' as steg, public.kodstig_save('{"completed":{"cs-hello":{"at":"x"}}}', 2, 0) as res;
select 'A load efter reset' as steg, public.kodstig_load() as res;
-- utloggad (anon) får inget
reset role;
set role anon;
select set_config('request.jwt.claim.sub', '', false);
do $$ begin
  begin
    perform public.kodstig_load();
    raise notice 'FEL: anon kunde anropa kodstig_load';
  exception when others then raise notice 'OK: anon nekas (%)', sqlerrm;
  end;
end $$;
