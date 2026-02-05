import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const realms = [
    {
        id: 'origins',
        name: 'Elysium',
        greekName: 'Day 1',
        norseName: '10:00 AM',
        x: 50,
        y: 15,
        description: 'A two-day fusion of technology, entrepreneurship, and culture at MUJ — where bold ideas, real innovation, and powerful performances come together.',
        color: '#D4AF37',
        connections: ['gods', 'prophecy'],
        icon: 'icon/elysium.jpeg'
    },
    {
        id: 'gods',
        name: 'Tech Eden 2.0',
        greekName: 'Day 1',
        norseName: '10:00 AM',
        x: 25,
        y: 35,
        description: 'A TEDx-style experience where innovators and creators share future-ready ideas that spark change and redefine possibilities.',
        color: '#3B82F6',
        connections: ['time', 'prophecy', 'mortals'],
        icon: 'icon/techeden.jpeg'
    },
    {
        id: 'prophecy',
        name: 'Swara',
        greekName: 'Day 1',
        norseName: '3:30 PM',
        x: 75,
        y: 35,
        description: 'A mesmerizing cultural showcase tracing the journey of women through Indian classical art — powerful, graceful, and deeply expressive.',
        color: '#8B5CF6',
        connections: ['time', 'mortals', 'gods'],
        icon: 'icon/swara.jpeg'
    },
    // {
    //     id: 'trials',
    //     name: 'Realm of Trials',
    //     greekName: 'Labyrinth',
    //     norseName: 'Midgard',
    //     x: 50,
    //     y: 55,
    //     description: 'The testing grounds where heroes are forged through challenge and conquest.',
    //     color: '#F97316',
    //     connections: ['gods', 'prophecy', 'mortals']
    // },
    {
        id: 'time',
        name: 'The Deal Room',
        greekName: 'Day 2',
        norseName: '10:30 AM',
        x: 15,
        y: 65,
        description: 'A Shark Tank–style pitch arena where ideas are tested, challenged, and transformed into real-world opportunities.',
        color: '#10B981',
        connections: ['prophecy', 'mortals', 'gods'],
        icon: 'icon/dealroom.jpeg'
    },
    {
        id: 'mortals',
        name: 'Her Verdict',
        greekName: 'Day 2',
        norseName: '2:00 PM',
        x: 85,
        y: 65,
        description: 'A courtroom-style debate where logic, confidence, and clarity take the stand — and only the strongest arguments win.',
        color: '#EC4899',
        connections: ['time', 'prophecy', 'gods'],
        icon: 'icon/herverdict.jpeg'
    }
];

