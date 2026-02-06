'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getEventById, SubEvent } from '@/lib/eventsData';
import SubEventDetail from './SubEventDetail';
import { FileText, Trophy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getEventIcon } from '@/lib/EventIcons';

const DynamicIcon = ({ name, size = 24, className = "", strokeWidth = 2 }: { 
  name: string, 
  size?: number, 
  className?: string,
  strokeWidth?: number 
}) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <Trophy size={size} className={className} strokeWidth={strokeWidth} />;
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};

interface EventDetailPageProps {
  eventId: string;
  onClose: () => void;
}

export default function EventDetailPage({ eventId, onClose }: EventDetailPageProps) {
  const event = getEventById(eventId);
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent | null>(null);

  if (!event) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="fixed top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all z-10 border-2 border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          <div className="max-w-7xl mx-auto">
            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-block text-8xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {event.icon}
              </motion.div>

              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-4">
                <span className={`glow-text-3d text-${event.color}`}>
                  {event.title}
                </span>
              </h1>

              <p className={`text-2xl font-semibold text-${event.color} mb-4`}>
                {event.tagline}
              </p>

              <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
                <div className="glass px-6 py-3 rounded-full border-2 border-white/20">
                  <span className="text-blue-400 font-bold">📅 {event.eventDate}</span>
                </div>
                <div className="glass px-6 py-3 rounded-full border-2 border-white/20">
                  <span className={`text-${event.color} font-bold`}>
                    {event.subEvents.length} Events
                  </span>
                </div>
              </div>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                {event.summary}
              </p>

              {event.pptUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <motion.a
                    href={event.pptUrl}
                    download
                    className="inline-flex items-center gap-2 px-8 py-4 glass rounded-xl font-bold text-lg border-2 border-white/20 hover:border-white/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className={`w-6 h-6 text-${event.color}`} />
                    <span>Download {event.name} Brochure</span>
                  </motion.a>
                </motion.div>
              )}
            </motion.div>

            {/* All Events Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`h-1 flex-1 bg-gradient-to-r ${event.gradient} rounded-full`} />
                <h2 className="text-3xl font-black">
                  <span className={`text-${event.color}`}>All Events</span>
                </h2>
                <div className={`h-1 flex-1 bg-gradient-to-l ${event.gradient} rounded-full`} />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.subEvents.map((subEvent, index) => (
                  <EventCard
                    key={subEvent.id}
                    subEvent={subEvent}
                    eventColor={event.color}
                    eventGradient={event.gradient}
                    index={index}
                    onClick={() => setSelectedSubEvent(subEvent)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <motion.button
                onClick={onClose}
                className="px-8 py-4 glass rounded-full font-bold text-lg border-2 border-white/20 hover:border-white/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to All Events
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Sub-Event Detail Modal */}
      <AnimatePresence>
        {selectedSubEvent && (
          <SubEventDetail
            subEvent={selectedSubEvent}
            eventName={event.name}
            eventColor={event.color}
            upiQrCode={event.upiQrCode}
            onClose={() => setSelectedSubEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function EventCard({
  subEvent,
  eventColor,
  eventGradient,
  index,
  onClick,
}: {
  subEvent: SubEvent;
  eventColor: string;
  eventGradient: string;
  index: number;
  onClick: () => void;
}) {
  const isGroupEvent = subEvent.teamSize === 'group';
  const isFlexibleEvent = subEvent.teamSize === 'solo/duo/group';
  const showBothFees = isFlexibleEvent && subEvent.entryFee.single > 0 && subEvent.entryFee.group > 0;
  const entryFee = isGroupEvent ? subEvent.entryFee.group : subEvent.entryFee.single;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-white/30 transition-all h-full relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${eventGradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

        {/* Event Name with Icon */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">
            {isGroupEvent ? '👥' : isFlexibleEvent ? '👤👥' : '👤'}
          </span>
          <h3 className="text-2xl font-bold group-hover:glow-text transition-all relative z-10">
            {subEvent.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 relative z-10">
          {subEvent.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4 relative z-10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Entry Fee</span>
            <span className={`text-lg font-bold text-${eventColor}`}>
              {showBothFees ? (
                <span className="text-sm">₹{subEvent.entryFee.single} / ₹{subEvent.entryFee.group}</span>
              ) : isFlexibleEvent ? (
                <>₹{subEvent.entryFee.single > 0 ? subEvent.entryFee.single : subEvent.entryFee.group}<span className="text-xs ml-0.5">/head</span></>
              ) : (
                <>₹{entryFee}</>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Team Size</span>
            <span className="font-semibold">
              {isFlexibleEvent 
                ? 'Solo/Duo/Group' 
                : isGroupEvent 
                ? `${subEvent.minTeamSize}-${subEvent.maxTeamSize}` 
                : 'Solo'}
            </span>
          </div>
        </div>

        {/* Time & Venue */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 relative z-10">
          <div className="flex items-center gap-1">
            <span>⏰</span>
            <span>{subEvent.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span className="truncate">{subEvent.venue}</span>
          </div>
        </div>

        {/* Register Button */}
        <motion.div
          className={`w-full py-3 text-center rounded-xl bg-gradient-to-r ${eventGradient} font-bold text-sm relative z-10`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now →
        </motion.div>
      </div>
    </motion.div>
  );
}