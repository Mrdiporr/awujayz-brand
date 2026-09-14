import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import type { Tables } from '@/integrations/supabase/types';

type AuditLog = Tables<'audit_logs'>;

const AdminAuditLog = () => {
  const [search, setSearch] = useState('');
  const { data: logs, isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  const filteredLogs = logs?.filter((log) => {
    const haystack = [log.actor_email, log.action, log.entity_type, log.brand]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Audit Log</h2>
        <p className="text-muted-foreground">A chronological record of dashboard changes.</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity..." className="pl-9" />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-[1.1fr_1.2fr_1fr_1fr] gap-4 border-b bg-muted/30 px-4 py-3 text-sm font-medium">
          <span>Action</span><span>Record</span><span>Actor</span><span>Time</span>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : filteredLogs?.length ? (
          filteredLogs.map((log: AuditLog) => (
            <div key={log.id} className="grid grid-cols-[1.1fr_1.2fr_1fr_1fr] gap-4 border-b px-4 py-4 text-sm last:border-b-0">
              <div className="flex items-center gap-2"><Badge variant="outline">{log.action}</Badge>{log.brand && <span className="text-muted-foreground">{log.brand}</span>}</div>
              <div><p className="font-medium">{log.entity_type}</p><p className="text-xs text-muted-foreground">{log.entity_id ?? '—'}</p></div>
              <span className="truncate text-muted-foreground">{log.actor_email ?? 'System'}</span>
              <time className="text-muted-foreground">{new Date(log.created_at).toLocaleString()}</time>
            </div>
          ))
        ) : <p className="px-4 py-12 text-center text-muted-foreground">No activity found.</p>}
      </div>
    </div>
  );
};

export default AdminAuditLog;