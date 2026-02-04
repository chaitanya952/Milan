'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-fest-darker/80 backdrop-blur-md border-b border-neon-blue/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-28 md:h-32">
          {/* Left - MILAN Logo Text */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <a href="/" className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text">
              MILAN
            </a>
          </motion.div>

          {/* Center - College Logo and Credits (Desktop) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {/* College Logo */}
            <div className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28">
              <Image
                src="/images/college-logo.png"
                alt="College Logo"
                width={600}
                height={600}
                priority
                className="object-contain bg-transparent w-full h-full"
              />
            </div>

            {/* College Credits */}
            <div className="relative w-80 lg:w-96 xl:w-[28rem] h-14 lg:h-16 xl:h-20">
              <Image
                src="/images/college-credits.png"
                alt="College Credits"
                fill
                priority
                className="object-contain bg-transparent"
              />
            </div>
          </div>

          {/* Right - Register Button */}
          <motion.a
            href="#register"
            className="hidden sm:block px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full font-bold text-sm md:text-base hover-lift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Shows College Logo and Credits */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4 border-t border-neon-blue/20 mt-2 pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* College Logo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28">
                <Image
                  src="/images/college-logo.png"
                  alt="College Logo"
                  width={600}
                  height={600}
                  priority
                  className="object-contain bg-transparent w-full h-full"
                />
              </div>

              {/* College Credits */}
              <div className="relative w-64 sm:w-72 h-14 sm:h-16">
                <Image
                  src="/images/college-credits.png"
                  alt="College Credits"
                  fill
                  priority
                  className="object-contain bg-transparent"
                />
              </div>

              {/* Mobile Register Button */}
              <motion.a
                href="#register"
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full font-bold text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}