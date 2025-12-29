import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Instagram, Sparkles, Heart, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "The Founder",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Visionary behind the Magic Potion aesthetic.",
  },
  {
    name: "Design Lead",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Crafting every piece with intentional style.",
  },
  {
    name: "Operations",
    role: "Brand Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Ensuring every drop ships with care.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Authenticity",
    description: "Every design tells a story. We create pieces that resonate with the culture, not just follow trends.",
  },
  {
    icon: Heart,
    title: "Community",
    description: "We're building more than a brand—we're cultivating a movement of individuals who dare to stand out.",
  },
  {
    icon: Zap,
    title: "Quality",
    description: "Premium materials, meticulous craftsmanship. Every thread is intentional, every stitch matters.",
  },
];

const MagicPotionAbout = () => {
  return (
    <div className="theme-magic-potion min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/magic-potion" className="font-display text-2xl tracking-wider">
            MAGIC<span className="text-primary">POTION</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/magic-potion/shop" className="text-sm tracking-wide hover:text-primary transition-colors">SHOP</Link>
            <Link to="/magic-potion" className="text-sm tracking-wide hover:text-primary transition-colors">LOOKBOOK</Link>
            <Link to="/magic-potion/about" className="text-sm tracking-wide text-primary">ABOUT</Link>
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
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm tracking-widest mb-8">
              OUR STORY
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6">
              THE <span className="text-gradient-primary">ORIGIN</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Born from the streets, crafted for the culture. Magic Potion is more than apparel—it's a statement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
                FROM VISION TO <span className="text-primary">REALITY</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Magic Potion Apparel was born in Texas with a simple mission: create streetwear that speaks to the soul. We saw a gap in the market—clothing that looked good but lacked meaning.
                </p>
                <p>
                  Every piece we create is infused with intention. From the designs that draw from urban culture and mystical aesthetics, to the premium materials that ensure lasting quality, we obsess over the details.
                </p>
                <p>
                  We're not just selling clothes. We're building a community of individuals who understand that what you wear is an extension of who you are. Magic Potion is for those who dare to be different.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80"
                  alt="Streetwear culture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <p className="font-display text-3xl">EST.</p>
                <p className="font-display text-5xl">2024</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">OUR MISSION</h2>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              "To create apparel that empowers individuals to express their authentic selves—
              <span className="text-primary"> blending streetwear aesthetics with mystical energy </span>
              to build a global community of culture creators."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">WHAT WE BELIEVE</h2>
            <p className="text-muted-foreground">The principles that guide every thread we stitch</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl tracking-wide mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Users className="w-6 h-6" />
              <span className="font-medium tracking-wide uppercase">The Team</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">THE CREATORS</h2>
            <p className="text-muted-foreground">The minds behind the magic</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <h3 className="font-display text-xl tracking-wide">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
            JOIN THE <span className="text-primary">MOVEMENT</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Ready to wear the culture? Explore our latest drops and become part of the Magic Potion family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/magic-potion/shop">
              <Button variant="neon" size="xl">
                SHOP NOW
              </Button>
            </Link>
            <a href="https://instagram.com/magicpotionapparel" target="_blank" rel="noopener noreferrer">
              <Button variant="neon-outline" size="xl">
                <Instagram className="w-5 h-5" />
                FOLLOW US
              </Button>
            </a>
          </div>
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

export default MagicPotionAbout;
