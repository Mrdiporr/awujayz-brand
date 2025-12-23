import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ArrowLeft, PartyPopper, Users, Calendar, Phone, Mail, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const cateringPackages = [
  {
    name: "Starter Package",
    guests: "10-25",
    price: "Starting at $250",
    includes: ["Choice of 2 proteins", "2 sides", "Bread & pickles", "Plates & utensils"],
  },
  {
    name: "Party Package",
    guests: "25-50",
    price: "Starting at $450",
    includes: ["Choice of 3 proteins", "3 sides", "Bread & pickles", "Sauces & drinks", "Plates & utensils"],
  },
  {
    name: "Event Package",
    guests: "50-100+",
    price: "Custom Quote",
    includes: ["Full menu access", "Custom sides", "Staff available", "Setup & cleanup", "Full service options"],
  },
];

const CravinsCatering = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    eventType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Catering Request Received!",
      description: "We'll get back to you within 24 hours with a custom quote.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      eventType: "",
      message: "",
    });
    setIsSubmitting(false);
  };

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
            <Link to="/cravins/catering" className="text-sm font-medium text-primary transition-colors">Catering</Link>
          </div>
          <a href="tel:+14694279730">
            <Button variant="warm">
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <Link to="/cravins" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <PartyPopper className="w-6 h-6" />
              <span className="font-medium tracking-wide uppercase">Catering Services</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Let Us Cater Your <span className="text-primary">Event</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              From corporate lunches to wedding celebrations, we bring authentic Texas BBQ flavor to any occasion. Custom menus available for groups of any size.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Catering Packages</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cateringPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="font-display text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Users className="w-4 h-4" />
                  <span>{pkg.guests} guests</span>
                </div>
                <p className="text-primary font-bold text-xl mb-6">{pkg.price}</p>
                <ul className="space-y-3">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold mb-4">Request a Quote</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours with a custom quote for your event.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 shadow-lg border border-border"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Date *</label>
                  <Input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Guest Count *</label>
                  <Input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type</label>
                  <Input
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    placeholder="Wedding, Corporate, Birthday..."
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Additional Details</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event, dietary requirements, or any special requests..."
                  rows={4}
                />
              </div>
              <Button type="submit" variant="warm" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </Button>
            </motion.form>

            <div className="mt-8 text-center text-muted-foreground">
              <p className="mb-2">Or contact us directly:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="tel:+14694279730" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  (469) 427-9730
                </a>
                <a href="tel:+16466436144" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  (646) 643-6144
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Cravins TX. All rights reserved.</p>
          <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
        </div>
      </footer>
    </div>
  );
};

export default CravinsCatering;
