import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const RealmMortals = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="realm-mortals" className="realm-section">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-norse/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10 mt-[5%]" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-sm tracking-[0.3em] uppercase font-body">Claim Your Destiny</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 text-glow-gold">
                        Realm of Mortals
                    </h2>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
                        <span className="text-primary text-3xl">✦</span>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
                    </div>
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                        Inscribe your name in the scrolls of destiny. Join the chosen few who shall walk among legends.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className='flex justify-center items-center'
                >
                    <button
                        className="btn-divine animate-glow-pulse"
                        onClick={() => window.location.href = "https://docs.google.com/forms/d/17JyODAtgVXvShctfhLuNT0yUQ9w_3xzd1uc6SmBmduY/edit"}
                    >
                        Enter the Realm
                    </button>
                </motion.div>
                <div className="font-display text-6xl sm:text-9xl md:text-[15rem] lg:text-[25rem] font-bold mt-4 text-glow-gold absolute top-[120%] md:top-[135%] left-1/2 -translate-x-1/2">Elysium</div>
            </div>
        </section>
    );
};

export default RealmMortals;
