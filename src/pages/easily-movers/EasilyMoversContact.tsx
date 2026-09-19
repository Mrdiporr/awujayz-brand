import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, ArrowLeft, Phone, Mail, MapPin, Clock, Send, CheckCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const services = [
  "Moving Services",
  "Junk Hauling",
  "Handyman Services",
  "TV Mounting",
  "Other",
];

const EasilyMoversContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    moveDate: "",
    fromAddress: "",
    toAddress: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const details = [
      formData.moveDate && `Preferred date: ${formData.moveDate}`,
      formData.fromAddress && `From: ${formData.fromAddress}`,
      formData.toAddress && `To: ${formData.toAddress}`,
      formData.message,
    ].filter(Boolean).join('\n');
    const { error } = await supabase.from('inquiries').insert({
      brand: 'easily_movers', inquiry_type: formData.service, name: formData.name,
      email: formData.email, phone: formData.phone, message: details,
      event_date: formData.moveDate || null,
    });
    if (error) {
      toast({ title: "We couldn't send your request", description: 'Please call (646) 643-6144 for immediate help.', variant: 'destructive' });
    } else {
      toast({ title: "Quote Request Received!", description: "We'll contact you within 2 hours with a free estimate." });
      setFormData({ name: "", email: "", phone: "", service: "", moveDate: "", fromAddress: "", toAddress: "", message: "" });
    }
    setIsSubmitting(false);
  };

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
            <Link to="/easily-movers" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link to="/easily-movers/contact" className="text-sm font-medium text-primary transition-colors">Contact</Link>
          </div>
          <a href="tel:+16466436144" className="flex items-center gap-2">
            <Button variant="trust">
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <Link to="/easily-movers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Get Your Free <span className="text-primary">Quote</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Fill out the form below and our team will get back to you within 2 hours with a free, no-obligation estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:+16466436144" className="text-muted-foreground hover:text-primary transition-colors">
                      (646) 643-6144
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:elixirtxservices@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      elixirtxservices@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Instagram</p>
                    <a href="https://instagram.com/elixir.txservices" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      @elixir.txservices
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Service Areas</p>
                    <p className="text-muted-foreground">Dallas-Fort Worth, Austin & Houston</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Hours</p>
                    <p className="text-muted-foreground">Mon-Sat: 7AM - 8PM</p>
                    <p className="text-muted-foreground">Sun: 9AM - 5PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-xl">
                <h3 className="font-semibold mb-3">Why Choose Us?</h3>
                <ul className="space-y-2">
                  {["Licensed & Insured", "Free Estimates", "Same-Day Service Available", "Professional Team", "Competitive Pricing"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-brand-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-8 shadow-lg border border-border"
              >
                <h2 className="font-display text-2xl font-bold mb-6">Request a Free Quote</h2>
                
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
                    <label className="block text-sm font-medium mb-2">Service Needed *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <Input
                      type="date"
                      name="moveDate"
                      value={formData.moveDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">From Address</label>
                    <Input
                      name="fromAddress"
                      value={formData.fromAddress}
                      onChange={handleChange}
                      placeholder="Current address or pickup location"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">To Address (for moving services)</label>
                  <Input
                    name="toAddress"
                    value={formData.toAddress}
                    onChange={handleChange}
                    placeholder="Destination address"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Additional Details</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your needs: number of rooms, large items, special requirements, etc."
                    rows={4}
                  />
                </div>
                <Button type="submit" variant="trust" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Get Free Quote
                    </>
                  )}
                </Button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Easily Movers / Elixir.TX Services. All rights reserved.</p>
          <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
        </div>
      </footer>
    </div>
  );
};

export default EasilyMoversContact;
