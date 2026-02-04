// Replace the entire file with this fixed version
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SubEvent } from '@/lib/eventsData';
import RegistrationForm from './RegistrationForm';

interface SubEventDetailProps {
  subEvent: SubEvent;
  eventName: string;
  eventColor: string;
  upiQrCode: string;
  onClose: () => void;
}

interface Coordinator {
  name: string;
  phone: string;
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
  const entryFee = isGroupEvent ? subEvent.entryFee.group : subEvent.entryFee.single;

  // Get color classes based on eventColor
  const colorClasses = {
    text: eventColor === 'neon-blue' ? 'text-neon-blue' :
          eventColor === 'neon-pink' ? 'text-neon-pink' :
          eventColor === 'neon-green' ? 'text-neon-green' :
          eventColor === 'neon-purple' ? 'text-neon-purple' :
          'text-neon-cyan',
    from: eventColor === 'neon-blue' ? 'from-neon-blue' :
          eventColor === 'neon-pink' ? 'from-neon-pink' :
          eventColor === 'neon-green' ? 'from-neon-green' :
          eventColor === 'neon-purple' ? 'from-neon-purple' :
          'from-neon-cyan',
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
          className="relative w-full max-w-4xl my-8 glass rounded-3xl p-6 md:p-8 border-2 border-white/10 max-h-[85vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all z-10 border-2 border-white/10"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">
                {subEvent.category === 'Coding'
                  ? '💻'
                  : subEvent.category === 'Dance'
                  ? '💃'
                  : subEvent.category === 'E-Sports'
                  ? '🎮'
                  : '🎭'}
              </span>
              <div>
                <h2 className="text-3xl md:text-4xl font-black">
                  <span className={`${colorClasses.text} glow-text`}>{subEvent.name}</span>
                </h2>
                <p className="text-gray-400">{subEvent.category}</p>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">{subEvent.description}</p>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10">
              <div className="text-2xl mb-2">💰</div>
              <div className={`text-2xl font-bold ${colorClasses.text}`}>₹{entryFee}</div>
              <div className="text-xs text-gray-400">Entry Fee</div>
            </div>
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10">
              <div className="text-2xl mb-2">{isGroupEvent ? '👥' : '👤'}</div>
              <div className="text-xl font-bold">
                {isGroupEvent ? `${subEvent.minTeamSize}-${subEvent.maxTeamSize}` : 'Solo'}
              </div>
              <div className="text-xs text-gray-400">
                {isGroupEvent ? 'Team Size' : 'Individual'}
              </div>
            </div>
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-bold">{subEvent.date}</div>
              <div className="text-xs text-gray-400">{subEvent.time}</div>
            </div>
            <div className="glass rounded-xl p-4 text-center border-2 border-white/10">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-sm font-bold">{subEvent.venue}</div>
              <div className="text-xs text-gray-400">Venue</div>
            </div>
          </div>

          {/* Prizes */}
          <div className="glass rounded-xl p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>🏆</span> Prizes
            </h3>
            <p className={`text-lg font-semibold ${colorClasses.text}`}>
              {Array.isArray(subEvent.prizes) ? subEvent.prizes.join(' | ') : subEvent.prizes}
            </p>
          </div>

          {/* Rules */}
          <div className="glass rounded-xl p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📋</span> Rules & Guidelines
            </h3>
            <ul className="space-y-2">
              {subEvent.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className={`${colorClasses.text} mt-1`}>✦</span>
                  <span className="text-gray-300">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinators */}
          {subEvent.coordinators && subEvent.coordinators.length > 0 && (
            <div className="glass rounded-xl p-6 mb-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📞</span> Event Coordinators
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {subEvent.coordinators.map((coord: Coordinator, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorClasses.from} to-neon-purple flex items-center justify-center font-bold text-white`}
                    >
                      {coord.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{coord.name}</div>
                      <a
                        href={`tel:${coord.phone}`}
                        className={`text-sm ${colorClasses.text} hover:underline`}
                      >
                        {coord.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {subEvent.pptUrl && (
              <motion.a
                href={subEvent.pptUrl}
                download
                className="flex-1 py-4 glass rounded-xl font-semibold text-center border-2 border-white/20 hover:border-white/40 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📥 Download Event Details
              </motion.a>
            )}
            <motion.button
              onClick={() => setShowRegistration(true)}
              className={`flex-1 py-4 bg-gradient-to-r ${colorClasses.from} to-neon-purple rounded-xl font-bold text-lg`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now →
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Registration Form Modal - Only show when not already in a modal */}
      <AnimatePresence>
        {showRegistration && (
          <RegistrationForm
            subEvent={subEvent}
            eventName={eventName}
            eventColor={eventColor}
            eventCoordinator={subEvent.coordinators[0] || { name: 'Coordinator', phone: '+91 00000 00000' }}
            upiQrCode={upiQrCode}
            onClose={() => setShowRegistration(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}