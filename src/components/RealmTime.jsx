import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const targetDate = new Date('2026-02-10T09:00:00');

const day1Schedule = [
    { time: '09:00', event: 'Gates of Elysium Open', type: 'ceremony' },
    { time: '10:00', event: 'Tech Eden 2.0 – TEDx Style Tech Talks', type: 'keynote' },
    { time: '13:00', event: 'Networking & Refreshment Break', type: 'break' },
    { time: '15:30', event: 'Swara – Echoes of Indian Classical Heritage', type: 'cultural' },
    { time: '17:30', event: 'Community Connect & Closing Note (Day 1)', type: 'ceremony' },
];
const day2Schedule = [
    { time: '09:00', event: 'Gates of Elysium Open', type: 'ceremony' },
    { time: '09:30', event: 'The Deal Room – Shark Tank Pitch Arena', type: 'event' },
    { time: '13:00', event: 'Lunch & Networking Break', type: 'break' },
    { time: '14:30', event: 'Her Verdict – Courtroom Style Debate', type: 'event' },
    { time: '17:00', event: 'Closing Ceremony – Rise of the Visionaries', type: 'ceremony' },
];


const RealmTime = () => {
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
        <section id="realm-time" className="realm-section">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian-light to-background" />

            <div className="container mx-auto px-6 relative z-10" ref={ref}>

                {/* Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-5xl mx-auto"
                >
                    <h3 className="font-display text-2xl text-center text-foreground mb-8">Chronicles of the Day</h3>
                    <div className='flex flex-col md:flex-row'>
                        <div className="space-y-3 mx-0 md:mx-5">
                        <h4 className='w-full flex justify-center font-display text-3xl md:text-6xl lg:text-5xl font-bold mb-6 text-glow-gold'>Day 1</h4>
                            {day1Schedule.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                                    className={`flex items-center gap-4 p-4 rounded-lg border ${typeStyles[item.type]} transition-all duration-300 hover:scale-[1.02]`}
                                >
                                    <span className="font-display text-lg text-primary w-16">{item.time}</span>
                                    <div className="h-8 w-px bg-primary/30" />
                                    <span className="text-foreground flex-1">{item.event}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div className="space-y-3 mx-0 md:mx-5">
                        <h4 className='w-full flex justify-center font-display text-3xl md:text-6xl lg:text-5xl font-bold mb-6 text-glow-gold mt-10 md:mt-0 lg:mt-0'>Day 2</h4>
                            {day2Schedule.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                                    className={`flex items-center gap-4 p-4 rounded-lg border ${typeStyles[item.type]} transition-all duration-300 hover:scale-[1.02]`}
                                >
                                    <span className="font-display text-lg text-primary w-16">{item.time}</span>
                                    <div className="h-8 w-px bg-primary/30" />
                                    <span className="text-foreground flex-1">{item.event}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default RealmTime;
