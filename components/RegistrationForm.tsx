'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubEvent } from '@/lib/eventsData';

interface RegistrationFormProps {
  subEvent: SubEvent;
  eventName: string;
  eventColor: string;
  eventCoordinator: { name: string; phone: string };
  upiQrCode: string;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  teamName?: string;
  teamMembers?: string;
  upiTransactionId?: string;
};

type RegistrationStep = 'form' | 'payment' | 'success';

export default function RegistrationForm({
  subEvent,
  eventName,
  eventColor,
  eventCoordinator,
  upiQrCode,
  onClose,
}: RegistrationFormProps) {
  const [step, setStep] = useState<RegistrationStep>('form');
  const [registrationId, setRegistrationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamMemberCount, setTeamMemberCount] = useState(subEvent.minTeamSize || 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const isGroupEvent = subEvent.teamSize === 'group';
  const entryFee = isGroupEvent ? subEvent.entryFee.group || 0 : subEvent.entryFee.single || 0;

  // Get color classes based on eventColor
  const colorClasses = {
    text: eventColor === 'neon-blue' ? 'text-neon-blue' :
          eventColor === 'neon-pink' ? 'text-neon-pink' :
          eventColor === 'neon-green' ? 'text-neon-green' :
          eventColor === 'neon-purple' ? 'text-neon-purple' :
          'text-neon-cyan',
    border: eventColor === 'neon-blue' ? 'border-neon-blue' :
            eventColor === 'neon-pink' ? 'border-neon-pink' :
            eventColor === 'neon-green' ? 'border-neon-green' :
            eventColor === 'neon-purple' ? 'border-neon-purple' :
            'border-neon-cyan',
    from: eventColor === 'neon-blue' ? 'from-neon-blue' :
          eventColor === 'neon-pink' ? 'from-neon-pink' :
          eventColor === 'neon-green' ? 'from-neon-green' :
          eventColor === 'neon-purple' ? 'from-neon-purple' :
          'from-neon-cyan',
  };

  const onSubmitForm = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          eventName,
          subEventName: subEvent.name,
          teamSize: isGroupEvent ? `${teamMemberCount} members` : 'Individual',
          entryFee,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setRegistrationId(result.registrationId);
        setStep('payment');
      } else {
        alert('Registration failed: ' + result.error);
      }
    } catch (error) {
      alert('Registration error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onConfirmPayment = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId,
          upiTransactionId: data.upiTransactionId,
          paymentScreenshot: 'Uploaded via form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStep('success');
      } else {
        alert('Payment confirmation failed: ' + result.error);
      }
    } catch (error) {
      alert('Payment confirmation error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setStep('form');
    setRegistrationId('');
    setTeamMemberCount(subEvent.minTeamSize || 1);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="relative w-full max-w-md glass rounded-2xl p-5 border-2 border-white/20 overflow-hidden"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all text-base z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <h2 className="text-xl font-black mb-1">
            <span className={`${colorClasses.text} glow-text`}>{subEvent.name}</span>
          </h2>
          <p className="text-xs text-gray-400">{eventName} - Registration</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Registration Form */}
          {step === 'form' && (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit(onSubmitForm)}
              className="space-y-4"
            >
              {/* Event Details */}
              <div className="glass rounded-xl p-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Entry Fee</div>
                    <div className={`text-lg font-bold ${colorClasses.text}`}>₹{entryFee}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Team Size</div>
                    <div className="text-sm font-semibold">
                      {isGroupEvent
                        ? `${subEvent.minTeamSize}-${subEvent.maxTeamSize} members`
                        : 'Individual'}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Event Coordinator</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{eventCoordinator.name}</span>
                    <a href={`tel:${eventCoordinator.phone}`} className={`text-sm ${colorClasses.text} hover:underline`}>
                      {eventCoordinator.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Full Name <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-neon-pink text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    College <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    {...register('college', { required: 'College is required' })}
                    className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                    placeholder="Your college name"
                  />
                  {errors.college && (
                    <p className="text-neon-pink text-xs mt-1">{errors.college.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Email <span className="text-neon-pink">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email',
                        },
                      })}
                      type="email"
                      className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-neon-pink text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Phone <span className="text-neon-pink">*</span>
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Enter valid 10-digit number',
                        },
                      })}
                      type="tel"
                      className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                      placeholder="1234567890"
                    />
                    {errors.phone && (
                      <p className="text-neon-pink text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Year <span className="text-neon-pink">*</span>
                  </label>
                  <select
                    {...register('year', { required: 'Year is required' })}
                    className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                  >
                    <option value="" className="bg-gray-900">Select Year</option>
                    <option value="1" className="bg-gray-900">1st Year</option>
                    <option value="2" className="bg-gray-900">2nd Year</option>
                    <option value="3" className="bg-gray-900">3rd Year</option>
                    <option value="4" className="bg-gray-900">4th Year</option>
                  </select>
                  {errors.year && (
                    <p className="text-neon-pink text-xs mt-1">{errors.year.message}</p>
                  )}
                </div>

                {/* Team Details (if group event) */}
                {isGroupEvent && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">
                        Team Name <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        {...register('teamName', {
                          required: isGroupEvent ? 'Team name is required' : false,
                        })}
                        className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                        placeholder="Enter team name"
                      />
                      {errors.teamName && (
                        <p className="text-neon-pink text-xs mt-1">{errors.teamName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">
                        Number of Team Members
                      </label>
                      <input
                        type="number"
                        min={subEvent.minTeamSize}
                        max={subEvent.maxTeamSize}
                        value={teamMemberCount}
                        onChange={(e) => setTeamMemberCount(parseInt(e.target.value) || subEvent.minTeamSize || 1)}
                        className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">
                        Team Members (comma separated)
                      </label>
                      <textarea
                        {...register('teamMembers')}
                        className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                        placeholder="Member 1, Member 2, Member 3..."
                        rows={2}
                      />
                    </div>
                  </>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r ${colorClasses.from} to-neon-purple rounded-lg font-bold text-sm mt-4 disabled:opacity-50`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Processing...' : 'Proceed to Payment →'}
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
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">Complete Payment</h3>
                <p className="text-xs text-gray-400">Registration ID: {registrationId}</p>
              </div>

              <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                <img
                  src={upiQrCode}
                  alt="UPI QR Code"
                  className="w-40 h-40 mx-auto"
                />
              </div>

              <div className="glass rounded-xl p-3 mb-4">
                <div className={`text-2xl font-black ${colorClasses.text} mb-1`}>₹{entryFee}</div>
                <p className="text-xs text-gray-400">Scan QR code to pay via UPI</p>
              </div>

              <form onSubmit={handleSubmit(onConfirmPayment)} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-left">
                    UPI Transaction ID <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    {...register('upiTransactionId', {
                      required: 'Transaction ID is required',
                    })}
                    className={`w-full px-3 py-2 bg-white/5 border-2 border-white/10 rounded-lg focus:border-${colorClasses.border.split('-')[1]}-${colorClasses.border.split('-')[2]} focus:outline-none text-white text-sm`}
                    placeholder="Enter transaction ID"
                  />
                  {errors.upiTransactionId && (
                    <p className="text-neon-pink text-xs mt-1 text-left">
                      {errors.upiTransactionId.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex-1 py-2.5 glass rounded-lg font-semibold text-sm"
                  >
                    ← Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-2.5 bg-gradient-to-r ${colorClasses.from} to-neon-purple rounded-lg font-bold text-sm disabled:opacity-50`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
              className="text-center py-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>
              <h3 className="text-xl font-bold text-neon-green mb-3">
                Registration Successful!
              </h3>
              <p className="text-sm text-gray-400 mb-2">Registration ID: {registrationId}</p>
              <p className="text-sm text-gray-400 mb-6">
                Check your email for confirmation details
              </p>
              <motion.button
                onClick={handleClose}
                className="px-6 py-2.5 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg font-bold text-sm"
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