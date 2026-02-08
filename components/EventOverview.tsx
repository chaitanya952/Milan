'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { eventsData } from '@/lib/eventsData';
import EventDetailPage from './EventDetailPage';
import { AnimatePresence } from 'framer-motion';
import { Rocket, Sparkles, Trophy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const DynamicIcon = ({ name, size = 72, className = "", strokeWidth = 2 }: { 
  name: string, 
  size?: number, 
  className?: string,
  strokeWidth?: number 
}) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <Trophy size={size} className={className} strokeWidth={strokeWidth} />;
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};

export default function EventOverview() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <>
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-fest-darker to-fest-dark">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring' }}
            >
              <span className="text-blue-400 font-semibold text-sm tracking-widest uppercase glass px-4 py-2 rounded-full border-2 border-blue-400/50">
                🎯 Main Events
              </span>
            </motion.div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white">
              Three Epic Journeys
            </h2>

            <div className="text-xl text-gray-400 max-w-3xl mx-auto">
              <p>Choose your path</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base">
                <span className="glass px-4 py-2 rounded-full border border-neon-orange/40 text-neon-orange font-semibold flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Entrepreneurship
                </span>
                <span className="glass px-4 py-2 rounded-full border border-neon-pink/40 text-neon-pink font-semibold flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Sports Excellence
                </span>
                <span className="glass px-4 py-2 rounded-full border border-neon-blue/40 text-neon-blue font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Cultural Brilliance
                </span>
              </div>
            </div>
          </motion.div>

          {/* Event Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {eventsData.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className={`glass rounded-3xl p-8 border-2 border-white/10 hover:border-${event.color}/70 transition-all h-full hover-lift relative overflow-hidden`}>
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  {/* Icon */}
                  <motion.div
                    className="mb-6 inline-block relative z-10"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <DynamicIcon
                      name={event.icon}
                      className={`text-${event.color}`}
                    />
                  </motion.div>

                  {/* Event Name */}
                  <h3 className="text-4xl font-black mb-3 group-hover:glow-text transition-all relative z-10">
                    <span className={`text-${event.color}`}>{event.title}</span>
                  </h3>

                  {/* Tagline */}
                  <p className={`text-sm font-semibold text-${event.color} mb-4 relative z-10`}>
                    {event.tagline}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <span className="text-blue-400">📅</span>
                    <span className="text-sm font-semibold text-gray-300">{event.eventDate}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-400 mb-6 leading-relaxed relative z-10 text-sm">
                    {event.summary}
                  </p>

                  {/* Sub-events Count */}
                  <div className="glass rounded-xl p-3 mb-6 border-2 border-white/10 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Sub Events</span>
                      <span className={`text-2xl font-bold text-${event.color}`}>
                        {event.subEvents.length}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <motion.div
                    className={`w-full py-3 text-center rounded-xl bg-gradient-to-r ${event.gradient} font-bold relative z-10 shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Detail Page Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailPage
            eventId={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
