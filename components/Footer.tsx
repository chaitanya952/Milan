'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: '📷', href: '#', color: 'from-pink-500 to-purple-500' },
    { name: 'Twitter', icon: '🐦', href: '#', color: 'from-blue-400 to-cyan-400' },
    { name: 'YouTube', icon: '▶️', href: '#', color: 'from-red-500 to-pink-500' },
    { name: 'LinkedIn', icon: '💼', href: '#', color: 'from-blue-600 to-blue-400' },
  ];

  const quickLinks = [
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-fest-darker pt-20 pb-8 overflow-hidden">
      {/* Fire-themed Animated Lights Band - Top */}
      <div className="fire-light absolute top-0 left-0 right-0 h-1" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 107, 53, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-orange rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-yellow rounded-full blur-3xl opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-black mb-4">
                <span className="text-transparent bg-clip-text  from-neon-orange via-neon-pink to-neon-purple">
                  Ready to experience Milan
                </span>
              </h3>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Vignan's most electrifying cultural and technical fest. Experience the perfect blend of 
                creativity, innovation, and entertainment.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-neon-blue">📍</span>
                  <span>Vignan Institute, Hyderabad, Telangana</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-neon-pink">📧</span>
                  <span>contact@milanfest.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-neon-green">📱</span>
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-pink transition-colors inline-flex items-center gap-2 group"
                  >
                    <motion.span
                      className="text-neon-pink opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Stay Connected</h4>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-xl hover-lift border-2 border-white/10 hover:border-white/30 transition-all`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Subscribe to updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-neon-pink focus:outline-none text-sm text-white placeholder-gray-500"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg font-semibold text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              © 2026 Milan Fest, Vignan Institute. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neon-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-neon-blue transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-neon-blue transition-colors">
                Code of Conduct
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fire-themed Animated Lights Band - Bottom */}
      <div className="fire-light absolute bottom-0 left-0 right-0 h-1" />

      {/* Floating Fire Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              background: ['#ff6b35', '#ffd60a', '#ff006e'][Math.floor(Math.random() * 3)],
              boxShadow: '0 0 10px currentColor',
            }}
            animate={{
              y: [-10, -100],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </footer>
  );
}
