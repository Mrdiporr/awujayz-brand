import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Activity, ArrowUpRight, DollarSign, MessageSquare, PackageCheck, ShoppingBag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: ['operations-overview'],
    queryFn: async () => {
      const [inquiries, fresh, products, orders, recent] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('in_stock', true),
        supabase.from('orders').select('id,total,status,payment_status,created_at,customer_name').order('created_at', { ascending: false }).limit(50),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
      ]);
      const orderRows = orders.data ?? [];
      return { inquiries: inquiries.count ?? 0, fresh: fresh.count ?? 0, products: products.count ?? 0, orders: orderRows.length, revenue: orderRows.filter((order) => order.payment_status === 'paid').reduce((sum, order) => sum + Number(order.total), 0), recent: recent.data ?? [], recentOrders: orderRows.slice(0, 5) };
    },
  });
  const metrics = [
    { label: 'New inquiries', value: data?.fresh ?? '—', context: `${data?.inquiries ?? 0} total`, icon: MessageSquare, href: '/admin/inquiries' },
    { label: 'Orders', value: data?.orders ?? '—', context: 'Latest 50', icon: ShoppingBag, href: '/admin/orders' },
    { label: 'Paid revenue', value: data ? `$${data.revenue.toFixed(2)}` : '—', context: 'Captured payments', icon: DollarSign, href: '/admin/orders' },
    { label: 'Live products', value: data?.products ?? '—', context: 'Magic Potion', icon: PackageCheck, href: '/admin/products' },
  ];
  return <div className="space-y-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase text-muted-foreground">Awujayz ecosystem</p><h2 className="mt-2 font-display text-3xl font-semibold">Operations overview</h2><p className="mt-1 text-muted-foreground">Live commercial and customer activity across all three brands.</p></div><div className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs text-success"><Activity className="h-4 w-4" /> Systems operational</div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <Link key={metric.label} to={metric.href}><Card className="h-full transition-colors hover:border-primary/50"><CardHeader className="flex flex-row items-center justify-between pb-3"><CardTitle className="text-xs font-semibold uppercase text-muted-foreground">{metric.label}</CardTitle><metric.icon className="h-4 w-4" /></CardHeader><CardContent><p className="font-display text-3xl font-semibold">{metric.value}</p><p className="mt-2 text-xs text-muted-foreground">{metric.context}</p></CardContent></Card></Link>)}</div>
    <div className="grid gap-6 xl:grid-cols-5"><Card className="xl:col-span-3"><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Customer inbox</CardTitle><p className="mt-1 text-sm text-muted-foreground">Latest requests across the ecosystem</p></div><Button asChild variant="outline" size="sm"><Link to="/admin/inquiries">Open <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></CardHeader><CardContent className="space-y-1">{data?.recent.length ? data.recent.map((inquiry) => <div key={inquiry.id} className="flex items-center justify-between border-b border-border py-4 last:border-0"><div className="min-w-0"><p className="truncate font-medium">{inquiry.name}</p><p className="truncate text-xs text-muted-foreground">{inquiry.inquiry_type} · {inquiry.email}</p></div><Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>{inquiry.status}</Badge></div>) : <p className="py-12 text-center text-muted-foreground">No inquiries yet.</p>}</CardContent></Card>
    <Card className="xl:col-span-2"><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Recent orders</CardTitle><p className="mt-1 text-sm text-muted-foreground">Magic Potion fulfillment queue</p></div><Button asChild variant="outline" size="sm"><Link to="/admin/orders">View all</Link></Button></CardHeader><CardContent className="space-y-1">{data?.recentOrders.length ? data.recentOrders.map((order) => <div key={order.id} className="flex items-center justify-between border-b border-border py-4 last:border-0"><div><p className="font-medium">{order.customer_name}</p><p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p></div><div className="text-right"><p className="font-medium">${Number(order.total).toFixed(2)}</p><p className="text-xs capitalize text-muted-foreground">{order.status}</p></div></div>) : <p className="py-12 text-center text-muted-foreground">No orders yet.</p>}</CardContent></Card></div>
  </div>;
};
export default AdminDashboard;