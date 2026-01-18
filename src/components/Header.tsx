import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-display text-xl text-primary text-glow-gold"
          whileHover={{ scale: 1.05 }}
        >
          ELYSIUM
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          {/* Navigation links removed as requested */}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('realm-mortals')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-4 py-2 border border-primary/50 text-primary text-sm uppercase tracking-wider font-body hover:bg-primary/10 transition-all rounded-sm"
        >
          Enter
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
