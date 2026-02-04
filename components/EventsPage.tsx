'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { eventsData, MainEvent, SubEvent } from '@/lib/eventsData';
import { AnimatePresence } from 'framer-motion';
import SubEventDetail from './SubEventDetail';

function EventCard({
  subEvent,
  eventName,
  eventColor,
  upiQrCode,
  index,
}: {
  subEvent: SubEvent;
  eventName: string;
  eventColor: string;
  upiQrCode: string;
  index: number;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const isGroupEvent = subEvent.teamSize === 'group';
  const entryFee = isGroupEvent ? subEvent.entryFee.group : subEvent.entryFee.single;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <div className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-white/30 transition-all hover-lift h-full">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full bg-${eventColor}/20 text-${eventColor} border border-${eventColor}/50`}>
              {subEvent.category}
            </span>
            <span className="text-2xl">
              {isGroupEvent ? '👥' : '👤'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 group-hover:glow-text transition-all">
            {subEvent.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
            {subEvent.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Entry Fee</div>
              <div className={`text-lg font-bold text-${eventColor}`}>₹{entryFee}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Team Size</div>
              <div className="text-sm font-semibold">
                {isGroupEvent ? `${subEvent.minTeamSize}-${subEvent.maxTeamSize}` : 'Solo'}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{subEvent.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⏰</span>
              <span>{subEvent.time.split(' ')[0]}</span>
            </div>
          </div>

          {/* View Details Button */}
          <motion.div
            className={`w-full py-2 text-center rounded-lg bg-gradient-to-r from-${eventColor}/20 to-neon-purple/20 border border-${eventColor}/50 font-semibold text-sm`}
            whileHover={{ scale: 1.02 }}
          >
            View Details →
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetail && (
          <SubEventDetail
            subEvent={subEvent}
            eventName={eventName}
            eventColor={eventColor}
            upiQrCode={upiQrCode}
            onClose={() => setShowDetail(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function EventSection({ event }: { event: MainEvent }) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <span className="text-5xl">{event.icon}</span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black">
              <span className={`gradient-text bg-gradient-to-r ${event.gradient} glow-text`}>
                {event.title}
              </span>
            </h2>
          </motion.div>
          <p className="text-xl text-gray-400 mb-4">{event.tagline}</p>
          <p className="text-gray-500">{event.description}</p>

          {/* Google Form Link for Ignitron */}
          {event.googleFormUrl && (
            <motion.a
              href={event.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block mt-6 px-8 py-3 bg-gradient-to-r ${event.gradient} rounded-full font-bold`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📝 Register via Google Form
            </motion.a>
          )}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.subEvents.map((subEvent, index) => (
            <EventCard
              key={subEvent.id}
              subEvent={subEvent}
              eventName={event.name}
              eventColor={event.color}
              upiQrCode={event.upiQrCode}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fest-darker via-fest-dark to-fest-darker">
      {eventsData.map((event) => (
        <EventSection key={event.id} event={event} />
      ))}
    </div>
  );
}
