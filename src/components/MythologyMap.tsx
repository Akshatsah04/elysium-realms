import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RealmNode {
  id: string;
  name: string;
  greekName: string;
  norseName: string;
  x: number;
  y: number;
  description: string;
  color: string;
  connections: string[];
}

const realms: RealmNode[] = [
  {
    id: 'origins',
    name: 'Realm of Origins',
    greekName: 'Chaos',
    norseName: 'Ginnungagap',
    x: 50,
    y: 15,
    description: 'The primordial void from which all creation emerged. Where Greek Chaos meets Norse Ginnungagap.',
    color: '#D4AF37',
    connections: ['gods', 'prophecy']
  },
  {
    id: 'gods',
    name: 'Realm of the Gods',
    greekName: 'Olympus',
    norseName: 'Asgard',
    x: 25,
    y: 35,
    description: 'Where divine beings dwell. Mount Olympus and Asgard converge in eternal glory.',
    color: '#3B82F6',
    connections: ['origins', 'trials', 'time']
  },
  {
    id: 'prophecy',
    name: 'Realm of Prophecy',
    greekName: 'Delphi',
    norseName: 'Well of Urd',
    x: 75,
    y: 35,
    description: 'The seat of oracles and seers. Where fate is written and destinies revealed.',
    color: '#8B5CF6',
    connections: ['origins', 'time', 'trials']
  },
  {
    id: 'trials',
    name: 'Realm of Trials',
    greekName: 'Labyrinth',
    norseName: 'Midgard',
    x: 50,
    y: 55,
    description: 'The testing grounds where heroes are forged through challenge and conquest.',
    color: '#F97316',
    connections: ['gods', 'prophecy', 'mortals']
  },
  {
    id: 'time',
    name: 'Realm of Time',
    greekName: 'Chronos',
    norseName: 'Ragnarök',
    x: 15,
    y: 65,
    description: 'Where past, present, and future intertwine. The countdown to destiny.',
    color: '#10B981',
    connections: ['gods', 'prophecy', 'mortals']
  },
  {
    id: 'mortals',
    name: 'Realm of Mortals',
    greekName: 'Athens',
    norseName: 'Midgard',
    x: 85,
    y: 65,
    description: 'The world of humanity. Where legends begin their journey to ascension.',
    color: '#EC4899',
    connections: ['trials', 'time']
  }
];

const MythologyMap = () => {
  const [selectedRealm, setSelectedRealm] = useState<RealmNode | null>(null);
  const [hoveredRealm, setHoveredRealm] = useState<string | null>(null);

  const scrollToRealm = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getConnectionPath = (from: RealmNode, toId: string) => {
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
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-obsidian-light/30 rounded-2xl border border-gold/20 overflow-hidden">
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
              style={{ left: `${realm.x}%`, top: `${realm.y}%` }}
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
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center"
                style={{ 
                  borderColor: realm.color,
                  backgroundColor: `${realm.color}20`,
                }}
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow: hoveredRealm === realm.id 
                    ? `0 0 30px ${realm.color}80` 
                    : `0 0 10px ${realm.color}40`,
                }}
              >
                <span className="text-2xl md:text-3xl">
                  {realm.id === 'origins' && '⚡'}
                  {realm.id === 'gods' && '👑'}
                  {realm.id === 'prophecy' && '🔮'}
                  {realm.id === 'trials' && '⚔️'}
                  {realm.id === 'time' && '⏳'}
                  {realm.id === 'mortals' && '🏛️'}
                </span>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedRealm(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-md w-full bg-obsidian-light border border-gold/30 rounded-2xl p-8 text-center"
                onClick={e => e.stopPropagation()}
              >
                {/* Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl blur-2xl opacity-20"
                  style={{ backgroundColor: selectedRealm.color }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center text-4xl"
                    style={{ 
                      borderColor: selectedRealm.color,
                      backgroundColor: `${selectedRealm.color}20`,
                    }}
                  >
                    {selectedRealm.id === 'origins' && '⚡'}
                    {selectedRealm.id === 'gods' && '👑'}
                    {selectedRealm.id === 'prophecy' && '🔮'}
                    {selectedRealm.id === 'trials' && '⚔️'}
                    {selectedRealm.id === 'time' && '⏳'}
                    {selectedRealm.id === 'mortals' && '🏛️'}
                  </div>
                  
                  <h3 className="font-cinzel text-2xl text-gold mb-2">
                    {selectedRealm.name}
                  </h3>
                  
                  <div className="flex justify-center gap-4 mb-4 text-sm">
                    <span className="text-norse">{selectedRealm.norseName}</span>
                    <span className="text-gold/30">•</span>
                    <span className="text-greek">{selectedRealm.greekName}</span>
                  </div>
                  
                  <p className="text-gold/70 mb-6">
                    {selectedRealm.description}
                  </p>
                  
                  <button
                    onClick={() => {
                      scrollToRealm(selectedRealm.id);
                      setSelectedRealm(null);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/50 rounded-lg font-cinzel text-gold hover:from-gold/30 hover:to-gold/20 transition-all"
                  >
                    Enter This Realm
                  </button>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedRealm(null)}
                  className="absolute top-4 right-4 text-gold/50 hover:text-gold transition-colors"
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
