import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ManagedUser = { id: string; email?: string; createdAt: string; confirmed: boolean; role: 'admin' | 'user' };

const AdminUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('admin');
  const call = async (body?: Record<string, string>) => {
    const { data, error } = await supabase.functions.invoke('admin-user-management', { body: body ?? {} });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };
  const { data, isLoading } = useQuery({ queryKey: ['managed-users'], queryFn: () => call() as Promise<{ users: ManagedUser[] }> });
  const createMutation = useMutation({
    mutationFn: () => call({ action: 'create', email, password, role }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['managed-users'] }); setEmail(''); setPassword(''); toast({ title: 'Account created', description: 'The user must confirm their email before signing in.' }); },
    onError: (error) => toast({ title: 'Unable to create account', description: error.message, variant: 'destructive' }),
  });
  const roleMutation = useMutation({
    mutationFn: ({ userId, nextRole }: { userId: string; nextRole: string }) => call({ action: 'assign-role', userId, role: nextRole }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['managed-users'] }); toast({ title: 'Role updated' }); },
    onError: (error) => toast({ title: 'Unable to update role', description: error.message, variant: 'destructive' }),
  });
  const users = data?.users ?? [];
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-display font-bold">User Management</h2><p className="text-muted-foreground">Create dashboard accounts and manage their access level.</p></div>
      <Card className="max-w-2xl"><CardHeader><CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" />Create account</CardTitle></CardHeader><CardContent><form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); createMutation.mutate(); }}>
        <div className="space-y-2"><Label htmlFor="user-email">Email</Label><Input id="user-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="user-password">Temporary password</Label><Input id="user-password" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
        <div className="space-y-2"><Label>Role</Label><Select value={role} onValueChange={(value: 'admin' | 'user') => setRole(value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Administrator</SelectItem><SelectItem value="user">User</SelectItem></SelectContent></Select></div>
        <div className="flex items-end"><Button type="submit" disabled={createMutation.isPending}>{createMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}Create account</Button></div>
      </form></CardContent></Card>
      <div className="overflow-hidden rounded-lg border"><div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b bg-muted/30 px-4 py-3 text-sm font-medium"><span>Email</span><span>Role</span><span>Verification</span><span>Access</span></div>
        {isLoading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div> : users.map((user) => <div key={user.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 border-b px-4 py-4 text-sm last:border-b-0"><span className="truncate">{user.email ?? '—'}</span><Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge><span className="text-muted-foreground">{user.confirmed ? 'Confirmed' : 'Pending'}</span><Select value={user.role} onValueChange={(nextRole) => roleMutation.mutate({ userId: user.id, nextRole })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Administrator</SelectItem><SelectItem value="user">User</SelectItem></SelectContent></Select></div>)}
      </div>
    </div>
  );
};

export default AdminUsers;