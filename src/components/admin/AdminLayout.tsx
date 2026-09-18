import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const location = useLocation();
  const labels: Record<string, string> = {
    '/admin': 'Operations overview',
    '/admin/inquiries': 'Customer inbox',
    '/admin/orders': 'Commerce & fulfillment',
    '/admin/products': 'Magic Potion catalog',
    '/admin/menu': 'Cravins menu',
    '/admin/services': 'Easily Movers services',
    '/admin/users': 'Access management',
    '/admin/audit': 'System activity',
  };
  const label = labels[location.pathname] ?? 'Operations';
  return (
    <div className="theme-admin">
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/90 backdrop-blur-xl flex items-center px-4 md:px-6 gap-4">
            <SidebarTrigger />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground">Enterprise control center</p>
              <h1 className="truncate font-display text-base font-semibold">{label}</h1>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="hidden sm:inline">Connected</span>
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
