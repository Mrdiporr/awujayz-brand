import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Moon, ShieldCheck, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import magicImage from '@/assets/magic-potion-hero.jpg';
import moversImage from '@/assets/easily-movers-hero.jpg';
import cravinsImage from '@/assets/cravins-hero.jpg';

const brands = [
  {
    id: "magic-potion",
    name: "Magic Potion Apparel",
    tagline: "Fashion & Culture",
    description: "Streetwear built where style meets enchantment.",
    path: "/magic-potion",
    image: magicImage,
    className: "hub-magic",
  },
  {
    id: "easily-movers",
    name: "Easily Movers",
    tagline: "Logistics & Utility",
    description: "Reliable moving, junk removal, and home services across Texas.",
    path: "/easily-movers",
    image: moversImage,
    className: "hub-movers",
  },
  {
    id: "cravins",
    name: "Cravins TX",
    tagline: "Culinary Arts",
    description: "Fresh Texas flavor, daily service, and memorable catering.",
    path: "/cravins",
    image: cravinsImage,
    className: "hub-cravins",
  },
];

const BrandHub = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <div className={`${isDark ? 'dark' : 'light'} ecosystem-hub min-h-screen bg-background text-foreground transition-colors duration-300`}>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 md:px-10 md:py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Professional Business Solution Consultant & CEO</p>
            <h1 className="font-display text-5xl font-bold uppercase md:text-7xl">Awujayz<span className="text-muted-foreground">.Hub</span></h1>
            <p className="mt-3 max-w-xl text-muted-foreground">One focused ecosystem. Three distinct Texas businesses serving culture, movement, and flavor.</p>
          </div>
          <div className="flex items-center gap-2 border border-border bg-card px-4 py-2 text-xs text-muted-foreground"><Activity className="h-4 w-4 text-success" /> Ecosystem online</div>
        </motion.header>

        <main className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`${index === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'} min-h-[250px]`}
            >
              <Link
                to={brand.path}
                className={`group relative flex h-full min-h-[250px] overflow-hidden border border-border bg-card p-7 transition-colors hover:border-primary ${brand.className}`}
              >
                <img src={brand.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="relative mt-auto max-w-md">
                  <p className="mb-2 text-[10px] font-bold uppercase text-primary">{brand.tagline}</p>
                  <h2 className="font-display text-3xl font-semibold md:text-4xl">{brand.name}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{brand.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase">Enter brand <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[170px] flex-col justify-between border border-dashed border-border bg-card p-7 lg:col-span-5">
            <div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase text-muted-foreground">Enterprise operations</p><ShieldCheck className="h-5 w-5 text-success" /></div>
            <div><h2 className="font-display text-2xl font-semibold">Control center</h2><p className="mt-2 text-sm text-muted-foreground">Secure management for inquiries, orders, products, menus, services, users, and system activity.</p></div>
            <Link to="/admin" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase">Launch console <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </main>

        {/* Footer with Dark/Light toggle */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full pt-10 flex items-center justify-between"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Awujayz. All rights reserved.
          </p>
          <button
            onClick={() => setIsDark(!isDark)}
            className="border border-border bg-card p-2 text-foreground transition-colors hover:bg-secondary"
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
