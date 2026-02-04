'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Target, Users, CircleDollarSign, Trophy, Zap, Ticket, CreditCard } from 'lucide-react';
import RegistrationForm from './RegistrationForm';

export default function GlobalRegistration() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-fest-dark to-fest-darker overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-1/4 left-0 w-96 h-96 bg-neon-pink rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-blue rounded-full blur-3xl"
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

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <span className="flex items-center gap-2 text-neon-blue font-semibold text-sm tracking-widest uppercase glass px-4 py-2 rounded-full border-2 border-neon-blue/50">
              <Target size={16} />
              Join The Fest
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Ready to Join Milan?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Register now for Milan 2026 and be part of the most{' '}
            <span className="text-neon-pink font-bold">electrifying</span> fest experience. Choose
            from technical challenges, cultural events, or gaming tournaments!
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: Target, label: '9+ Events', color: 'neon-blue' },
              { icon: Users, label: '5000+ Students', color: 'neon-pink' },
              { icon: CircleDollarSign, label: '₹2L+ Prizes', color: 'neon-purple' },
              { icon: Trophy, label: 'Certificates', color: 'neon-green' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-4 border-2 border-white/10 hover:border-white/20 transition-all hover-lift"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className={`text-${stat.color}`} size={32} />
                </div>
                <div className={`text-lg font-bold text-${stat.color}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setShowForm(true)}
              className="group relative px-12 py-5 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-full font-bold text-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Register Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <p className="text-sm text-gray-500 mt-4">
              Limited seats available • Early bird discount ends soon!
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              {
                icon: Zap,
                title: 'Instant Confirmation',
                desc: 'Get your registration confirmed immediately',
                color: 'text-yellow-400'
              },
              {
                icon: Ticket,
                title: 'Digital Tickets',
                desc: 'Receive digital passes via email',
                color: 'text-neon-blue'
              },
              {
                icon: CreditCard,
                title: 'Secure Payment',
                desc: 'Multiple payment options available',
                color: 'text-neon-green'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 border-2 border-white/10 hover:border-white/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`flex justify-center mb-3 ${feature.color}`}>
                  <feature.icon size={40} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration Form Modal - NO PROPS NEEDED */}
      <AnimatePresence>
        {showForm && (
          <RegistrationForm onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </>
  );
}