import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const realms = [
    { id: 'ely', name: 'Elysium', symbol: '𝕰' },
    { id: 'gallery', name: 'Gallery', symbol: '⚔' },
    { id: 'mythology-map', name: 'Nexus', symbol: '⚡' },
    { id: 'realm-time', name: 'Chronicles', symbol: '⏳' },
    { id: 'realm-origins', name: 'Origins', symbol: 'Ω' },
    { id: 'realm-mortals', name: 'Mortals', symbol: '✦' },
];

const RealmNavigation = () => {
    const [activeRealm, setActiveRealm] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after hero
            setIsVisible(window.scrollY > window.innerHeight * 0.5);

            // Detect active section based on visibility (most visible section)
            const viewportHeight = window.innerHeight;
            let maxOverlap = 0;
            let activeId = '';

            realms.forEach(realm => {
                const section = document.getElementById(realm.id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Calculate visible height of the section
                    const overlap = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));

                    // If this section takes up more space than the current max, set it as active
                    // Adding a small buffer to prevent rapid switching when equally visible
                    if (overlap > maxOverlap) {
                        maxOverlap = overlap;
                        activeId = realm.id;
                    }
                }
            });

            if (activeId) setActiveRealm(activeId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToRealm = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.5 }}
            className="fixed left-8 top-[45%] -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6"
        >
            {realms.map((realm) => (
                <motion.button
                    key={realm.id}
                    onClick={() => scrollToRealm(realm.id)}
                    className={`group flex items-center gap-3 transition-all duration-300 ${activeRealm === realm.id ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'
                        }`}
                    whileHover={{ x: 5 }}
                >
                    <span className={`w-14 h-14 flex items-center justify-center border rounded-sm transition-all duration-300 text-xl ${activeRealm === realm.id
                        ? 'border-primary bg-primary/10 text-primary text-glow-gold'
                        : 'border-muted-foreground/30 group-hover:border-primary/50'
                        }`}>
                        {realm.symbol}
                    </span>
                    <span className={`text-sm tracking-widest uppercase font-display transition-all duration-300 ${activeRealm === realm.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                        {realm.name}
                    </span>
                </motion.button>
            ))}
        </motion.nav>
    );
};

export default RealmNavigation;
