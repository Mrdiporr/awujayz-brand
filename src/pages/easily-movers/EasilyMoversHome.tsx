import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Star, Truck, SprayCanIcon as Spray, Trash2, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/easily-movers-hero.jpg";

const services = [
  {
    icon: Truck,
    title: "Moving Services",
    description: "Residential and commercial moves handled with care and precision.",
    features: ["Local & Long Distance", "Packing & Unpacking", "Furniture Assembly"],
  },
  {
    icon: Trash2,
    title: "Junk Hauling",
    description: "Fast, eco-friendly disposal of unwanted items and debris.",
    features: ["Same-Day Service", "Eco-Friendly Disposal", "Estate Cleanouts"],
  },
  {
    icon: Spray,
    title: "Handyman Services",
    description: "Professional home services including TV hanging and more.",
    features: ["TV Mounting", "Home Repairs", "General Handyman"],
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    text: "Incredibly professional team! They made our move stress-free and handled everything with care.",
    rating: 5,
  },
  {
    name: "Marcus J.",
    location: "Dallas, TX",
    text: "Best junk removal service in Texas. Quick, affordable, and they cleaned up after themselves!",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    location: "Houston, TX",
    text: "Their cleaning service transformed my new home. Highly recommend for move-in cleaning!",
    rating: 5,
  },
];

const EasilyMoversHome = () => {
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
            <Link to="/easily-movers/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Serving Dallas-Fort Worth, Austin & Houston
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Moving & Services
                <br />
                <span className="text-primary">Made Easy</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Professional moving, junk removal, and cleaning services you can trust. Serving Texas families and businesses with care and reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="trust" size="xl">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="trust-outline" size="xl">
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-success" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-success" />
                  <span>Free Estimates</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Professional movers"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                    <Star className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">4.9/5</p>
                    <p className="text-sm text-muted-foreground">500+ Reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for all your moving, cleaning, and junk removal needs across Texas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "5,000+", label: "Jobs Completed" },
              { value: "4.9★", label: "Average Rating" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">Real reviews from real Texas families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Get your free, no-obligation quote today. Our team is ready to help make your next move easy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="bg-background text-foreground hover:bg-background/90">
              Get Free Quote
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5" />
              (646) 643-6144
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold">EasilyMovers</span>
              </div>
              <p className="text-sm text-muted-foreground">Professional moving and services across Texas since 2014.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Moving Services</li>
                <li>Junk Removal</li>
                <li>Cleaning Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Dallas-Fort Worth</li>
                <li>Austin</li>
                <li>Houston</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (646) 643-6144</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Mon-Sat: 7AM-8PM</li>
                <li className="text-xs">elixirtxservices@gmail.com</li>
                <li className="text-xs">IG: @elixir.txservices</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Easily Movers / Elixir.TX Services. All rights reserved.</p>
            <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EasilyMoversHome;
