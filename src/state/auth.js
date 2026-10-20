// Inloggning via Supabase Auth (Google och e-postlänk).
// Konfigureras med VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY vid bygget, eller
// i public/config.js för en färdigbyggd sida. Anon-nyckeln är publik i
// Supabase: säkerheten ligger i radnivåsäkerheten i databasen.

const runtime = (typeof window !== 'undefined' && window.KODSTIG_CONFIG) || {};
export const config = {
  url: runtime.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: runtime.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  google: runtime.googleEnabled !== false,
  email: runtime.emailEnabled !== false,
};
export const authConfigured = Boolean(config.url && config.anonKey);

let clientPromise = null;
export function supabase() {
  if (!authConfigured) return Promise.resolve(null);
  clientPromise ||= import('@supabase/supabase-js').then(({ createClient }) => createClient(config.url, config.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce', storageKey: 'kodstig.auth' },
  }));
  return clientPromise;
}

const redirect = () => `${location.origin}${location.pathname}`;

export async function signInWithGoogle() {
  const sb = await supabase();
  const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirect() } });
  if (error) throw error;
}

export async function signInWithEmail(email) {
  const sb = await supabase();
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect(), shouldCreateUser: true } });
  if (error) throw error;
}

export async function signOut() {
  const sb = await supabase();
  if (sb) await sb.auth.signOut();
}

/** Anropar cb(user|null) direkt och vid varje ändring. */
export async function watchAuth(cb) {
  const sb = await supabase();
  if (!sb) { cb(null); return () => {}; }
  let last;
  const emit = (session) => {
    const user = session && session.user ? { id: session.user.id, email: session.user.email || '', name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '' } : null;
    const key = user ? user.id : null;
    if (key === last) return;
    last = key;
    cb(user);
  };
  const { data } = await sb.auth.getSession();
  emit(data.session);
  const { data: sub } = sb.auth.onAuthStateChange((_event, session) => emit(session));
  return () => sub.subscription.unsubscribe();
}
