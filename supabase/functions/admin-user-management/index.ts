import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) return json({ error: 'User management is not configured' }, 500);
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return json({ error: 'Authentication required' }, 401);

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const sessionClient = createClient(supabaseUrl, serviceRoleKey, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } });
  const { data: userData } = await sessionClient.auth.getUser();
  const actor = userData.user;
  if (!actor) return json({ error: 'Authentication required' }, 401);
  const { data: actorRole } = await admin.from('user_roles').select('role').eq('user_id', actor.id).eq('role', 'admin').maybeSingle();
  if (!actorRole) return json({ error: 'Admin access required' }, 403);

  try {
    const body = request.method === 'POST' ? await request.json() : {};
    if (body.action === 'create') {
      const email = String(body.email ?? '').trim().toLowerCase();
      const password = String(body.password ?? '');
      const role = body.role === 'admin' ? 'admin' : 'user';
      if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return json({ error: 'Use a valid email and a password of at least 8 characters.' }, 400);
      const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: false });
      if (createError || !created.user) return json({ error: createError?.message ?? 'Unable to create account.' }, 400);
      const { error: roleError } = await admin.from('user_roles').insert({ user_id: created.user.id, role });
      if (roleError) return json({ error: roleError.message }, 400);
      return json({ user: { id: created.user.id, email: created.user.email, role } }, 201);
    }
    if (body.action === 'assign-role') {
      const userId = String(body.userId ?? '');
      const role = body.role === 'admin' ? 'admin' : 'user';
      if (!userId) return json({ error: 'User is required.' }, 400);
      await admin.from('user_roles').delete().eq('user_id', userId);
      const { error } = await admin.from('user_roles').insert({ user_id: userId, role });
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }
    const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({ page: 1, perPage: 100 });
    if (usersError) throw usersError;
    const { data: roles, error: rolesError } = await admin.from('user_roles').select('user_id, role');
    if (rolesError) throw rolesError;
    const roleMap = new Map((roles ?? []).map((role) => [role.user_id, role.role]));
    return json({ users: usersData.users.map((user) => ({ id: user.id, email: user.email, createdAt: user.created_at, confirmed: Boolean(user.email_confirmed_at), role: roleMap.get(user.id) ?? 'user' })) });
  } catch (error) {
    console.error('admin-user-management error', error);
    return json({ error: 'Unable to complete that account action.' }, 500);
  }
});