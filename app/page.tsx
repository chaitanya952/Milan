'use client';

import Hero from '@/components/Hero';
import EventOverview from '@/components/EventOverview';
import DJNight from '@/components/DJNight';
import GlobalRegistration from '@/components/GlobalRegistration';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Event Overview Section */}
      <div id="events">
        <EventOverview />
      </div>

      {/* DJ Night Section */}
      <DJNight />

      {/* Global Registration Section */}
      <div id="register">
        <GlobalRegistration />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button - Back to Top */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-neon-pink to-neon-purple rounded-full flex items-center justify-center text-2xl shadow-2xl z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>
    </main>
  );
}