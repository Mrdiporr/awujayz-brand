import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ArrowLeft, Star, Beef, Drumstick, Sandwich, Coffee, IceCream, Salad } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuCategories = [
  {
    name: "Signature Plates",
    icon: Beef,
    items: [
      {
        name: "Smoked Brisket Plate",
        description: "12-hour oak-smoked brisket, coleslaw, pickles, Texas toast",
        price: 18,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80",
        popular: true,
      },
      {
        name: "Pulled Pork Plate",
        description: "Slow-smoked pulled pork, mac & cheese, baked beans",
        price: 16,
        image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=400&q=80",
        popular: false,
      },
      {
        name: "Beef Ribs",
        description: "Massive beef ribs, house rub, smoky bark, two sides",
        price: 24,
        image: "https://images.unsplash.com/photo-1544025162-d76978e2b4f5?w=400&q=80",
        popular: true,
      },
    ],
  },
  {
    name: "Tacos & Handhelds",
    icon: Sandwich,
    items: [
      {
        name: "Brisket Tacos (3)",
        description: "Slow-smoked brisket, pickled onions, cilantro, house salsa",
        price: 14,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
        popular: true,
      },
      {
        name: "Pulled Pork Tacos (3)",
        description: "Tender pulled pork, slaw, chipotle aioli",
        price: 12,
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80",
        popular: false,
      },
      {
        name: "BBQ Burger",
        description: "Half-pound patty, smoked cheddar, bacon, tangy BBQ sauce",
        price: 15,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
        popular: false,
      },
      {
        name: "Brisket Sandwich",
        description: "Sliced brisket, pickles, onions on brioche",
        price: 14,
        image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80",
        popular: false,
      },
    ],
  },
  {
    name: "Wings & Sides",
    icon: Drumstick,
    items: [
      {
        name: "Smoked Wings (8pc)",
        description: "12-hour smoked, choice of sauce: BBQ, Buffalo, or Dry Rub",
        price: 16,
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80",
        popular: true,
      },
      {
        name: "Texas Loaded Fries",
        description: "Crispy fries topped with pulled pork, queso, jalapeños",
        price: 12,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
        popular: true,
      },
      {
        name: "Mac & Cheese",
        description: "Creamy three-cheese blend, toasted breadcrumb topping",
        price: 6,
        image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400&q=80",
        popular: false,
      },
      {
        name: "Coleslaw",
        description: "Classic creamy coleslaw, fresh cabbage & carrots",
        price: 4,
        image: "https://images.unsplash.com/photo-1625938145744-e380515399bf?w=400&q=80",
        popular: false,
      },
    ],
  },
  {
    name: "Salads & Light",
    icon: Salad,
    items: [
      {
        name: "BBQ Chopped Salad",
        description: "Mixed greens, brisket, corn, tomatoes, ranch dressing",
        price: 14,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
        popular: false,
      },
      {
        name: "House Salad",
        description: "Fresh greens, cucumber, tomatoes, choice of dressing",
        price: 8,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
        popular: false,
      },
    ],
  },
  {
    name: "Drinks",
    icon: Coffee,
    items: [
      {
        name: "Sweet Tea",
        description: "Classic Southern sweet tea, bottomless refills",
        price: 3,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
        popular: false,
      },
      {
        name: "Fresh Lemonade",
        description: "House-made lemonade, perfectly balanced",
        price: 4,
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80",
        popular: false,
      },
      {
        name: "Craft Sodas",
        description: "Assorted flavors - ask your server",
        price: 3,
        image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80",
        popular: false,
      },
    ],
  },
  {
    name: "Desserts",
    icon: IceCream,
    items: [
      {
        name: "Pecan Pie",
        description: "Classic Texas pecan pie, vanilla ice cream",
        price: 7,
        image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&q=80",
        popular: true,
      },
      {
        name: "Banana Pudding",
        description: "Homemade banana pudding, vanilla wafers",
        price: 6,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80",
        popular: false,
      },
    ],
  },
];

const CravinsMenu = () => {
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
            <Link to="/cravins/menu" className="text-sm font-medium text-primary transition-colors">Menu</Link>
            <Link to="/cravins" className="text-sm font-medium hover:text-primary transition-colors">Find Us</Link>
            <Link to="/cravins/catering" className="text-sm font-medium hover:text-primary transition-colors">Catering</Link>
          </div>
          <Link to="/cravins/catering">
            <Button variant="warm">Order Catering</Button>
          </Link>
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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Freshly made with love. Every dish is prepared with locally sourced ingredients and authentic Texas BBQ techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {menuCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold">{category.name}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.popular && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display text-xl font-bold">{item.name}</h3>
                        <span className="text-primary font-bold text-lg">${item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">
            Call ahead for pickup or visit us at Circles Lounge Café!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+14694279730">
              <Button size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Call (469) 427-9730
              </Button>
            </a>
            <Link to="/cravins/catering">
              <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Catering Inquiry
              </Button>
            </Link>
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

export default CravinsMenu;
