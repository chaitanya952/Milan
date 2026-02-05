'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Image from 'next/image';

// Import SubEvent type from eventsData to ensure consistency
import { SubEvent, eventsData } from '@/lib/eventsData';

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
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    branch: '',
    teamName: '',
    teamMembers: '',
    teamSize: '1',
    upiTransactionId: '',
    selectedEvent: '',
    selectedSubEvent: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get active sub-event and main event for both global and specific modes
  const activeMainEvent = isGlobal 
    ? eventsData.find(e => e.name === formData.selectedEvent)
    : eventsData.find(e => e.name === eventName);
    
  const activeSubEvent = isGlobal
    ? activeMainEvent?.subEvents.find(s => s.name === formData.selectedSubEvent)
    : subEvent;

  const currentEventColor = activeMainEvent?.color || eventColor;
  const currentUpiQrCode = activeMainEvent?.upiQrCode || upiQrCode;

  const isGroupEvent = activeSubEvent?.teamSize === 'group' || activeSubEvent?.teamSize === 'solo/duo/group';
  const isSoloEvent = activeSubEvent?.teamSize === 'solo';
  const isFlexibleEvent = activeSubEvent?.teamSize === 'solo/duo/group';
  
  const currentEntryFee = isGroupEvent || isFlexibleEvent
    ? activeSubEvent?.entryFee?.group || 0
    : activeSubEvent?.entryFee?.single || 0;

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

    if (isGroupEvent && !isFlexibleEvent && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Calculate actual entry fee based on team size for flexible events
      let calculatedFee = currentEntryFee;
      if (isFlexibleEvent && formData.teamSize) {
        const teamSize = parseInt(formData.teamSize);
        calculatedFee = teamSize * currentEntryFee;
      }

      // Prepare registration data
      const registrationData = {
        eventName: eventName || formData.selectedEvent,
        subEventName: subEvent?.name || formData.selectedSubEvent,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        year: formData.year,
        branch: formData.branch,
        teamName: formData.teamName || 'N/A',
        teamMembers: formData.teamMembers || 'Solo',
        teamSize: isFlexibleEvent ? formData.teamSize : (isGroupEvent ? 'Group' : 'Solo'),
        entryFee: calculatedFee,
      };

      // Send registration request
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setRegistrationId(data.registrationId);
      
      // If no entry fee, skip payment and go to success
      if (calculatedFee === 0) {
        setStep('success');
      } else {
        setStep('payment');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.upiTransactionId.trim()) {
      setError('Please enter UPI Transaction ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId,
          upiTransactionId: formData.upiTransactionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment confirmation failed');
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
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
        className="relative w-full max-w-2xl my-8 glass rounded-3xl p-6 md:p-8 border-2 border-white/10"
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

        {/* Form Step */}
        {step === 'form' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-3xl font-black mb-2">
              <span className={`text-${currentEventColor} glow-text`}>Register Now</span>
            </h2>
            <p className="text-gray-400 mb-6">
              {subEvent ? `${subEvent.name} - ${eventName}` : 'Milan Fest 2026'}
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Selection (if global) */}
              {isGlobal && (
                <div className="space-y-4 pb-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Select Event</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Main Event *</label>
                      <select
                        value={formData.selectedEvent}
                        onChange={(e) => {
                          handleInputChange('selectedEvent', e.target.value);
                          handleInputChange('selectedSubEvent', ''); // Reset sub-event
                        }}
                        className={`w-full px-4 py-3 bg-white/5 border-2 ${
                          errors.selectedEvent ? 'border-red-500' : 'border-white/10'
                        } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white`}
                      >
                        <option value="" className="bg-fest-dark">Select Main Event</option>
                        {eventsData.map(e => (
                          <option key={e.id} value={e.name} className="bg-fest-dark">{e.name}</option>
                        ))}
                      </select>
                      {errors.selectedEvent && <p className="mt-1 text-sm text-red-400">{errors.selectedEvent}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Sub-Event *</label>
                      <select
                        value={formData.selectedSubEvent}
                        onChange={(e) => handleInputChange('selectedSubEvent', e.target.value)}
                        disabled={!formData.selectedEvent}
                        className={`w-full px-4 py-3 bg-white/5 border-2 ${
                          errors.selectedSubEvent ? 'border-red-500' : 'border-white/10'
                        } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white disabled:opacity-50`}
                      >
                        <option value="" className="bg-fest-dark">Select Sub-Event</option>
                        {activeMainEvent?.subEvents.map(s => (
                          <option key={s.id} value={s.name} className="bg-fest-dark">{s.name}</option>
                        ))}
                      </select>
                      {errors.selectedSubEvent && <p className="mt-1 text-sm text-red-400">{errors.selectedSubEvent}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Personal Details</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500`}
                      placeholder="10-digit phone number"
                      maxLength={10}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">College/Institution *</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 ${
                      errors.college ? 'border-red-500' : 'border-white/10'
                    } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="Enter your college name"
                  />
                  {errors.college && <p className="mt-1 text-sm text-red-400">{errors.college}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Year *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 ${
                        errors.year ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white`}
                    >
                      <option value="" className="bg-fest-dark">Select Year</option>
                      <option value="1st Year" className="bg-fest-dark">1st Year</option>
                      <option value="2nd Year" className="bg-fest-dark">2nd Year</option>
                      <option value="3rd Year" className="bg-fest-dark">3rd Year</option>
                      <option value="4th Year" className="bg-fest-dark">4th Year</option>
                      <option value="Postgraduate" className="bg-fest-dark">Postgraduate</option>
                    </select>
                    {errors.year && <p className="mt-1 text-sm text-red-400">{errors.year}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Branch/Department</label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500`}
                      placeholder="e.g., CSE, ECE, MBA"
                    />
                  </div>
                </div>
              </div>

              {/* Team Details (if group event) */}
              {(isGroupEvent || isFlexibleEvent) && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-lg font-bold text-white">Team Details</h3>
                  
                  {isFlexibleEvent && (
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Team Size *</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl focus:border-${currentEventColor} focus:outline-none text-white`}
                      >
                        <option value="1" className="bg-fest-dark">Solo (1 person)</option>
                        <option value="2" className="bg-fest-dark">Duo (2 people)</option>
                        {activeSubEvent && activeSubEvent.maxTeamSize && [...Array(activeSubEvent.maxTeamSize - 2)].map((_, i) => (
                          <option key={i + 3} value={i + 3} className="bg-fest-dark">
                            Group ({i + 3} people)
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-sm text-gray-400">
                        Fee: ₹{currentEntryFee} per person × {formData.teamSize} = ₹{currentEntryFee * parseInt(formData.teamSize)}
                      </p>
                    </div>
                  )}

                  {formData.teamSize !== '1' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                          Team Name {!isFlexibleEvent && '*'}
                        </label>
                        <input
                          type="text"
                          value={formData.teamName}
                          onChange={(e) => handleInputChange('teamName', e.target.value)}
                          className={`w-full px-4 py-3 bg-white/5 border-2 ${
                            errors.teamName ? 'border-red-500' : 'border-white/10'
                          } rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500`}
                          placeholder="Enter your team name"
                        />
                        {errors.teamName && <p className="mt-1 text-sm text-red-400">{errors.teamName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                          Team Members (comma-separated)
                        </label>
                        <textarea
                          value={formData.teamMembers}
                          onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                          className={`w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl focus:border-${currentEventColor} focus:outline-none text-white placeholder-gray-500 resize-none`}
                          rows={3}
                          placeholder="Member 1, Member 2, Member 3..."
                        />
                        <p className="mt-1 text-sm text-gray-400">
                          Enter names of all team members including yourself
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Entry Fee Info */}
              {currentEntryFee > 0 && (
                <div className="glass rounded-xl p-4 border-2 border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Entry Fee:</span>
                    <span className={`text-2xl font-bold text-${currentEventColor}`}>
                      ₹{isFlexibleEvent ? currentEntryFee * parseInt(formData.teamSize) : currentEntryFee}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-gradient-to-r from-${currentEventColor} to-neon-purple rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? 'Processing...' : currentEntryFee > 0 ? 'Proceed to Payment →' : 'Register Free →'}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-3xl font-black mb-2">
              <span className={`text-${eventColor} glow-text`}>Payment</span>
            </h2>
            <p className="text-gray-400 mb-6">Complete your registration by making the payment</p>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Registration ID */}
              <div className="glass rounded-xl p-4 border-2 border-white/10">
                <p className="text-sm text-gray-400 mb-1">Registration ID</p>
                <p className="text-lg font-bold text-white font-mono">{registrationId}</p>
              </div>

              {/* Payment Amount */}
              <div className="glass rounded-xl p-6 border-2 border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-2">Amount to Pay</p>
                <p className={`text-4xl font-black text-${eventColor}`}>
                  ₹{isFlexibleEvent ? currentEntryFee * parseInt(formData.teamSize) : currentEntryFee}
                </p>
              </div>

              {/* UPI QR Code */}
              <div className="glass rounded-xl p-6 border-2 border-white/10 text-center">
                <p className="text-lg font-bold mb-4">Scan to Pay via UPI</p>
                <div className="relative w-64 h-64 mx-auto bg-white rounded-xl p-4">
                  <Image
                    src={upiQrCode}
                    alt="UPI QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Scan this QR code using any UPI app
                </p>
              </div>

              {/* Transaction ID Input */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    UPI Transaction ID *
                  </label>
                  <input
                    type="text"
                    value={formData.upiTransactionId}
                    onChange={(e) => handleInputChange('upiTransactionId', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl focus:border-${eventColor} focus:outline-none text-white placeholder-gray-500`}
                    placeholder="Enter 12-digit UPI Transaction ID"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    💡 Find the transaction ID in your UPI app after payment
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex-1 py-4 glass rounded-xl font-bold border-2 border-white/20 hover:border-white/40 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-4 bg-gradient-to-r from-${eventColor} to-neon-purple rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? 'Confirming...' : 'Confirm Payment →'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="text-3xl font-black mb-4">
              <span className={`text-${eventColor} glow-text`}>Registration Successful!</span>
            </h2>
            
            <p className="text-gray-400 mb-6">
              Your registration has been confirmed. We'll send a confirmation email shortly.
            </p>

            <div className="glass rounded-xl p-6 border-2 border-white/10 mb-6">
              <p className="text-sm text-gray-400 mb-2">Your Registration ID</p>
              <p className="text-2xl font-bold text-white font-mono">{registrationId}</p>
              <p className="text-sm text-gray-400 mt-2">
                Save this ID for future reference
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-400 mb-6">
              <p>✓ Confirmation email sent to {formData.email}</p>
              <p>✓ SMS notification sent to {formData.phone}</p>
              {currentEntryFee > 0 && <p>✓ Payment verified successfully</p>}
            </div>

            <motion.button
              onClick={onClose}
              className={`w-full py-4 bg-gradient-to-r from-${eventColor} to-neon-purple rounded-xl font-bold text-lg`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}