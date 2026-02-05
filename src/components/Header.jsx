import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes or on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    const handleScrollNavigation = (id) => {
        setIsMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-background/95 backdrop-blur-xl border-b border-border/50' : ''
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <motion.a
                    href="/"
                    className="font-display text-xl text-primary text-glow-gold z-50 relative"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/');
                    }}
                >
                    ELYSIUM
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-4 py-2 border border-primary/50 text-primary text-sm uppercase tracking-wider font-body hover:bg-primary/10 transition-all rounded-sm mx-2 lg:mx-5"
                    >
                        Home
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/event')}
                        className="px-4 py-2 border border-primary/50 text-primary text-sm uppercase tracking-wider font-body hover:bg-primary/10 transition-all rounded-sm mx-2 lg:mx-5"
                    >
                        Realm
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/team')}
                        className="px-4 py-2 border border-primary/50 text-primary text-sm uppercase tracking-wider font-body hover:bg-primary/10 transition-all rounded-sm mx-2 lg:mx-5"
                    >
                        Contact us
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = "https://docs.google.com/forms/d/17JyODAtgVXvShctfhLuNT0yUQ9w_3xzd1uc6SmBmduY/edit"}
                        className="px-4 py-2 border border-primary/50 text-primary text-sm uppercase tracking-wider font-body hover:bg-primary/10 transition-all rounded-sm mx-2 lg:mx-5"
                    >
                        Enter
                    </motion.button>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden z-50 relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-primary focus:outline-none p-2"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <motion.span
                                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                                className="w-full h-0.5 bg-primary block origin-center"
                            />
                            <motion.span
                                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                                className="w-full h-0.5 bg-primary block"
                            />
                            <motion.span
                                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                                className="w-full h-0.5 bg-primary block origin-center"
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "100vh" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed inset-0 top-0 left-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden overflow-hidden"
                        >
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                onClick={() => handleNavigation('/')}
                                className="text-2xl font-display text-primary text-glow-gold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Home
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => handleNavigation('/event')}
                                className="text-2xl font-display text-primary text-glow-gold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Realm
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => handleNavigation('/team')}
                                className="text-2xl font-display text-primary text-glow-gold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Contact us
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={() => handleScrollNavigation('realm-mortals')}
                                className="text-2xl font-display text-primary text-glow-gold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Enter
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Header;
