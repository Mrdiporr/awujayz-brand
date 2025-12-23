import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Instagram, ArrowLeft, X, Plus, Minus, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  badge: string | null;
  description: string;
  sizes: string[];
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "MYSTIC DROP TEE",
    price: 65,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    category: "Tees",
    badge: "NEW",
    description: "Premium cotton tee with signature mystic drop graphic",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "VOID HOODIE",
    price: 120,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    category: "Hoodies",
    badge: "BESTSELLER",
    description: "Heavyweight hoodie with embroidered void logo",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "ASTRAL JOGGERS",
    price: 85,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80",
    category: "Bottoms",
    badge: null,
    description: "Comfortable joggers with astral pattern details",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "PHANTOM CAP",
    price: 45,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
    category: "Accessories",
    badge: "LIMITED",
    description: "Structured cap with phantom embroidery",
    sizes: ["One Size"],
  },
  {
    id: 5,
    name: "ECLIPSE JACKET",
    price: 180,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    category: "Outerwear",
    badge: "NEW",
    description: "Windbreaker with reflective eclipse print",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "NEON DREAMS TEE",
    price: 55,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80",
    category: "Tees",
    badge: null,
    description: "Relaxed fit tee with neon graphic print",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 7,
    name: "SHADOW SHORTS",
    price: 65,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
    category: "Bottoms",
    badge: null,
    description: "Athletic shorts with shadow gradient",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "COSMIC BEANIE",
    price: 35,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
    category: "Accessories",
    badge: null,
    description: "Ribbed beanie with cosmic patch",
    sizes: ["One Size"],
  },
];

const categories = ["All", "Tees", "Hoodies", "Bottoms", "Outerwear", "Accessories"];

const MagicPotionShop = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, size: string) => {
    const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size }]);
    }
    
    toast({
      title: "Added to bag",
      description: `${product.name} (${size}) has been added to your bag.`,
    });
    
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const updateQuantity = (id: number, size: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  return (
    <div className="theme-magic-potion min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/magic-potion" className="font-display text-2xl tracking-wider">
            MAGIC<span className="text-primary">POTION</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/magic-potion/shop" className="text-sm tracking-wide text-primary transition-colors">SHOP</Link>
            <Link to="/magic-potion" className="text-sm tracking-wide hover:text-primary transition-colors">LOOKBOOK</Link>
            <Link to="/magic-potion" className="text-sm tracking-wide hover:text-primary transition-colors">ABOUT</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/magicpotionapparel" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-primary transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link to="/magic-potion" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-4">
              THE <span className="text-gradient-primary">COLLECTION</span>
            </h1>
            <p className="text-muted-foreground">
              Where style meets enchantment. Unleash your inner magic with every thread.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize(product.sizes[0]);
                }}
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
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Button variant="neon" size="sm" className="w-full">
                      QUICK ADD
                    </Button>
                  </div>
                </div>
                <h3 className="font-display text-lg tracking-wide mb-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-1">{product.category}</p>
                <p className="text-primary font-bold">${product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-6 max-w-lg w-full shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-display text-2xl tracking-wide">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-muted-foreground mb-4">{selectedProduct.description}</p>
              <p className="text-primary font-bold text-2xl mb-4">${selectedProduct.price}</p>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="neon" 
                size="lg" 
                className="w-full"
                onClick={() => addToCart(selectedProduct, selectedSize)}
              >
                <ShoppingBag className="w-5 h-5" />
                ADD TO BAG
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-2xl tracking-wide">YOUR BAG ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Your bag is empty</p>
                    <Button variant="neon-outline" className="mt-4" onClick={() => setIsCartOpen(false)}>
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h3 className="font-display text-sm tracking-wide">{item.name}</h3>
                          <p className="text-muted-foreground text-xs mb-2">Size: {item.selectedSize}</p>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                              className="w-6 h-6 rounded border border-border flex items-center justify-center hover:border-primary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                              className="w-6 h-6 rounded border border-border flex items-center justify-center hover:border-primary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-primary font-bold">${item.price * item.quantity}</p>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-muted-foreground hover:text-destructive transition-colors mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-6 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-display text-xl">${cartTotal}</span>
                  </div>
                  <Button variant="neon" size="lg" className="w-full">
                    CHECKOUT
                  </Button>
                  <p className="text-center text-muted-foreground text-xs mt-4">
                    Shipping calculated at checkout
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-display tracking-wider">MAGIC<span className="text-primary">POTION</span></p>
          <p>© 2024 Magic Potion Apparel. All rights reserved.</p>
          <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
        </div>
      </footer>
    </div>
  );
};

export default MagicPotionShop;
