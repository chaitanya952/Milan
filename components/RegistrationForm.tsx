'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { SubEvent } from '@/lib/eventsData';

interface RegistrationFormProps {
  subEvent?: SubEvent;
  eventName?: string;
  eventColor?: string;
  upiQrCode?: string;
  onClose: () => void;
  isGlobal?: boolean;
}

type RegistrationStep = 'form' | 'payment' | 'success';

export default function RegistrationForm({
  subEvent,
  eventName,
  eventColor = 'neon-blue',
  upiQrCode = '/images/upi-qr.png',
  onClose,
  isGlobal = false,
}: RegistrationFormProps) {
  const [step, setStep] = useState<RegistrationStep>('form');
  const [registrationId, setRegistrationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    teamName: '',
    teamMembers: '',
    upiTransactionId: '',
    selectedEvent: '',
    selectedSubEvent: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isGroupEvent = subEvent?.teamSize === 'group';
  const entryFee = isGroupEvent
    ? subEvent?.entryFee?.group || 0
    : subEvent?.entryFee?.single || 0;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.college.trim()) newErrors.college = 'College is required';
    if (!formData.year) newErrors.year = 'Year is required';

    if (isGlobal) {
      if (!formData.selectedEvent) newErrors.selectedEvent = 'Please select an event';
      if (!formData.selectedSubEvent) newErrors.selectedSubEvent = 'Please select a sub-event';
    }

    if (isGroupEvent && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const id = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setRegistrationId(id);
      setStep(entryFee > 0 ? 'payment' : 'success');
      setLoading(false);
    }, 1500);
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.upiTransactionId.trim()) {
      setErrors({ upiTransactionId: 'Transaction ID is required' });
      return;
    }

    setLoading(true);

    // Simulate payment verification
    setTimeout(() => {
      setStep('success');
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl my-8 glass rounded-3xl p-6 md:p-8 border-2 border-white/10"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all border-2 border-white/10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-black mb-2">
            <span className={`text-${eventColor} glow-text`}>
              {isGlobal ? 'Register for Milan' : subEvent?.name}
            </span>
          </h2>
          <p className="text-gray-400">
            {isGlobal ? 'Join the ultimate fest experience' : `${eventName} - Registration`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Registration Form */}
          {step === 'form' && (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Event Details (if not global) */}
              {!isGlobal && subEvent && (
                <div className="glass rounded-xl p-4 mb-6 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Entry Fee</span>
                    <span className={`text-2xl font-bold text-${eventColor}`}>₹{entryFee}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Team Size</span>
                    <span className="text-sm font-semibold">
                      {isGroupEvent
                        ? `${subEvent.minTeamSize}-${subEvent.maxTeamSize} members`
                        : 'Individual'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Date & Time</span>
                    <span className="text-sm">{subEvent.date} • {subEvent.time.split(' ')[0]}</span>
                  </div>
                </div>
              )}

              {/* Global Event Selection */}
              {isGlobal && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Select Event <span className="text-neon-pink">*</span>
                    </label>
                    <select
                      value={formData.selectedEvent}
                      onChange={(e) => handleInputChange('selectedEvent', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 ${
                        errors.selectedEvent ? 'border-neon-pink' : 'border-white/10'
                      } rounded-xl focus:border-${eventColor} focus:outline-none text-white`}
                    >
                      <option value="" className="bg-fest-dark">Choose an event</option>
                      <option value="ignitron" className="bg-fest-dark">🔥 Ignitron - Technical Excellence</option>
                      <option value="kritansh" className="bg-fest-dark">🎭 Kritansh - Cultural Brilliance</option>
                      <option value="chrysalis" className="bg-fest-dark">🎮 Chrysalis - Gaming Mastery</option>
                    </select>
                    {errors.selectedEvent && (
                      <p className="text-neon-pink text-sm mt-1">{errors.selectedEvent}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Select Sub-Event <span className="text-neon-pink">*</span>
                    </label>
                    <select
                      value={formData.selectedSubEvent}
                      onChange={(e) => handleInputChange('selectedSubEvent', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 ${
                        errors.selectedSubEvent ? 'border-neon-pink' : 'border-white/10'
                      } rounded-xl focus:border-${eventColor} focus:outline-none text-white`}
                      disabled={!formData.selectedEvent}
                    >
                      <option value="" className="bg-fest-dark">
                        {formData.selectedEvent ? 'Choose a sub-event' : 'Select an event first'}
                      </option>
                      {formData.selectedEvent === 'ignitron' && (
                        <>
                          <option value="hackathon" className="bg-fest-dark">Code Sprint - Hackathon</option>
                          <option value="webdev" className="bg-fest-dark">WebWars - Web Development</option>
                          <option value="debugging" className="bg-fest-dark">Debug Hunt</option>
                        </>
                      )}
                      {formData.selectedEvent === 'kritansh' && (
                        <>
                          <option value="dance" className="bg-fest-dark">Dance Battle</option>
                          <option value="drama" className="bg-fest-dark">Drama Competition</option>
                          <option value="music" className="bg-fest-dark">Battle of Bands</option>
                        </>
                      )}
                      {formData.selectedEvent === 'chrysalis' && (
                        <>
                          <option value="bgmi" className="bg-fest-dark">BGMI Tournament</option>
                          <option value="valorant" className="bg-fest-dark">Valorant Championship</option>
                          <option value="fifa" className="bg-fest-dark">FIFA Cup</option>
                        </>
                      )}
                    </select>
                    {errors.selectedSubEvent && (
                      <p className="text-neon-pink text-sm mt-1">{errors.selectedSubEvent}</p>
                    )}
                  </div>
                </>
              )}

              {/* Personal Details */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name <span className="text-neon-pink">*</span>
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border-2 ${
                    errors.name ? 'border-neon-pink' : 'border-white/10'
                  } rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-neon-pink text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.email ? 'border-neon-pink' : 'border-white/10'
                    } rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-neon-pink text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.phone ? 'border-neon-pink' : 'border-white/10'
                    } rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="10-digit number"
                  />
                  {errors.phone && <p className="text-neon-pink text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    College <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.college ? 'border-neon-pink' : 'border-white/10'
                    } rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="Your college name"
                  />
                  {errors.college && (
                    <p className="text-neon-pink text-sm mt-1">{errors.college}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Year <span className="text-neon-pink">*</span>
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.year ? 'border-neon-pink' : 'border-white/10'
                    } rounded-xl focus:border-${eventColor} focus:outline-none text-white`}
                  >
                    <option value="" className="bg-fest-dark">Select Year</option>
                    <option value="1" className="bg-fest-dark">1st Year</option>
                    <option value="2" className="bg-fest-dark">2nd Year</option>
                    <option value="3" className="bg-fest-dark">3rd Year</option>
                    <option value="4" className="bg-fest-dark">4th Year</option>
                  </select>
                  {errors.year && <p className="text-neon-pink text-sm mt-1">{errors.year}</p>}
                </div>
              </div>

              {/* Team Details (if group event) */}
              {isGroupEvent && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Team Name <span className="text-neon-pink">*</span>
                    </label>
                    <input
                      value={formData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 ${
                        errors.teamName ? 'border-neon-pink' : 'border-white/10'
                      } rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                      placeholder="Enter team name"
                    />
                    {errors.teamName && (
                      <p className="text-neon-pink text-sm mt-1">{errors.teamName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Team Members (comma separated)
                    </label>
                    <textarea
                      value={formData.teamMembers}
                      onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500"
                      placeholder="Member 1, Member 2, Member 3..."
                      rows={3}
                    />
                  </div>
                </>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-gradient-to-r from-${eventColor} to-neon-purple rounded-xl font-bold text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span> Processing...
                  </span>
                ) : entryFee > 0 ? (
                  'Proceed to Payment →'
                ) : (
                  'Complete Registration →'
                )}
              </motion.button>
            </motion.form>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-center"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Complete Payment</h3>
                <p className="text-gray-400">Registration ID: <span className="text-neon-blue font-mono">{registrationId}</span></p>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-white rounded-2xl p-6 mb-6 inline-block">
                <div className="w-64 h-64 bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📱</div>
                    <div className="text-fest-dark font-bold">UPI QR Code</div>
                    <div className="text-fest-dark text-sm">Scan to pay</div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-4 mb-6 border border-white/10">
                <div className={`text-3xl font-black text-${eventColor} mb-2`}>₹{entryFee}</div>
                <p className="text-sm text-gray-400">Scan QR code to pay via UPI</p>
                <p className="text-xs text-gray-500 mt-2">UPI ID: milan@paytm</p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    UPI Transaction ID <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    value={formData.upiTransactionId}
                    onChange={(e) => handleInputChange('upiTransactionId', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.upiTransactionId ? 'border-neon-pink' : 'border-white/10'
                    } rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="Enter 12-digit transaction ID"
                  />
                  {errors.upiTransactionId && (
                    <p className="text-neon-pink text-sm mt-1">{errors.upiTransactionId}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex-1 py-3 glass rounded-xl font-semibold border-2 border-white/10 hover:border-white/20 transition-all"
                  >
                    ← Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 bg-gradient-to-r from-${eventColor} to-neon-purple rounded-xl font-bold disabled:opacity-50`}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? 'Confirming...' : 'Confirm Payment'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="text-8xl mb-6"
              >
                ✅
              </motion.div>
              <h3 className="text-3xl font-bold text-neon-green mb-4">
                Registration Successful!
              </h3>
              <div className="glass rounded-xl p-4 mb-4 inline-block border border-neon-green/30">
                <p className="text-sm text-gray-400 mb-1">Registration ID</p>
                <p className="text-xl font-mono font-bold text-neon-green">{registrationId}</p>
              </div>
              <p className="text-gray-400 mb-2">
                A confirmation email has been sent to <span className="text-white font-semibold">{formData.email}</span>
              </p>
              <p className="text-gray-400 mb-8">
                Please save your registration ID for future reference
              </p>
              <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}