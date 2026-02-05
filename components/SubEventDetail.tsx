'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SubEvent } from '@/lib/eventsData';
import RegistrationForm from './RegistrationForm';
import { Calendar, Clock, MapPin, Users, Trophy, DollarSign, FileText, Phone } from 'lucide-react';

interface SubEventDetailProps {
  subEvent: SubEvent;
  eventName: string;
  eventColor: string;
  upiQrCode: string;
  onClose: () => void;
}

export default function SubEventDetail({
  subEvent,
  eventName,
  eventColor,
  upiQrCode,
  onClose,
}: SubEventDetailProps) {
  const [showRegistration, setShowRegistration] = useState(false);

  const isGroupEvent = subEvent.teamSize === 'group';
  const isSoloEvent = subEvent.teamSize === 'solo';
  const isFlexibleEvent = subEvent.teamSize === 'solo/duo/group';
  const entryFee = isGroupEvent || isFlexibleEvent ? subEvent.entryFee.group : subEvent.entryFee.single;

  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Coding':
        return '💻';
      case 'Dance':
        return '💃';
      case 'E-Sports':
        return '🎮';
      case 'Sports':
        return '⚽';
      default:
        return '🎭';
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl my-8 glass rounded-3xl p-6 md:p-8 border-2 border-white/10 max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all z-10 border-2 border-white/10 sticky"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">
                {getCategoryIcon(subEvent.category)}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h2 className="text-3xl md:text-4xl font-black">
                    <span className={`text-${eventColor} glow-text`}>{subEvent.name}</span>
                  </h2>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-${eventColor}/20 text-${eventColor} border border-${eventColor}/50`}>
                    {subEvent.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{eventName}</p>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">{subEvent.description}</p>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Entry Fee Card */}
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10 hover:border-white/20 transition-all">
              <DollarSign className={`w-6 h-6 mx-auto mb-2 text-${eventColor}`} />
              <div className={`text-2xl font-bold text-${eventColor}`}>
                ₹{entryFee}
                {isFlexibleEvent && '/person'}
              </div>
              <div className="text-xs text-gray-400 mt-1">Entry Fee</div>
            </div>

            {/* Team Size Card */}
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10 hover:border-white/20 transition-all">
              <Users className={`w-6 h-6 mx-auto mb-2 text-${eventColor}`} />
              <div className="text-xl font-bold">
                {isFlexibleEvent 
                  ? 'Flexible' 
                  : isGroupEvent 
                  ? `${subEvent.minTeamSize}-${subEvent.maxTeamSize}` 
                  : 'Solo'}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {isFlexibleEvent ? 'Solo/Duo/Group' : isGroupEvent ? 'Team Size' : 'Individual'}
              </div>
            </div>

            {/* Date & Time Card */}
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10 hover:border-white/20 transition-all">
              <Calendar className={`w-6 h-6 mx-auto mb-2 text-${eventColor}`} />
              <div className="text-sm font-bold">{subEvent.date}</div>
              <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                {subEvent.time.split(' ')[0]}
              </div>
            </div>

            {/* Venue Card */}
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10 hover:border-white/20 transition-all">
              <MapPin className={`w-6 h-6 mx-auto mb-2 text-${eventColor}`} />
              <div className="text-sm font-bold">{subEvent.venue}</div>
              <div className="text-xs text-gray-400 mt-1">Venue</div>
            </div>
          </div>

          {/* Prizes Section */}
          <div className="glass rounded-xl p-6 mb-6 border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy className={`w-6 h-6 text-${eventColor}`} />
              <span>Prize Pool</span>
            </h3>
            <p className={`text-lg font-semibold text-${eventColor}`}>{subEvent.prizes}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {subEvent.prizes.split('|').filter(p => p.trim()).map((prize, index) => {
                const parts = prize.split(':');
                if (parts.length < 2) {
                  return (
                    <span
                      key={index}
                      className="px-3 py-2 glass rounded-lg text-sm font-medium border border-white/10"
                    >
                      <span className={`text-${eventColor} font-bold`}>{prize.trim()}</span>
                    </span>
                  );
                }
                const [position, amount] = parts;
                return (
                  <span
                    key={index}
                    className="px-3 py-2 glass rounded-lg text-sm font-medium border border-white/10"
                  >
                    {position.trim()}: <span className={`text-${eventColor} font-bold`}>{amount.trim()}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Rules & Guidelines */}
          <div className="glass rounded-xl p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className={`w-6 h-6 text-${eventColor}`} />
              <span>Rules & Guidelines</span>
            </h3>
            <ul className="space-y-3">
              {subEvent.rules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 group"
                >
                  <span className={`text-${eventColor} mt-1 text-lg group-hover:scale-110 transition-transform`}>
                    ✦
                  </span>
                  <span className="text-gray-300 flex-1">{rule}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Event Coordinators */}
          <div className="glass rounded-xl p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Phone className={`w-6 h-6 text-${eventColor}`} />
              <span>Event Coordinators</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {subEvent.coordinators.map((coord, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-${eventColor} to-neon-purple flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform`}
                  >
                    {coord.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{coord.name}</div>
                    <a
                      href={`tel:${coord.phone}`}
                      className={`text-sm text-${eventColor} hover:underline flex items-center gap-1`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-3 h-3" />
                      {coord.phone}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="glass rounded-xl p-4 mb-6 border-2 border-yellow-500/30 bg-yellow-500/5">
            <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Important Notes
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• All participants must carry valid college ID cards</li>
              <li>• Registration closes 2 hours before the event</li>
              <li>• Be present at the venue 30 minutes before your slot</li>
              <li>• Organizer decisions are final and binding</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {subEvent.pptUrl && (
              <motion.a
                href={subEvent.pptUrl}
                download
                className="flex-1 py-4 glass rounded-xl font-semibold text-center border-2 border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="w-5 h-5" />
                Download Event Details
              </motion.a>
            )}
            <motion.button
              onClick={() => setShowRegistration(true)}
              className={`flex-1 py-4 bg-gradient-to-r from-${eventColor} to-neon-purple rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now →
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegistration && (
          <RegistrationForm
            subEvent={subEvent}
            eventName={eventName}
            eventColor={eventColor}
            upiQrCode={upiQrCode}
            onClose={() => setShowRegistration(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}