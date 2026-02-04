'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '10K+', label: 'Participants', icon: '👥', color: 'neon-blue' },
    { value: '50+', label: 'Events', icon: '🎯', color: 'neon-pink' },
    { value: '3', label: 'Days', icon: '📅', color: 'neon-purple' },
    { value: '₹10L+', label: 'Prize Pool', icon: '💰', color: 'neon-green' },
  ];

  const highlights = [
    {
      title: 'Cultural Excellence',
      description: 'Experience diverse cultural performances from dance to drama',
      icon: '🎭',
      gradient: 'from-neon-pink to-neon-purple',
    },
    {
      title: 'Technical Innovation',
      description: 'Participate in hackathons, coding competitions, and tech talks',
      icon: '💡',
      gradient: 'from-neon-blue to-neon-green',
    },
    {
      title: 'Entertainment Galore',
      description: 'Live concerts, DJ nights, and celebrity performances',
      icon: '🎵',
      gradient: 'from-neon-orange to-neon-pink',
    },
    {
      title: 'Networking Hub',
      description: 'Connect with industry leaders and like-minded students',
      icon: '🤝',
      gradient: 'from-neon-purple to-neon-blue',
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-fest-dark to-fest-darker overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-neon-blue rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-pink rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <span className="text-neon-blue font-semibold text-sm tracking-widest uppercase glass px-4 py-2 rounded-full">
              ✨ About The Fest
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white">
            Experience Milan
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Milan is not just a fest – it's a{' '}
            <span className="text-neon-pink font-bold">cultural revolution</span> that brings together 
            the brightest minds and most talented performers from across the nation
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              className="glass rounded-2xl p-6 text-center border-2 border-white/10 hover:border-white/30 transition-all group hover-lift"
            >
              <motion.div
                className="text-5xl mb-3"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
              </motion.div>
              <div className={`text-4xl font-black mb-2 text-${stat.color} group-hover:glow-text transition-all`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 border-2 border-white/10 hover:border-white/30 transition-all h-full hover-lift">
                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${highlight.gradient} mb-6`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">{highlight.icon}</span>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:glow-text transition-all">
                  {highlight.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">{highlight.description}</p>

                {/* Decorative Line */}
                <motion.div
                  className={`mt-6 h-1 rounded-full bg-gradient-to-r ${highlight.gradient}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-semibold mb-6 text-gray-300">
            Ready to be part of something{' '}
            <span className="gradient-text font-black">EXTRAORDINARY?</span>
          </p>
          <motion.a
            href="#register"
            className="inline-block px-10 py-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full font-bold text-lg hover-lift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Milan Now →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
