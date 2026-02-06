'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function DJNight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-fest-darker">
        {/* Animated Neon Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple Wave Layers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 opacity-30"
              style={{
                background: `repeating-linear-gradient(
                  ${90 + i * 10}deg,
                  transparent,
                  transparent ${20 + i * 5}px,
                  rgba(0, 240, 255, ${0.1 + i * 0.05}) ${20 + i * 5}px,
                  rgba(0, 240, 255, ${0.1 + i * 0.05}) ${22 + i * 5}px
                )`,
              }}
              animate={{
                x: [0, -100],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                x: {
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'linear',
                },
                opacity: {
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          ))}

          {/* Radial Gradients */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Floating Music Notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            >
              {['🎵', '🎶', '🎧', '🔊'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto" ref={ref}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <span className="text-neon-pink font-bold text-sm tracking-widest uppercase glass px-4 py-2 rounded-full border-2 border-neon-pink/50 neon-border">
                  🎧 Signature Event
                </span>
              </motion.div>

              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white">
                DJ NIGHT
              </h2>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Get ready for an <span className="text-neon-blue font-bold">electrifying night</span> of non-stop music, 
                incredible beats, and unforgettable vibes. Dance till dawn with{' '}
                <span className="text-neon-pink font-bold">Band Aarohi</span> on February 21st!
              </p>

              {/* Special Feature Highlight */}
              <div className="glass rounded-xl p-4 mb-6 border-2 border-neon-pink/30 bg-neon-pink/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎤</span>
                  <h3 className="text-xl font-bold text-neon-pink">Featured Performance</h3>
                </div>
                <p className="text-lg font-bold text-white">Band Aarohi</p>
                <p className="text-sm text-gray-400">Live on February 21st Night</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Duration', value: '6+ Hours', icon: '⏰' },
                  { label: 'Attendees', value: '5000+', icon: '👥' },
                  { label: 'Sound', value: '50K Watts', icon: '🔊' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="glass rounded-xl p-4 text-center border-2 border-neon-blue/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(0, 240, 255, 0.8)' }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-neon-blue mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <motion.div
                className="space-y-3 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  'Live performance by Band Aarohi',
                  'State-of-the-art sound & lighting',
                  'Attractive Stalls & beverages',
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <span className="text-neon-pink text-xl">✦</span>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                onClick={() => setShowContactModal(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full font-bold text-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Your Spot Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>

            {/* Right - Visualizer */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Audio Visualizer Effect */}
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Center Circle */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-pink to-neon-blue neon-glow" />
                </motion.div>

                {/* Equalizer Bars */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 360) / 12;
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 origin-bottom"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-50%)`,
                        height: '150px',
                        width: '6px',
                      }}
                    >
                      <motion.div
                        className={`w-full rounded-full bg-gradient-to-t ${
                          i % 3 === 0
                            ? 'from-neon-pink to-transparent'
                            : i % 3 === 1
                            ? 'from-neon-blue to-transparent'
                            : 'from-neon-purple to-transparent'
                        }`}
                        animate={{
                          height: ['40%', '100%', '40%'],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.8 + Math.random() * 0.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.1,
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Outer Rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border-2 border-neon-blue/30"
                    style={{
                      padding: `${ring * 20}px`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: ring * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowContactModal(false)}
        >
          <motion.div
            className="relative w-full max-w-md glass rounded-3xl p-8 border-2 border-white/10"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black mb-4 text-neon-pink">Contact for DJ Night</h3>
            <p className="text-gray-300 mb-6">
              Get in touch with our coordinators to book your spot or get more information about the DJ Night featuring Band Aarohi.
            </p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="glass rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">DJ Night Coordinator</p>
                <p className="text-lg font-bold text-white">Vamshi</p>
                <a
                  href="tel:8498897746"
                  className="text-neon-pink hover:underline flex items-center gap-2 mt-2"
                >
                  📱 8498897746
                </a>
              </div>

              <div className="glass rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">DJ Night Coordinator</p>
                <p className="text-lg font-bold text-white">Sumanth</p>
                <a
                  href="tel:7893220413"
                  className="text-neon-pink hover:underline flex items-center gap-2 mt-2"
                >
                  📱 7893220413
                </a>
              </div>

              <div className="glass rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">Event Date</p>
                <p className="text-lg font-bold text-white">February 21, 2026</p>
                <p className="text-sm text-gray-400">Night Event</p>
              </div>
            </div>

            <motion.button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}