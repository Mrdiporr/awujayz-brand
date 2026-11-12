import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, CheckCircle2, Loader2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import magicHero from '@/assets/magic-potion-hero.jpg';
import type { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;
type CartItem = Product & { quantity: number; selectedSize: string };
const apparelSizes = ['S', 'M', 'L', 'XL', 'XXL'];
const accessorySizes = ['One Size'];

const MagicPotionShop = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [category, setCategory] = useState('All');
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number; paymentStatus: string; status: string } | null>(null);
  const [returnMessage, setReturnMessage] = useState('');
  const [customer, setCustomer] = useState({ name: '', email: '' });

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['shop-products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('in_stock', true).order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.category).filter(Boolean) as string[]))], [products]);
  const visibleProducts = category === 'All' ? products : products.filter((product) => product.category === category);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  useEffect(() => {
    const payment = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');
    let cancelled = false;

    if (payment === 'cancelled') {
      const savedCart = sessionStorage.getItem('magic-potion-checkout-cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart) as CartItem[];
          if (Array.isArray(parsed)) setCart(parsed.filter((item) => item && typeof item.id === 'string' && Number.isInteger(item.quantity) && item.quantity > 0));
        } catch {
          sessionStorage.removeItem('magic-potion-checkout-cart');
        }
      }
      setReturnMessage('Payment was not completed. Your bag is ready when you are.');
      sessionStorage.removeItem('magic-potion-checkout-cart');
    }

    if (payment === 'success' && sessionId) {
      setCheckoutOpen(true);
      setSubmitting(true);
      const confirmPayment = async () => {
        for (let attempt = 0; attempt < 8; attempt += 1) {
          const { data, error } = await supabase.functions.invoke('verify-checkout', { body: { sessionId } });
          if (cancelled) return;
          if (!error && data && !data.error) {
            const confirmedOrder = {
              id: data.orderId as string,
              total: Number(data.total),
              paymentStatus: data.paymentStatus as string,
              status: data.orderStatus as string,
            };
            setOrder(confirmedOrder);
            if (confirmedOrder.paymentStatus === 'paid') {
              setCart([]);
              sessionStorage.removeItem('magic-potion-checkout-cart');
              setSubmitting(false);
              return;
            }
          }
          await new Promise((resolve) => window.setTimeout(resolve, 1800));
        }
        if (!cancelled) setSubmitting(false);
      };
      void confirmPayment();
    }

    return () => { cancelled = true; };
  }, [searchParams]);

  const sizesFor = (product: Product) => product.category?.toLowerCase().includes('access') ? accessorySizes : apparelSizes;
  const addToCart = (product: Product, size: string) => {
    setCart((current) => {
      const match = current.find((item) => item.id === product.id && item.selectedSize === size);
      return match ? current.map((item) => item === match ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, selectedSize: size, quantity: 1 }];
    });
    setSelected(null);
    toast({ title: 'Added to bag', description: `${product.name} · ${size}` });
  };
  const changeQuantity = (id: string, size: string, amount: number) => setCart((current) => current.map((item) => item.id === id && item.selectedSize === size ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item).filter((item) => item.quantity > 0));

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const checkoutRequestId = crypto.randomUUID();
    sessionStorage.setItem('magic-potion-checkout-cart', JSON.stringify(cart));
    const { data, error } = await supabase.functions.invoke('create-order', { body: {
      customerName: customer.name, customerEmail: customer.email, checkoutRequestId,
      items: cart.map((item) => ({ productId: item.id, quantity: item.quantity, selectedSize: item.selectedSize })),
    } });
    setSubmitting(false);
    if (error || data?.error) {
      toast({ title: 'Checkout could not be started', description: data?.error ?? error?.message ?? 'Please try again.', variant: 'destructive' });
      return;
    }
    if (typeof data?.url !== 'string' || !data.url.startsWith('https://checkout.stripe.com/')) {
      toast({ title: 'Checkout link unavailable', description: 'Please try again in a moment.', variant: 'destructive' });
      return;
    }
    window.location.assign(data.url);
  };

  return (
    <div className="theme-magic-potion min-h-screen bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/magic-potion" className="font-display text-xl font-bold uppercase">Magic<span className="text-primary">Potion</span></Link>
          <div className="hidden items-center gap-7 md:flex"><Link to="/magic-potion" className="text-xs font-bold uppercase">Home</Link><Link to="/magic-potion/shop" className="text-xs font-bold uppercase text-primary">Shop</Link><Link to="/magic-potion/about" className="text-xs font-bold uppercase">About</Link></div>
          <Button size="icon" variant="ghost" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${count} items`}><ShoppingBag className="h-5 w-5" /><span className="absolute ml-7 -mt-7 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span></Button>
        </div>
      </nav>

      <header className="relative mt-16 min-h-[440px] overflow-hidden border-b border-border">
        <img src={magicHero} alt="Magic Potion Apparel collection" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="container relative flex min-h-[440px] flex-col justify-end py-14"><Link to="/magic-potion" className="mb-auto inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link><p className="mb-3 text-xs font-bold uppercase text-primary">MagicPotion by ElixirTX</p><h1 className="max-w-3xl font-display text-5xl font-bold uppercase md:text-7xl">Wear your inner magic.</h1><p className="mt-4 max-w-xl text-muted-foreground">Where style meets enchantment. Limited apparel, managed live and made to stand apart.</p></div>
      </header>

      <main>
        {returnMessage && <div className="border-b border-border bg-secondary/50"><div className="container py-3 text-sm text-muted-foreground">{returnMessage}</div></div>}
        <section className="border-b border-border py-5"><div className="container flex gap-2 overflow-x-auto">{categories.map((item) => <Button key={item} variant={category === item ? 'default' : 'outline'} size="sm" onClick={() => setCategory(item)}>{item}</Button>)}</div></section>
        <section className="container py-12">
          {isLoading ? <div className="flex justify-center py-24"><Loader2 className="h-7 w-7 animate-spin" /></div> : isError ? <p className="py-24 text-center text-muted-foreground">The collection is temporarily unavailable.</p> : visibleProducts.length === 0 ? <p className="py-24 text-center text-muted-foreground">No pieces are available in this collection yet.</p> : (
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visibleProducts.map((product) => <article key={product.id} className="group">
              <button className="relative block aspect-[4/5] w-full overflow-hidden border border-border bg-secondary text-left" onClick={() => { setSelected(product); setSelectedSize(sizesFor(product)[0]); }}>
                <img src={product.image_url || magicHero} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {product.badge && <span className="absolute left-3 top-3 bg-background px-3 py-1 text-[10px] font-bold uppercase">{product.badge}</span>}
              </button>
              <div className="mt-4 flex justify-between gap-3"><div><h2 className="font-display font-semibold uppercase">{product.name}</h2><p className="text-sm text-muted-foreground">{product.category || 'Apparel'}</p></div><p className="font-semibold text-primary">${Number(product.price).toFixed(2)}</p></div>
            </article>)}</div>
          )}
        </section>
      </main>

      {selected && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}><div className="grid max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-border bg-card md:grid-cols-2" onClick={(event) => event.stopPropagation()}><img src={selected.image_url || magicHero} alt={selected.name} className="aspect-square h-full w-full object-cover md:aspect-auto" /><div className="relative flex flex-col p-7"><Button variant="ghost" size="icon" className="absolute right-3 top-3" onClick={() => setSelected(null)}><X /></Button><p className="text-xs font-bold uppercase text-primary">{selected.category || 'Collection'}</p><h2 className="mt-3 font-display text-3xl font-bold uppercase">{selected.name}</h2><p className="mt-4 text-muted-foreground">{selected.description}</p><p className="mt-5 text-2xl font-bold">${Number(selected.price).toFixed(2)}</p><div className="mt-8"><Label>Size</Label><div className="mt-2 flex flex-wrap gap-2">{sizesFor(selected).map((size) => <Button key={size} size="sm" variant={selectedSize === size ? 'default' : 'outline'} onClick={() => setSelectedSize(size)}>{size}</Button>)}</div></div><Button className="mt-8" size="lg" onClick={() => addToCart(selected, selectedSize)}><ShoppingBag className="mr-2 h-5 w-5" /> Add to bag</Button></div></div></div>}

      {cartOpen && <div className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm" onClick={() => setCartOpen(false)}><aside className="ml-auto flex h-full w-full max-w-md flex-col border-l border-border bg-card" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-border p-5"><h2 className="font-display text-xl font-semibold uppercase">Your bag · {count}</h2><Button size="icon" variant="ghost" onClick={() => setCartOpen(false)}><X /></Button></div><div className="flex-1 space-y-5 overflow-y-auto p-5">{cart.length === 0 ? <div className="py-20 text-center text-muted-foreground"><ShoppingBag className="mx-auto mb-4 h-10 w-10" />Your bag is empty.</div> : cart.map((item) => <div key={`${item.id}-${item.selectedSize}`} className="grid grid-cols-[72px_1fr_auto] gap-3 border-b border-border pb-5"><img src={item.image_url || magicHero} alt="" className="h-[88px] w-[72px] object-cover" /><div><h3 className="text-sm font-semibold uppercase">{item.name}</h3><p className="text-xs text-muted-foreground">Size {item.selectedSize}</p><div className="mt-3 flex items-center gap-2"><Button size="icon" variant="outline" className="h-7 w-7" onClick={() => changeQuantity(item.id, item.selectedSize, -1)}><Minus className="h-3 w-3" /></Button><span className="w-4 text-center text-sm">{item.quantity}</span><Button size="icon" variant="outline" className="h-7 w-7" onClick={() => changeQuantity(item.id, item.selectedSize, 1)}><Plus className="h-3 w-3" /></Button></div></div><div className="text-right"><p className="text-sm font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</p><Button size="icon" variant="ghost" className="mt-2" onClick={() => setCart((current) => current.filter((entry) => entry !== item))}><Trash2 className="h-4 w-4" /></Button></div></div>)}</div>{cart.length > 0 && <div className="border-t border-border p-5"><div className="mb-4 flex justify-between"><span className="text-muted-foreground">Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><Button className="w-full" size="lg" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Secure order checkout</Button><p className="mt-3 text-center text-xs text-muted-foreground">Payment is arranged after order review.</p></div>}</aside></div>}

      {checkoutOpen && <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-sm"><div className="relative w-full max-w-xl border border-border bg-card p-6 md:p-8"><Button size="icon" variant="ghost" className="absolute right-3 top-3" aria-label="Close checkout" onClick={() => { setCheckoutOpen(false); setOrder(null); }}><X /></Button>{order ? <div className="py-8 text-center"><CheckCircle2 className={`mx-auto h-12 w-12 ${order.paymentStatus === 'paid' ? 'text-success' : 'text-muted-foreground'}`} /><h2 className="mt-5 font-display text-3xl font-bold uppercase">{order.paymentStatus === 'paid' ? 'Payment confirmed' : 'Payment processing'}</h2><p className="mt-3 text-muted-foreground">Reference {order.id.slice(0, 8).toUpperCase()} · ${order.total.toFixed(2)}</p><p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">{order.paymentStatus === 'paid' ? 'Your order is paid and saved. The team will contact you about delivery.' : 'Stripe received your return. Your order will update as soon as payment confirmation arrives.'}</p><Button className="mt-7" onClick={() => { setCheckoutOpen(false); setOrder(null); }}>Continue shopping</Button></div> : <form onSubmit={placeOrder}><p className="text-xs font-bold uppercase text-primary">Secure checkout</p><h2 className="mt-2 font-display text-3xl font-bold uppercase">Your details</h2><p className="mt-2 text-sm text-muted-foreground">Shipping and payment are collected securely on Stripe. Your total is verified against the live catalog.</p><div className="mt-7 grid gap-5"><div><Label htmlFor="checkout-name">Full name</Label><Input id="checkout-name" autoComplete="name" className="mt-2" required maxLength={200} value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} /></div><div><Label htmlFor="checkout-email">Email</Label><Input id="checkout-email" autoComplete="email" className="mt-2" type="email" required maxLength={320} value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} /></div></div><div className="mt-7 flex items-center justify-between border-y border-border py-4"><span>Order total</span><strong className="text-xl">${subtotal.toFixed(2)}</strong></div><Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>{submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Continue to secure payment</Button></form>}</div></div>}

      <footer className="border-t border-border py-8"><div className="container flex flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row"><span>© {new Date().getFullYear()} Magic Potion Apparel</span><a href="https://instagram.com/magicpotionapparel" target="_blank" rel="noreferrer">@magicpotionapparel</a><Link to="/">Awujayz ecosystem</Link></div></footer>
    </div>
  );
};

export default MagicPotionShop;