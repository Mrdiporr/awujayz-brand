import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[hsl(0,0%,4%)]' : 'bg-[hsl(0,0%,98%)]'} relative overflow-hidden noise-overlay transition-colors duration-300`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border mb-6`}>
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Three Brands. One Vision.</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-gradient-primary">Awujayz</span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Professional Business Solution Consultant & CEO.
          </p>
        </motion.header>

        {/* Brand Cards - Centered */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={brand.path}
                className={`group block relative overflow-hidden rounded-2xl ${isDark ? 'bg-[hsl(0,0%,7%)] border-[hsl(0,0%,18%)] hover:border-purple-500/50' : 'bg-white border-gray-200 hover:border-purple-400/50'} border transition-all duration-500`}
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

                  <h2 className={`font-display text-2xl font-bold mb-2 ${isDark ? 'group-hover:text-purple-400' : 'group-hover:text-purple-600'} transition-colors`}>
                    {brand.name}
                  </h2>
                  <p className={`${isDark ? 'text-purple-400' : 'text-purple-600'} font-medium mb-3`}>{brand.tagline}</p>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-sm mb-6 flex-grow`}>
                    {brand.description}
                  </p>

                  <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-gray-500 group-hover:text-purple-400' : 'text-gray-600 group-hover:text-purple-600'} transition-colors`}>
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Spacer to push footer down */}
        <div className="flex-grow" />

        {/* Footer with Dark/Light toggle */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full pt-20 flex items-center justify-between"
        >
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            © 2024 Awujayz. All rights reserved.
          </p>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'} transition-colors`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </motion.footer>
      </div>
    </div>
  );
};

export default BrandHub;
