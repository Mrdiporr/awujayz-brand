import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Truck, Star, Shield, Clock, Users, Heart, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Elixir Team",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Building trusted services across Texas since day one.",
  },
  {
    name: "Operations Manager",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    bio: "Ensuring every move runs smoothly and on time.",
  },
  {
    name: "Customer Success",
    role: "Client Relations",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    bio: "Your satisfaction is our top priority.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "Licensed, insured, and committed to protecting your belongings like they're our own.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with asking: 'How does this benefit our customers?'",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We don't just meet expectations—we exceed them. That's the Easily Movers standard.",
  },
];

const milestones = [
  { year: "2014", title: "Company Founded", description: "Started with one truck and a dream" },
  { year: "2017", title: "Expanded Services", description: "Added junk removal and cleaning" },
  { year: "2020", title: "Multi-City Coverage", description: "Now serving Dallas, Austin & Houston" },
  { year: "2024", title: "5,000+ Jobs", description: "Trusted by thousands of Texas families" },
];

const EasilyMoversAbout = () => {
  return (
    <div className="theme-easily-movers min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/easily-movers" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              Easily<span className="text-secondary">Movers</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/easily-movers" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
            <Link to="/easily-movers/about" className="text-sm font-medium text-primary">About</Link>
            <Link to="/easily-movers/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+16466436144" className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary">
              <Phone className="w-4 h-4" />
              (646) 643-6144
            </a>
            <Link to="/easily-movers/contact"><Button variant="trust">Get Free Quote</Button></Link>
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
              <Users className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Moving Texas
              <br />
              <span className="text-primary">Forward</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For over a decade, Easily Movers has been helping Texas families and businesses 
              transition to new chapters with care, professionalism, and reliability.
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
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Built on <span className="text-primary">Trust</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Easily Movers started with a simple idea: moving doesn't have to be stressful. 
                  Founded in 2014, we set out to provide Texas families with a moving experience 
                  they could actually enjoy—or at least not dread.
                </p>
                <p>
                  What began as a single-truck operation has grown into a comprehensive service 
                  company covering moving, junk removal, and handyman services across 
                  Dallas-Fort Worth, Austin, and Houston.
                </p>
                <p>
                  But growth hasn't changed our core values. Every team member is trained to 
                  treat your belongings like their own. Every job, big or small, receives the 
                  same attention to detail and commitment to excellence.
                </p>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-success" />
                  <span className="font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-success" />
                  <span className="font-medium">Background Checked</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80"
                  alt="Professional movers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                    <Star className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">10+</p>
                    <p className="text-sm text-muted-foreground">Years in Business</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
              "To make every transition in life—whether it's a new home, a fresh start, or simply 
              decluttering—as seamless and stress-free as possible. We move more than furniture; 
              <span className="font-bold"> we move lives forward.</span>"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground">The values that guide every job we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">From humble beginnings to trusted service provider</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl font-bold mb-1">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">The people behind your stress-free move</p>
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
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
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
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied Texas families who trust Easily Movers for their moving and service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/easily-movers/contact">
              <Button variant="secondary" size="xl" className="bg-background text-foreground hover:bg-background/90">
                Get Free Quote
              </Button>
            </Link>
            <a href="tel:+16466436144">
              <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="w-5 h-5" />
                (646) 643-6144
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">EasilyMovers</span>
            </div>
            <p>© 2024 Easily Movers / Elixir.TX Services. All rights reserved.</p>
            <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EasilyMoversAbout;
