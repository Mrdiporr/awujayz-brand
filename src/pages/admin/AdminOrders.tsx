import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

type Order = Tables<'orders'>;
const orderStatuses = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'];

const AdminOrders = () => {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const visibleOrders = orders?.filter((order) => `${order.customer_name} ${order.customer_email} ${order.status}`.toLowerCase().includes(search.toLowerCase()));
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: 'Order status updated' });
    },
    onError: (error) => toast({ title: 'Unable to update order', description: error.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-display font-bold">Orders</h2><p className="text-muted-foreground">Manage Magic Potion purchases and fulfillment.</p></div>
      <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer, email, or status..." className="max-w-md" />
      <div className="overflow-x-auto rounded-lg border">
        <div className="grid min-w-[850px] grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_1.1fr_1.2fr] gap-4 border-b bg-muted/30 px-4 py-3 text-sm font-medium"><span>Customer</span><span>Shipping</span><span>Total</span><span>Payment</span><span>Status</span><span>Placed</span></div>
        {isLoading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div> : visibleOrders?.length ? visibleOrders.map((order: Order) => (
          <div key={order.id} className="grid min-w-[850px] grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_1.1fr_1.2fr] items-center gap-4 border-b px-4 py-4 text-sm last:border-b-0">
            <div><p className="font-medium">{order.customer_name}</p><p className="text-xs text-muted-foreground">{order.customer_email}</p></div>
            <p className="line-clamp-2 text-muted-foreground">{order.shipping_address}</p>
            <span className="font-medium">${order.total.toFixed(2)}</span>
            <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>{order.payment_status}</Badge>
            <Select value={order.status} onValueChange={(status) => updateMutation.mutate({ id: order.id, status })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{orderStatuses.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent></Select>
            <time className="text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</time>
          </div>
        )) : <div className="py-12 text-center text-muted-foreground">No orders yet.</div>}
      </div>
    </div>
  );
};

export default AdminOrders;