import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Time from './Time'

// --- Sub-Components ---

const ParticleField = ({ count = 500, color = '#c9a227' }) => {
    const mesh = useRef(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            scales[i] = Math.random();
        }

        return { positions, scales };
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={color}
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const WorldTree = () => {
    const groupRef = useRef(null);
    const branchesRef = useRef(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
        if (branchesRef.current) {
            branchesRef.current.children.forEach((child, i) => {
                child.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05;
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, -2, 0]}>
            {/* Main trunk */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.3, 0.5, 6, 8]} />
                <meshStandardMaterial
                    color="#2a1810"
                    roughness={0.9}
                    emissive="#1a0f08"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Branches */}
            <group ref={branchesRef}>
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const height = 3 + Math.random() * 2;
                    return (
                        <group key={i} rotation={[0, angle, 0]}>
                            <mesh position={[0.8, height, 0]} rotation={[0, 0, -Math.PI / 4]}>
                                <cylinderGeometry args={[0.05, 0.15, 2, 6]} />
                                <meshStandardMaterial
                                    color="#3d2817"
                                    roughness={0.8}
                                    emissive="#1a0f08"
                                    emissiveIntensity={0.1}
                                />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* Glowing runes on trunk */}
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[0.35, 1 + i * 0.8, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.02, 0.3, 0.1]} />
                    <meshStandardMaterial
                        color="#c9a227"
                        emissive="#c9a227"
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}

            {/* Root system */}
            {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 0.6, -0.5, Math.sin(angle) * 0.6]}
                        rotation={[Math.PI / 4, angle, 0]}
                    >
                        <cylinderGeometry args={[0.08, 0.15, 1.5, 6]} />
                        <meshStandardMaterial
                            color="#2a1810"
                            roughness={0.9}
                        />
                    </mesh>
                );
            })}

            {/* Energy orbs around the tree */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 2 + Math.random();
                const height = 2 + Math.random() * 3;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}
                    >
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#4fa3e3" : "#c9a227"}
                            emissive={i % 2 === 0 ? "#4fa3e3" : "#c9a227"}
                            emissiveIntensity={2}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};

const Scene3D = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 2, 10], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} color="#c9a227" />
                    <pointLight position={[-10, 5, -10]} intensity={0.3} color="#4fa3e3" />
                    <spotLight
                        position={[0, 15, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={0.5}
                        color="#c9a227"
                    />

                    <WorldTree />
                    <ParticleField count={300} color="#c9a227" />
                    <ParticleField count={200} color="#4fa3e3" />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 3}
                    />

                    <fog attach="fog" args={['#0a0a0f', 8, 25]} />
                </Suspense>
            </Canvas>
        </div>
    );
};

const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

const RuneSymbols = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Floating runes */}
            {[...Array(20)].map((_, i) => {
                const rune = runes[Math.floor(Math.random() * runes.length)];
                const left = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = 15 + Math.random() * 10;

                return (
                    <motion.div
                        key={i}
                        className="absolute text-4xl text-primary/20 font-display rune-glow"
                        style={{ left: `${left}%` }}
                        initial={{ y: '100vh', opacity: 0, rotate: 0 }}
                        animate={{
                            y: '-20vh',
                            opacity: [0, 0.3, 0.3, 0],
                            rotate: 360,
                        }}
                        transition={{
                            duration,
                            delay,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {rune}
                    </motion.div>
                );
            })}

            {/* Corner rune decorations */}
            <div className="absolute top-10 left-10 text-6xl text-primary/10 animate-rune-rotate">
                ᛟ
            </div>
            <div className="absolute top-10 right-10 text-6xl text-primary/10 animate-rune-rotate" style={{ animationDirection: 'reverse' }}>
                ᚨ
            </div>
            <div className="absolute bottom-10 left-10 text-6xl text-primary/10 animate-rune-rotate" style={{ animationDelay: '-10s' }}>
                ᛊ
            </div>
            <div className="absolute bottom-10 right-10 text-6xl text-primary/10 animate-rune-rotate" style={{ animationDelay: '-15s', animationDirection: 'reverse' }}>
                ᚠ
            </div>
        </div>
    );
};

// --- Main HeroSection ---

const HeroSection = () => {
    return (
        <section id='ely' className="relative min-h-screen flex items-center justify-center overflow-hidden mt-10">
            {/* 3D Background */}
            <Scene3D />

            {/* Floating Runes */}
            <RuneSymbols />

            {/* Fog overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none z-10" />

            {/* Lightning effect */}
            <div className="absolute inset-0 bg-norse/5 animate-lightning pointer-events-none z-10" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-6"
                >
                    <span className="text-sm tracking-[0.5em] text-primary/80 font-body uppercase">
                        A Fusion of Innovation, Destiny & Divine Intellect
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-glow-gold"
                >
                    <span className="text-foreground">ELYSIUM</span>
                    <span className="text-primary"> 2026</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="font-display text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 tracking-wide"
                >
                    Where Mortals Rise as Legends
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="flex items-center justify-center gap-4 mb-12"
                >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
                    <span className="text-primary text-2xl">⚡</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                >
                    <button
                        className="btn-divine animate-glow-pulse"
                        onClick={() => window.location.href = "https://docs.google.com/forms/d/17JyODAtgVXvShctfhLuNT0yUQ9w_3xzd1uc6SmBmduY/edit"}
                    >
                        Enter the Realm
                    </button>
                </motion.div>

                <div><Time /></div>

            </div>
        </section>
    );
};

export default HeroSection;
