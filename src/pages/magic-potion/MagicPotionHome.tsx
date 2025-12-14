import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Instagram, ArrowRight, Zap, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/magic-potion-hero.jpg";

const products = [
  {
    id: 1,
    name: "MYSTIC DROP TEE",
    price: 65,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    badge: "NEW",
  },
  {
    id: 2,
    name: "VOID HOODIE",
    price: 120,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 3,
    name: "ASTRAL JOGGERS",
    price: 85,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80",
    badge: null,
  },
  {
    id: 4,
    name: "PHANTOM CAP",
    price: 45,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
    badge: "LIMITED",
  },
];

const MagicPotionHome = () => {
  return (
    <div className="theme-magic-potion min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/magic-potion" className="font-display text-2xl tracking-wider">
            MAGIC<span className="text-primary">POTION</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/magic-potion" className="text-sm tracking-wide hover:text-primary transition-colors">SHOP</Link>
            <Link to="/magic-potion" className="text-sm tracking-wide hover:text-primary transition-colors">LOOKBOOK</Link>
            <Link to="/magic-potion" className="text-sm tracking-wide hover:text-primary transition-colors">ABOUT</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Streetwear fashion"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        {/* Animated background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm tracking-widest mb-8">
              DROP 003 — NOW LIVE
            </span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-6">
              WEAR THE
              <br />
              <span className="text-gradient-primary">CULTURE</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10">
              Where Style Meets Enchantment. Unleash your inner Magic with every thread.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neon" size="xl">
                SHOP NOW
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="neon-outline" size="xl">
                VIEW LOOKBOOK
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-2">FEATURED</h2>
              <p className="text-muted-foreground">This season's essential pieces</p>
            </div>
            <Button variant="neon-outline" size="lg">
              VIEW ALL
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-4">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold tracking-wider rounded">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    variant="neon"
                    size="sm"
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    ADD TO BAG
                  </Button>
                </div>
                <h3 className="font-display text-lg tracking-wide mb-1">{product.name}</h3>
                <p className="text-primary font-bold">${product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "LIMITED DROPS", desc: "Exclusive pieces released in small batches" },
              { icon: Star, title: "PREMIUM QUALITY", desc: "Crafted with premium materials and attention to detail" },
              { icon: Truck, title: "WORLDWIDE SHIPPING", desc: "We deliver culture to your doorstep globally" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <feature.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-display text-xl tracking-wide mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
            JOIN THE <span className="text-primary">MOVEMENT</span>
          </h2>
          <p className="text-muted-foreground mb-8">Follow us on Instagram for exclusive drops and behind-the-scenes content</p>
          <a href="https://instagram.com/magicpotionapparel" target="_blank" rel="noopener noreferrer">
            <Button variant="neon" size="xl">
              <Instagram className="w-5 h-5" />
              @magicpotionapparel
            </Button>
          </a>
          <p className="text-muted-foreground text-sm mt-4">MagicPotion By Elixirtx</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-display text-xl tracking-wider">MAGIC<span className="text-primary">POTION</span></p>
            <p className="text-sm text-muted-foreground">© 2024 Magic Potion Apparel. All rights reserved.</p>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to Brand Hub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MagicPotionHome;
