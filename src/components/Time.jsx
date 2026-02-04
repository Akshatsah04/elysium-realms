import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const targetDate = new Date('2026-02-10T09:00:00');

const Time = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    const typeStyles = {
        ceremony: 'border-primary/50 bg-primary/5',
        keynote: 'border-greek/50 bg-greek/5',
        event: 'border-norse/50 bg-norse/5',
        workshop: 'border-primary/50 bg-primary/5',
        break: 'border-muted-foreground/30 bg-muted/5',
        social: 'border-primary/30 bg-primary/5',
    };

    return (
        <section  className="mt-10" ref={ref}>
            {/* Countdown */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto mb-16"
            >
                <div className="glass-card p-8 rounded-lg">
                    <p className="text-center text-muted-foreground mb-6 uppercase tracking-widest text-sm">
                        The Prophecy Unfolds In
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { value: timeLeft.days, label: 'Days' },
                            { value: timeLeft.hours, label: 'Hours' },
                            { value: timeLeft.minutes, label: 'Minutes' },
                            { value: timeLeft.seconds, label: 'Seconds' },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="glass-card p-4 rounded-lg mb-2 animate-glow-pulse">
                                    <span className="font-display text-3xl md:text-5xl text-primary text-glow-gold">
                                        {String(item.value).padStart(2, '0')}
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-primary mt-6 font-display">February 10, 2026</p>
                </div>
            </motion.div>

        </section>
    );
};

export default Time;
