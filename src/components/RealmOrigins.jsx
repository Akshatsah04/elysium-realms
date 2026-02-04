import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const RealmOrigins = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="realm-origins" className="realm-section bg-gradient-realm">
            <div className="fog-layer" />

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-sm tracking-[0.3em] uppercase font-body">The First Realm</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 text-glow-gold">
                        Realm of Origins
                    </h2>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
                        <span className="text-primary text-3xl">Ω</span>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="glass-card p-8 rounded-lg divine-border">
                            <h3 className="font-display text-2xl text-primary mb-4">What is Elysium?</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Elysium is not merely an event — it is a convergence of realms where innovation meets mythology,
                                where technology dances with ancient wisdom. Here, mortals transcend their limits and forge
                                destinies worthy of the gods themselves.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Born from the cosmic union of Greek brilliance and Norse resilience, Elysium 2026 beckons
                                those brave enough to challenge fate and wise enough to harness the power of both worlds.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="glass-card p-8 rounded-lg divine-border">
                            <h3 className="font-display text-2xl text-primary mb-4">What is IEEE WIE?</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                IEEE Women in Engineering (WIE) is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists. It inspires young minds worldwide to pursue careers in STEM, fostering an inclusive and diverse engineering community.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                               Forged in the spirit of progress and equality, IEEE Women in Engineering stands as a global movement of bold minds and fearless innovators — inspiring generations to rise, to lead, and to shape a future where brilliance knows no boundaries.                            </p>
                        </div>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {[
                            { icon: '🏛️', label: 'Divine Wisdom', value: 'Greek Heritage' },
                            { icon: '⚡', label: 'Raw Power', value: 'Norse Strength' },
                            { icon: '🌳', label: 'Infinite Realms', value: 'Yggdrasil' },
                            { icon: '✨', label: 'Eternal Glory', value: 'Elysian Fields' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                className="glass-card p-6 rounded-lg text-center hover:border-primary/50 transition-all duration-300 group"
                            >
                                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                                <p className="font-display text-primary mt-1">{item.value}</p>
                            </motion.div>
                        ))}
                    </motion.div> */}
                </div>
            </div>
        </section>
    );
};

export default RealmOrigins;
