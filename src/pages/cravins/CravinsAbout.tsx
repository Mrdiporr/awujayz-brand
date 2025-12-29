import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Instagram, Flame, Heart, Star, ChefHat, Users, Award, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Head Chef",
    role: "Culinary Director",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
    bio: "Bringing authentic Texas flavors with creative twists.",
  },
  {
    name: "Operations Lead",
    role: "Food Truck Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Keeping the wheels turning and customers smiling.",
  },
  {
    name: "Catering Specialist",
    role: "Events Coordinator",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    bio: "Making every event memorable with amazing food.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Every dish is crafted with love. We pour our hearts into each meal because good food creates lasting memories.",
  },
  {
    icon: Star,
    title: "Quality",
    description: "Fresh, locally-sourced ingredients. No shortcuts. We believe great food starts with great ingredients.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're not just serving food—we're feeding the Dallas community. Every meal strengthens our neighborhood bonds.",
  },
];

const milestones = [
  { stat: "10,000+", label: "Meals Served" },
  { stat: "500+", label: "Catered Events" },
  { stat: "4.9★", label: "Google Rating" },
  { stat: "3", label: "Years Strong" },
];

const CravinsAbout = () => {
  return (
    <div className="theme-cravins min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/cravins" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">
              Cravins<span className="text-primary">TX</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/cravins/menu" className="text-sm font-medium hover:text-primary transition-colors">Menu</Link>
            <Link to="/cravins" className="text-sm font-medium hover:text-primary transition-colors">Find Us</Link>
            <Link to="/cravins/about" className="text-sm font-medium text-primary">About</Link>
            <Link to="/cravins/catering" className="text-sm font-medium hover:text-primary transition-colors">Catering</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/cravins.tx" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <Link to="/cravins/catering"><Button variant="warm">Order Catering</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <ChefHat className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              From Our Kitchen
              <br />
              <span className="text-primary">To Your Heart</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cravins TX was born from a simple belief: the best food comes from the heart. 
              We're here to share our passion for Texas flavors with everyone we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
                  alt="Texas BBQ cooking"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <p className="font-display text-2xl">Serving Dallas</p>
                <p className="text-sm opacity-80">Since 2021</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Where <span className="text-primary">Passion</span> Meets Flavor
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cravins TX started as a dream—to bring authentic, soul-warming Texas cuisine 
                  to the streets of Dallas. What began as weekend pop-ups has evolved into a 
                  beloved food destination known for slow-smoked meats and bold flavors.
                </p>
                <p>
                  Our secret? There isn't one. It's just good, honest cooking. We wake up early 
                  to prep our brisket. We source ingredients from local farms. We taste everything 
                  before it leaves our kitchen. No shortcuts. No compromises.
                </p>
                <p>
                  Today, you can find us at Circles Lounge Café in Dallas, rolling through 
                  neighborhoods in our food truck, or catering your special events. Wherever 
                  we go, we bring the same commitment to quality and the same passion that 
                  started it all.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-primary-foreground">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">{item.stat}</p>
                <p className="opacity-80">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-primary mb-6">
              <Award className="w-6 h-6" />
              <span className="font-medium tracking-wide uppercase">Our Mission</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">What Drives Us</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              "To create food that brings people together. Every taco, every plate, every catered 
              event is an opportunity to share joy and 
              <span className="text-primary font-bold"> build community through incredible flavors.</span>"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What We Believe</h2>
            <p className="text-muted-foreground">The principles behind every dish we serve</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Utensils className="w-6 h-6" />
              <span className="font-medium tracking-wide uppercase">The Team</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Meet the Crew</h2>
            <p className="text-muted-foreground">The passionate people behind every meal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-display text-xl font-bold">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-earth/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-background">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Taste the Passion?
          </h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">
            Whether you're stopping by for lunch or booking us for your next event, 
            we can't wait to serve you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cravins/menu">
              <Button size="xl" className="bg-background text-brand-earth hover:bg-background/90">
                View Menu
              </Button>
            </Link>
            <Link to="/cravins/catering">
              <Button size="xl" variant="outline" className="border-background text-background hover:bg-background/10">
                Book Catering
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <Instagram className="w-10 h-10 mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold mb-2">Follow Our Journey</h2>
          <p className="opacity-80 mb-6">Behind-the-scenes, daily specials, and all the delicious moments</p>
          <a href="https://instagram.com/cravins.tx" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              @cravins.tx
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">CravinsTX</span>
            </div>
            <p>© 2024 Cravins TX. All rights reserved.</p>
            <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CravinsAbout;
