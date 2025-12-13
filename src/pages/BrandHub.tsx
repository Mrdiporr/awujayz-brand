import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const brands = [
  {
    id: "magic-potion",
    name: "Magic Potion Apparel",
    tagline: "Wear the Culture",
    description: "Bold streetwear for the fearless",
    path: "/magic-potion",
    gradient: "from-purple-600 via-pink-500 to-cyan-400",
  },
  {
    id: "easily-movers",
    name: "Easily Movers",
    tagline: "Moving Made Simple",
    description: "Professional moving & cleaning services across Texas",
    path: "/easily-movers",
    gradient: "from-blue-600 via-blue-500 to-orange-400",
  },
  {
    id: "cravins",
    name: "Cravins TX",
    tagline: "Taste the Passion",
    description: "Texas food truck & catering excellence",
    path: "/cravins",
    gradient: "from-orange-500 via-red-500 to-yellow-400",
  },
];

const BrandHub = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise-overlay">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Three Brands. One Vision.</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-gradient-primary">Our Brands</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our portfolio of businesses, each crafted with passion and purpose.
          </p>
        </motion.header>

        {/* Brand Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={brand.path}
                className="group block relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Brand icon/visual placeholder */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${brand.gradient} mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-2xl font-display font-bold text-white">
                      {brand.name.charAt(0)}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h2>
                  <p className="text-primary font-medium mb-3">{brand.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {brand.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20 text-sm text-muted-foreground"
        >
          <p>© 2024 Brand Portfolio. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default BrandHub;
