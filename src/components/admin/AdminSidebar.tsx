import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingBag, 
  UtensilsCrossed, 
  Truck,
  LogOut,
  ClipboardList,
  Users,
  ScrollText,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Inquiries', url: '/admin/inquiries', icon: MessageSquare },
  { title: 'Orders', url: '/admin/orders', icon: ClipboardList },
  { title: 'Products', url: '/admin/products', icon: ShoppingBag },
  { title: 'Menu Items', url: '/admin/menu', icon: UtensilsCrossed },
  { title: 'Services', url: '/admin/services', icon: Truck },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Audit Log', url: '/admin/audit', icon: ScrollText },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-sidebar-border" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center border border-sidebar-border bg-sidebar-accent">
            <span className="text-sidebar-foreground font-bold text-xs">AW</span>
          </div>
          {!collapsed && (
            <span className="font-display text-base font-semibold">Awujayz Ops</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <Button asChild variant="ghost" size={collapsed ? 'icon' : 'default'} className="mb-1 w-full justify-start">
          <Link to="/">
            <ExternalLink className="h-4 w-4" />
            {!collapsed && <span className="ml-2">View ecosystem</span>}
          </Link>
        </Button>
        {!collapsed && user && (
          <div className="mb-3 text-xs text-muted-foreground truncate">
            {user.email}
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'default'}
          className="w-full justify-start"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
