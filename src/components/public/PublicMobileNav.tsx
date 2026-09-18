import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const configs = {
  'magic-potion': {
    label: 'Magic Potion',
    items: [['Home', '/magic-potion'], ['Shop', '/magic-potion/shop'], ['About', '/magic-potion/about']],
  },
  'easily-movers': {
    label: 'Easily Movers',
    items: [['Home', '/easily-movers'], ['About', '/easily-movers/about'], ['Get a quote', '/easily-movers/contact']],
  },
  cravins: {
    label: 'Cravins TX',
    items: [['Home', '/cravins'], ['Menu', '/cravins/menu'], ['About', '/cravins/about'], ['Catering', '/cravins/catering']],
  },
} as const;

const PublicMobileNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const key = Object.keys(configs).find((brand) => location.pathname.startsWith(`/${brand}`)) as keyof typeof configs | undefined;
  if (!key) return null;
  const config = configs[key];

  return (
    <div className="fixed right-4 top-3 z-[70] md:hidden">
      <Button size="icon" variant="outline" className="bg-background/90 backdrop-blur-xl" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'}>
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <div className="absolute right-0 top-12 w-64 border border-border bg-background p-3 shadow-2xl">
          <p className="border-b border-border px-3 pb-3 font-display text-sm font-semibold">{config.label}</p>
          <nav className="grid py-2" aria-label={`${config.label} mobile navigation`}>
            {config.items.map(([label, path]) => (
              <Link key={path} to={path} onClick={() => setOpen(false)} className={`px-3 py-3 text-sm transition-colors hover:bg-secondary ${location.pathname === path ? 'text-primary' : 'text-foreground'}`}>
                {label}
              </Link>
            ))}
            <Link to="/" onClick={() => setOpen(false)} className="mt-2 border-t border-border px-3 pt-4 text-xs text-muted-foreground">Awujayz ecosystem</Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PublicMobileNav;