import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Phone, Instagram, Clock, Star, UtensilsCrossed, Flame, PartyPopper, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cravins-hero.jpg";

const menuItems = [
  {
    name: "Brisket Tacos",
    description: "Slow-smoked brisket with pickled onions, cilantro, and house salsa",
    price: 14,
    category: "Signature",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
  },
  {
    name: "Texas Loaded Fries",
    description: "Crispy fries topped with pulled pork, queso, and jalapeños",
    price: 12,
    category: "Favorites",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    name: "Smoked Wings",
    description: "12-hour smoked wings with your choice of sauce",
    price: 16,
    category: "Signature",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80",
  },
  {
    name: "BBQ Burger",
    description: "Half-pound patty with smoked cheddar, bacon, and tangy BBQ sauce",
    price: 15,
    category: "Classics",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
];

const schedule = [
  { day: "Wed-Sun", location: "Circles Lounge Café", address: "18110 Midway Rd STE 134, Dallas, TX 75287", time: "Kitchen Open 4PM" },
  { day: "Weekdays", location: "Food Truck Service", address: "Dallas, Texas", time: "Call for Location" },
  { day: "Catering", location: "Private Events", address: "Book us for your event!", time: "By Appointment" },
  { day: "Orders", location: "Call Ahead", address: "Fresh made & tasty meals", time: "(469) 427-9730" },
];

const CravinsHome = () => {
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
            <Link to="/cravins/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link to="/cravins/catering" className="text-sm font-medium hover:text-primary transition-colors">Catering</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <Link to="/cravins/catering"><Button variant="warm">Order Catering</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Delicious Texas BBQ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Now Serving Dallas, TX
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Taste the
              <br />
              <span className="text-primary">Passion</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Authentic Texas flavors on wheels. From slow-smoked brisket to loaded tacos, we bring the heat wherever we go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="warm" size="xl">
                <MapPin className="w-5 h-5" />
                Find Us Today
              </Button>
              <Button variant="golden" size="xl">
                <PartyPopper className="w-5 h-5" />
                Book Catering
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Today's Location Banner */}
      <section className="py-6 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-80">FIND US AT CIRCLES</p>
                <p className="text-xl font-bold">18110 Midway Rd STE 134, Dallas, TX 75287</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Wed-Sun • Kitchen Open 4PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <ChefHat className="w-6 h-6" />
              <span className="font-medium tracking-wide uppercase">Our Menu</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Fan Favorites</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every dish is made fresh daily with locally sourced ingredients and a whole lot of Texas love.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-bold">{item.name}</h3>
                    <span className="text-primary font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="warm" size="lg">
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Calendar className="w-6 h-6" />
              <span className="font-medium tracking-wide uppercase">Weekly Schedule</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Find Us This Week</h2>
            <p className="text-muted-foreground">We move around Austin to bring the taste to your neighborhood!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center border border-border hover:border-primary/30 transition-colors"
              >
                <p className="text-primary font-bold text-lg mb-2">{item.day}</p>
                <p className="font-display text-xl font-bold mb-1">{item.location}</p>
                <p className="text-muted-foreground text-sm mb-3">{item.address}</p>
                <p className="inline-flex items-center gap-1 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  {item.time}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80"
            alt="Catering event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-earth/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-background">
          <div className="inline-flex items-center gap-2 mb-6">
            <PartyPopper className="w-6 h-6" />
            <span className="font-medium tracking-wide uppercase">Catering Services</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let Us Cater Your Event
          </h2>
          <p className="text-background/80 max-w-2xl mx-auto mb-8 text-lg">
            From corporate lunches to wedding celebrations, we bring the flavor and the fun. Custom menus available for groups of any size.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-background text-brand-earth hover:bg-background/90">
              Request Quote
            </Button>
            <Button size="xl" variant="outline" className="border-background text-background hover:bg-background/10">
              <Phone className="w-5 h-5" />
              (469) 427-9730
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">What Folks Are Saying</h2>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
              ))}
              <span className="ml-2 text-muted-foreground">4.9 out of 5 on Google</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Mike R.", text: "Best brisket tacos I've ever had! The meat just melts in your mouth. 🔥" },
              { name: "Lisa T.", text: "Catered our company event and everyone was raving about the food for weeks!" },
              { name: "Carlos M.", text: "I follow this truck around Austin. The loaded fries are addictive!" },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{review.text}"</p>
                <p className="font-semibold">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <Instagram className="w-10 h-10 mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold mb-2">Follow the Flavor</h2>
          <p className="opacity-80 mb-6">Daily updates, location alerts, and food pics that'll make you hungry</p>
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Flame className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-bold">CravinsTX</span>
              </div>
              <p className="text-sm text-muted-foreground">Freshly made & tasty meals serving Dallas, Texas.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Menu</li>
                <li>Weekly Schedule</li>
                <li>Catering</li>
                <li>About Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (469) 427-9730</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (646) 643-6144</li>
                <li className="flex items-center gap-2"><Instagram className="w-4 h-4" /> @cravins.tx</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Book Us</h4>
              <p className="text-sm text-muted-foreground mb-4">Available for private events, corporate catering, and festivals.</p>
              <Button variant="warm" size="sm">Get Quote</Button>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Cravins TX. All rights reserved.</p>
            <Link to="/" className="hover:text-primary transition-colors">← Back to Brand Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CravinsHome;
