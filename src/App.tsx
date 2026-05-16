/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Plus, 
  X, 
  Globe, 
  Instagram, 
  Mail, 
  Menu
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Homes', href: '#' },
    { name: 'Technology', href: '#' },
    { name: 'Locations', href: '#' },
    { name: 'Process', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12 ${
        isScrolled ? 'bg-surface/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`font-display text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-primary'}`}
        >
          Amero
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`font-display text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors ${
                i === 0 ? 'border-b-2 border-primary pb-1' : 'text-on-surface-variant'
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-primary text-white px-8 py-2 rounded-full font-display text-xs font-bold uppercase tracking-widest"
          >
            Sign Up
          </motion.button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-surface-dim overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="font-display text-sm font-bold uppercase tracking-widest text-on-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-primary text-white w-full py-4 rounded-full font-display text-xs font-bold uppercase tracking-widest">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQItem = ({ question, answer, defaultOpen = false }: { question: string, answer: string, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className={`p-6 md:p-8 rounded-2xl transition-all duration-300 architectural-shadow ${
        isOpen ? 'bg-primary text-white' : 'bg-white text-on-surface'
      }`}
    >
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-display text-lg md:text-xl font-semibold">{question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
            isOpen ? 'border-white/20' : 'border-outline'
          }`}
        >
          <Plus size={18} className={isOpen ? 'text-white' : 'text-on-surface'} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <p className={`text-sm md:text-base leading-relaxed ${isOpen ? 'text-white/70' : 'text-on-surface-variant'}`}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[800px] md:h-[972px] px-4 py-4 md:px-12 md:py-8 max-w-[1440px] mx-auto">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden architectural-shadow">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071" 
            alt="Modern Cabin"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
            <div className="mt-16 md:mt-24 max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.1] mb-6"
              >
                Modular Homes,<br />Proven Over Time
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
              >
                Sustainable, precision-engineered living spaces designed to integrate seamlessly with the world's most breathtaking landscapes.
              </motion.p>
              <motion.a 
                href="#"
                whileHover={{ gap: '12px' }}
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 rounded-full font-display text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
              >
                Explore Properties <ArrowRight size={18} />
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-20 items-end md:justify-end text-left md:text-right mt-12 md:mt-0">
              {[
                { value: '200+', label: 'Happy Customers' },
                { value: '65+', label: 'Top Hotels' },
                { value: '250+', label: 'Experienced Guide' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-white font-display text-3xl md:text-4xl font-bold">{stat.value}</span>
                  <span className="font-display text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Homes */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl text-primary font-bold mb-4"
            >
              Featured Homes with Modern Design
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-on-surface-variant max-w-2xl"
            >
              Curated architectural masterpieces defined by efficiency, sustainability, and uncompromising aesthetics.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[800px]">
            {/* Main Featured Case */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-7 group relative overflow-hidden rounded-[24px] architectural-shadow cursor-pointer aspect-[4/3] md:aspect-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000" 
                alt="The Horizon"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all"></div>
              <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-4">
                <div className="flex gap-2">
                  <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-display text-[10px] font-bold uppercase tracking-widest">The Horizon</span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full font-display text-[10px] font-bold uppercase tracking-widest">$1,250,000</span>
                </div>
                <p className="text-white/80 text-sm md:text-base max-w-sm">Panoramic views meet industrial minimalism in this three-bedroom flagship.</p>
              </div>
            </motion.div>

            {/* Grid of 4 Smaller Cards */}
            <div className="md:col-span-5 grid grid-cols-2 gap-6 h-full">
              {[
                { name: 'The Cabin', price: '$450,000', img: 'https://images.unsplash.com/photo-1449156001131-afb7bb2d3f7f?auto=format&fit=crop&q=80&w=600' },
                { name: 'Azure Point', price: '$890,000', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' },
                { name: 'The Atelier', price: '$125,000', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600' },
                { name: 'Vineyard Estate', price: '$2,100,000', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600' },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-[20px] architectural-shadow cursor-pointer aspect-square md:aspect-auto"
                >
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="text-white font-display text-sm md:text-base font-bold block">{item.name}</span>
                    <span className="text-white/70 text-[10px] md:text-xs font-medium uppercase tracking-widest">{item.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative h-[400px] md:h-[600px]">
            <motion.div 
              initial={{ rotate: -5, x: -20, opacity: 0 }}
              whileInView={{ rotate: 0, x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 w-4/5 h-4/5 rounded-[24px] overflow-hidden architectural-shadow z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800" 
                alt="Vineyard"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ rotate: 5, x: 20, opacity: 0 }}
              whileInView={{ rotate: 0, x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-[24px] overflow-hidden architectural-shadow border-[8px] border-surface z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800" 
                alt="Modular Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-display text-4xl md:text-5xl text-on-surface font-bold leading-tight">
              With 2 Locations Serving the West Coast and Beyond...
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              Our modular approach is uniquely suited for demanding landscapes. We combine precision factory manufacturing with on-site expertise to deliver high-performance homes that respect the terrain they sit upon. Every project is a testament to our commitment to durability and timeless architecture.
            </p>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-fit bg-primary text-white px-10 py-4 rounded-full font-display text-xs font-bold uppercase tracking-widest architectural-shadow-hover transition-all"
            >
              Explore <ArrowUpRight size={18} className="ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface-container py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-primary font-bold text-center mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="flex flex-col gap-6">
            {[
              { 
                q: "How long does the construction process take?", 
                a: "Typically, our modular homes are completed in 6-9 months from design approval to final on-site installation, significantly faster than traditional builds.",
                open: true
              },
              { 
                q: "Are modular homes more eco-friendly?", 
                a: "Yes, our process reduces material waste by 30% compared to site-built homes and utilizes sustainable materials optimized for thermal efficiency." 
              },
              { 
                q: "Can I customize the floor plan?", 
                a: "While our modules follow a grid for efficiency, we offer extensive interior layout options and finishes to make every home unique." 
              },
              { 
                q: "What kind of foundations are required?", 
                a: "We use precision-poured concrete foundations or raised pier systems depending on the terrain and local regulatory requirements." 
              },
              { 
                q: "Do you handle local permitting?", 
                a: "Yes, our team manages the entire regulatory process, ensuring your project complies with all local building codes and zoning laws." 
              },
            ].map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FAQItem question={item.q} answer={item.a} defaultOpen={item.open} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] md:h-[600px] rounded-[32px] overflow-hidden architectural-shadow flex items-center justify-center text-center p-8"
        >
          <img 
            src="https://images.unsplash.com/photo-1549517045-bc93ee07c1c1?auto=format&fit=crop&q=80&w=2000" 
            alt="Dream Home"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
              Ready to Discover Your Dream Home with Amero?
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-10">
              Join the modular revolution and experience architecture that adapts to you.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-12 py-5 rounded-full font-display text-xs font-bold uppercase tracking-widest hover:bg-secondary-container transition-all"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
            <div className="flex flex-col gap-6">
              <div className="font-display text-3xl font-bold">Amero</div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Redefining modern living through precision-engineered modular architecture. Built for longevity, designed for life.
              </p>
            </div>
            
            {[
              {
                title: 'Company',
                links: ['Architecture', 'Sustainability', 'Investment', 'Careers']
              },
              {
                title: 'Resources',
                links: ['Process Guide', 'Media Kit', 'Filing Documents', 'Contact']
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'Licenses']
              }
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-6">
                <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-white">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a 
                      key={link} 
                      href="#" 
                      className="text-white/50 text-sm hover:text-white hover:underline underline-offset-4 transition-all"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-white/30 text-xs uppercase tracking-widest">
              © 2024 Amero Modular. All rights reserved.
            </span>
            <div className="flex gap-4">
              {[Globe, Instagram, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: '#040608' }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-all font-bold"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
