import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const isInitializedRef = useRef(false);

  // Create ambient soundscape using Web Audio API
  const createAmbientSound = useCallback(() => {
    if (isInitializedRef.current) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    audioContextRef.current = audioContext;

    // Master gain
    const masterGain = audioContext.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(audioContext.destination);
    gainNodeRef.current = masterGain;

    // Create deep drone (fundamental)
    const createDrone = (freq: number, detune: number = 0) => {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = detune;
      
      oscGain.gain.value = 0.1;
      
      // Add slow LFO modulation
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + Math.random() * 0.1;
      lfoGain.gain.value = 5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      
      oscillatorsRef.current.push(osc, lfo);
      return osc;
    };

    // Create ethereal pad sounds
    const createPad = (freq: number) => {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      filter.Q.value = 2;
      
      // Filter modulation
      const filterLfo = audioContext.createOscillator();
      const filterLfoGain = audioContext.createGain();
      filterLfo.type = 'sine';
      filterLfo.frequency.value = 0.05;
      filterLfoGain.gain.value = 300;
      filterLfo.connect(filterLfoGain);
      filterLfoGain.connect(filter.frequency);
      filterLfo.start();
      
      oscGain.gain.value = 0.05;
      
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      
      oscillatorsRef.current.push(osc, filterLfo);
      return osc;
    };

    // Create wind/atmosphere noise
    const createNoise = () => {
      const bufferSize = audioContext.sampleRate * 2;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }
      
      const noise = audioContext.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 400;
      noiseFilter.Q.value = 0.5;
      
      const noiseGain = audioContext.createGain();
      noiseGain.gain.value = 0.03;
      
      // Modulate noise
      const noiseLfo = audioContext.createOscillator();
      const noiseLfoGain = audioContext.createGain();
      noiseLfo.type = 'sine';
      noiseLfo.frequency.value = 0.02;
      noiseLfoGain.gain.value = 0.02;
      noiseLfo.connect(noiseLfoGain);
      noiseLfoGain.connect(noiseGain.gain);
      noiseLfo.start();
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();
      
      noiseNodeRef.current = noise;
      oscillatorsRef.current.push(noiseLfo);
      return noise;
    };

    // Create the ambient layers
    // Deep bass drone (Norse thunder/Greek underworld)
    createDrone(55); // A1
    createDrone(55.5, 5); // Slight detuning for richness
    
    // Mid ethereal pads (Olympus/Asgard atmosphere)
    createPad(220); // A3
    createPad(277.18); // C#4
    createPad(329.63); // E4
    
    // High shimmer (divine light)
    createPad(659.25); // E5
    createPad(880); // A5
    
    // Atmospheric noise (wind through realms)
    createNoise();

    isInitializedRef.current = true;
  }, [volume]);

  const startAudio = useCallback(async () => {
    if (!audioContextRef.current) {
      createAmbientSound();
    }
    
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    setIsPlaying(true);
  }, [createAmbientSound]);

  const stopAudio = useCallback(() => {
    if (audioContextRef.current?.state === 'running') {
      audioContextRef.current.suspend();
    }
    setIsPlaying(false);
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current?.currentTime || 0);
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Ignore errors on cleanup
        }
      });
      if (noiseNodeRef.current) {
        try {
          noiseNodeRef.current.stop();
          noiseNodeRef.current.disconnect();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <div className="relative">
        {/* Expanded controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-3 p-4 bg-obsidian-light/90 backdrop-blur-lg border border-gold/30 rounded-xl min-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-gold" />
                <span className="font-cinzel text-sm text-gold">Realm Ambience</span>
              </div>
              
              <div className="flex items-center gap-3">
                <VolumeX className="w-4 h-4 text-gold/50" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gold/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <Volume2 className="w-4 h-4 text-gold/50" />
              </div>
              
              <p className="text-[10px] text-gold/40 mt-3 text-center">
                Ethereal soundscape of the realms
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={toggleAudio}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="relative w-14 h-14 rounded-full bg-obsidian-light/80 backdrop-blur-lg border border-gold/30 flex items-center justify-center group hover:border-gold/60 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gold/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          
          {/* Sound wave animation when playing */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-gold/60 rounded-full"
                  style={{
                    left: `${35 + i * 12}%`,
                  }}
                  animate={{
                    height: ['30%', '60%', '30%'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Icon */}
          {!isPlaying && (
            <Volume2 className="w-6 h-6 text-gold group-hover:text-gold transition-colors" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AmbientAudio;