const MythologyMap = () => {
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [hoveredRealm, setHoveredRealm] = useState(null);

    useEffect(() => {
        if (selectedRealm) {
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = 'unset';
            if (window.lenis) window.lenis.start();
        }

        return () => {
            document.body.style.overflow = 'unset';
            if (window.lenis) window.lenis.start();
        };
    }, [selectedRealm]);

    const scrollToRealm = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getConnectionPath = (from, toId) => {
        const to = realms.find(r => r.id === toId);
        if (!to) return '';

        const x1 = from.x;
        const y1 = from.y;
        const x2 = to.x;
        const y2 = to.y;

        // Create curved path
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 5;

        return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
    };

    return (
        <section id="mythology-map" className="relative min-h-screen bg-obsidian py-20 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-4">
                        The Mythological Nexus
                    </h2>
                    <p className="text-gold/60 text-lg max-w-2xl mx-auto">
                        Navigate the interconnected realms of Elysium. Click any realm to explore its mysteries.
                    </p>
                </motion.div>

                {/* Interactive Map */}
                <div className="relative w-full max-w-4xl mx-auto aspect-[3/4] md:aspect-[4/3] bg-obsidian-light/30 rounded-2xl border border-gold/20 overflow-hidden">
                    {/* Constellation background */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-gold rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>

                    {/* SVG for connections */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {realms.map(realm =>
                            realm.connections.map(connId => {
                                const isActive = hoveredRealm === realm.id || hoveredRealm === connId;
                                return (
                                    <motion.path
                                        key={`${realm.id}-${connId}`}
                                        d={getConnectionPath(realm, connId)}
                                        fill="none"
                                        stroke={isActive ? '#D4AF37' : '#D4AF3730'}
                                        strokeWidth={isActive ? 0.3 : 0.15}
                                        strokeDasharray={isActive ? "none" : "1 1"}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                    />
                                );
                            })
                        )}
                    </svg>

                    {/* Realm nodes */}
                    {realms.map((realm, index) => (
                        <motion.div
                            key={realm.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{ left: `${realm.x - 5}%`, top: `${realm.y - 5}%` }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                            onMouseEnter={() => setHoveredRealm(realm.id)}
                            onMouseLeave={() => setHoveredRealm(null)}
                            onClick={() => setSelectedRealm(realm)}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-xl"
                                style={{ backgroundColor: realm.color }}
                                animate={{
                                    opacity: hoveredRealm === realm.id ? 0.6 : 0.2,
                                    scale: hoveredRealm === realm.id ? 1.5 : 1,
                                }}
                            />

                            {/* Node */}
                            <motion.div
                                className="relative w-16 h-20 md:w-20 md:h-[7rem] rounded-xl border-2 flex items-center justify-center"
                                style={{
                                    borderColor: realm.color,
                                    backgroundColor: `${realm.color}20`,
                                }}
                            >
                                <img
                                    src={realm.icon}
                                    alt={realm.name}
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                />
                            </motion.div>

                            {/* Label */}
                            <motion.div
                                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                                animate={{
                                    opacity: hoveredRealm === realm.id ? 1 : 0.7,
                                }}
                            >
                                <p className="font-cinzel text-xs md:text-sm text-gold">{realm.name}</p>
                                <p className="text-[10px] text-gold/50">
                                    {realm.greekName} • {realm.norseName}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Realm Detail Modal */}
                <AnimatePresence>
                    {selectedRealm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedRealm(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="relative w-[90%] max-w-md bg-obsidian-light border border-gold/30 rounded-2xl p-6 md:p-8 text-center"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Glow */}
                                <div
                                    className="absolute inset-0 rounded-2xl blur-2xl opacity-20"
                                    style={{ backgroundColor: selectedRealm.color }}
                                />

                                <div className="relative z-100 h-auto md:h-[80%]">
                                    <div
                                        className="relative w-40 h-60 md:w-64 md:h-96 mx-auto mb-4 md:mb-6 rounded-xl border-2 overflow-hidden shadow-2xl"
                                        style={{
                                            borderColor: selectedRealm.color,
                                            backgroundColor: `${selectedRealm.color}20`,
                                        }}
                                    >
                                        <img
                                            src={selectedRealm.icon}
                                            alt={selectedRealm.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>

                                    <h3 className="font-cinzel text-xl md:text-2xl text-gold mb-2">
                                        {selectedRealm.name}
                                    </h3>

                                    <div className="flex justify-center gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm">
                                        <span className="text-norse">{selectedRealm.norseName}</span>
                                        <span className="text-gold/30">•</span>
                                        <span className="text-greek">{selectedRealm.greekName}</span>
                                    </div>

                                    <p className="text-gold/70 text-xs md:text-sm mb-4 md:mb-6">
                                        {selectedRealm.description}
                                    </p>

                                    <button
                                        onClick={() => window.location.href = "https://docs.google.com/forms/d/17JyODAtgVXvShctfhLuNT0yUQ9w_3xzd1uc6SmBmduY/edit"}
                                        className="w-full md:w-auto px-6 py-2 md:py-3 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/50 rounded-lg font-cinzel text-sm md:text-base text-gold hover:from-gold/30 hover:to-gold/20 transition-all"
                                    >
                                        Enter This Realm
                                    </button>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedRealm(null)}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 text-gold/50 hover:text-gold transition-colors p-2"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default MythologyMap;
