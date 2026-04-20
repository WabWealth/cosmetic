'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Generate floating shapes
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.1))',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.2), rgba(34, 197, 94, 0.1))',
            'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.1))',
            'radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.3), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1))',
            'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.1))',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pulsing Orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 300 + i * 50,
            height: 300 + i * 50,
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 15) % 100}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)' 
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.sin(i) * 100, 0],
            y: [0, Math.cos(i) * 100, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `radial-gradient(circle, ${
              particle.id % 3 === 0 
                ? 'rgba(236, 72, 153, 0.6)' 
                : particle.id % 3 === 1 
                ? 'rgba(168, 85, 247, 0.6)' 
                : 'rgba(59, 130, 246, 0.6)'
            }, transparent)`,
            boxShadow: `0 0 ${particle.size}px ${
              particle.id % 3 === 0 
                ? 'rgba(236, 72, 153, 0.8)' 
                : particle.id % 3 === 1 
                ? 'rgba(168, 85, 247, 0.8)' 
                : 'rgba(59, 130, 246, 0.8)'
            }`,
          }}
          animate={{
            x: [
              0,
              Math.sin(particle.id) * 200,
              Math.cos(particle.id) * 150,
              Math.sin(particle.id * 2) * 100,
              0,
            ],
            y: [
              0,
              Math.cos(particle.id) * 200,
              Math.sin(particle.id) * 150,
              Math.cos(particle.id * 2) * 100,
              0,
            ],
            scale: [1, 1.5, 0.8, 1.2, 1],
            rotate: [0, 360, -360, 180, 0],
            opacity: [0.3, 0.8, 0.5, 0.9, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* Rotating Geometric Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.id % 2 === 0
              ? 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(34, 197, 94, 0.3))',
            clipPath: shape.id % 3 === 0 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
              : shape.id % 3 === 1
              ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
              : 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            filter: 'blur(1px)',
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360, shape.rotation + 720],
            scale: [1, 1.3, 0.7, 1.2, 1],
            x: [
              0,
              Math.sin(shape.id) * 300,
              Math.cos(shape.id) * 200,
              Math.sin(shape.id * 2) * 150,
              0,
            ],
            y: [
              0,
              Math.cos(shape.id) * 300,
              Math.sin(shape.id) * 200,
              Math.cos(shape.id * 2) * 150,
              0,
            ],
            opacity: [0.2, 0.6, 0.3, 0.8, 0.2],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Fast Moving Lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute"
          style={{
            width: '2px',
            height: '200px',
            background: `linear-gradient(to bottom, transparent, ${
              i % 2 === 0 ? 'rgba(236, 72, 153, 0.8)' : 'rgba(168, 85, 247, 0.8)'
            }, transparent)`,
            left: `${(i * 8.33) % 100}%`,
            top: '-200px',
            transformOrigin: 'center',
          }}
          animate={{
            y: ['-200px', '100vh'],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Exploding Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            width: '4px',
            height: '4px',
            background: i % 2 === 0 ? 'rgba(236, 72, 153, 1)' : 'rgba(168, 85, 247, 1)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(236, 72, 153, 1)' : 'rgba(168, 85, 247, 1)'}`,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
            x: [
              0,
              (Math.random() - 0.5) * 400,
              (Math.random() - 0.5) * 400,
            ],
            y: [
              0,
              (Math.random() - 0.5) * 400,
              (Math.random() - 0.5) * 400,
            ],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Wave Effects */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute w-full"
          style={{
            height: '200px',
            background: `linear-gradient(90deg, transparent, ${
              i % 2 === 0 ? 'rgba(236, 72, 153, 0.2)' : 'rgba(168, 85, 247, 0.2)'
            }, transparent)`,
            top: `${i * 20}%`,
            clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%, 0% 50%)',
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Color Burst Circles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          className="absolute rounded-full"
          style={{
            width: 100 + i * 30,
            height: 100 + i * 30,
            left: `${(i * 10) % 100}%`,
            top: `${(i * 10) % 100}%`,
            background: `conic-gradient(from ${i * 36}deg, 
              rgba(236, 72, 153, 0.6), 
              rgba(168, 85, 247, 0.6), 
              rgba(59, 130, 246, 0.6), 
              rgba(34, 197, 94, 0.6), 
              rgba(236, 72, 153, 0.6))`,
            filter: 'blur(20px)',
          }}
          animate={{
            rotate: [0, 360, 720],
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

