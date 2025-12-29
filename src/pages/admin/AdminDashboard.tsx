import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ShoppingBag, UtensilsCrossed, Truck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const { data: inquiriesCount } = useQuery({
    queryKey: ['inquiries-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: newInquiriesCount } = useQuery({
    queryKey: ['new-inquiries-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');
      return count ?? 0;
    },
  });

  const { data: productsCount } = useQuery({
    queryKey: ['products-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: menuItemsCount } = useQuery({
    queryKey: ['menu-items-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: servicesCount } = useQuery({
    queryKey: ['services-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: recentInquiries } = useQuery({
    queryKey: ['recent-inquiries'],
    queryFn: async () => {
      const { data } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const stats = [
    {
      title: 'Total Inquiries',
      value: inquiriesCount,
      icon: MessageSquare,
      description: `${newInquiriesCount} new`,
      href: '/admin/inquiries',
      color: 'text-blue-500',
    },
    {
      title: 'Products',
      value: productsCount,
      icon: ShoppingBag,
      description: 'Magic Potion',
      href: '/admin/products',
      color: 'text-purple-500',
    },
    {
      title: 'Menu Items',
      value: menuItemsCount,
      icon: UtensilsCrossed,
      description: 'Cravins TX',
      href: '/admin/menu',
      color: 'text-orange-500',
    },
    {
      title: 'Services',
      value: servicesCount,
      icon: Truck,
      description: 'Easily Movers',
      href: '/admin/services',
      color: 'text-green-500',
    },
  ];

  const brandColors: Record<string, string> = {
    'magic-potion': 'bg-purple-500/10 text-purple-500',
    'easily-movers': 'bg-green-500/10 text-green-500',
    'cravins': 'bg-orange-500/10 text-orange-500',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to the Elixir.TX admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value ?? '—'}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest customer inquiries across all brands</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/inquiries">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInquiries?.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No inquiries yet</p>
            ) : (
              recentInquiries?.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{inquiry.name}</span>
                      <Badge variant="outline" className={brandColors[inquiry.brand] || ''}>
                        {inquiry.brand}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {inquiry.inquiry_type} • {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                    {inquiry.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
