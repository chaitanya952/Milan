// RegistrationForm.tsx
'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

// ===========================
// TYPE DEFINITIONS
// ===========================

export interface Coordinator {
  name: string;
  phone: string;
}

export interface SubEvent {
  id: string;
  name: string;
  category?: string;
  description?: string;
  entryFee: {
    single?: number;
    group?: number;
  };
  teamSize: 'single' | 'group';
  minTeamSize?: number;
  maxTeamSize?: number;
  coordinators: Coordinator[];
  date?: string;
  time?: string;
  venue?: string;
  prizes?: string | string[];
  rules?: string[];
  pptUrl?: string;
}

// ===========================
// PROPS INTERFACE - ALL OPTIONAL
// ===========================

interface RegistrationFormProps {
  isOpen?: boolean;
  onClose: () => void;
  subEvent?: SubEvent;
  eventName?: string;
  eventColor?: string;
  eventCoordinator?: Coordinator;
  upiQrCode?: string;
}

// ===========================
// DEFAULT VALUES
// ===========================

const DEFAULT_COORDINATOR: Coordinator = {
  name: 'Event Coordinator',
  phone: '+91 00000 00000'
};

const DEFAULT_EVENT = {
  id: 'general',
  name: 'General Registration',
  entryFee: { single: 0 },
  teamSize: 'single' as const,
  coordinator: DEFAULT_COORDINATOR
};

// ===========================
// HELPER FUNCTIONS
// ===========================

/**
 * Safely derives event data from various possible props
 * Returns a normalized event object with guaranteed values
 */
function deriveEventData(props: RegistrationFormProps) {
  const { subEvent, eventName, eventCoordinator } = props;

  if (subEvent) {
    return {
      id: subEvent.id,
      name: subEvent.name,
      entryFee: subEvent.entryFee,
      teamSize: subEvent.teamSize,
      minTeamSize: subEvent.minTeamSize,
      maxTeamSize: subEvent.maxTeamSize,
      coordinator: eventCoordinator || subEvent.coordinators?.[0] || DEFAULT_COORDINATOR
    };
  }

  return {
    ...DEFAULT_EVENT,
    name: eventName || DEFAULT_EVENT.name,
    coordinator: eventCoordinator || DEFAULT_COORDINATOR
  };
}

/**
 * Calculate entry fee based on team size
 */
function calculateEntryFee(event: ReturnType<typeof deriveEventData>): number {
  if (event.teamSize === 'single') {
    return event.entryFee.single ?? 0;
  }
  return event.entryFee.group ?? event.entryFee.single ?? 0;
}

// ===========================
// MAIN COMPONENT
// ===========================

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const { isOpen = true, onClose } = props;

  // Derive event data with safe defaults
  const event = deriveEventData(props);
  const entryFee = calculateEntryFee(event);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    teamName: '',
    teamSize: event.minTeamSize || 1,
    teamMembers: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===========================
  // EVENT HANDLERS
  // ===========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Integration with Google Sheets
      console.log('Registration data:', {
        ...formData,
        eventId: event.id,
        eventName: event.name,
        entryFee: entryFee,
        timestamp: new Date().toISOString()
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Registration successful! (Google Sheets integration pending)');
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-sm">
      <div className="relative w-full max-w-[700px] bg-gradient-to-br from-[#0a0e27] to-[#050816] rounded-2xl border border-[#00f0ff]/20 shadow-2xl shadow-[#00f0ff]/10">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#00f0ff]/20 flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#ff006e] to-[#00f0ff] bg-clip-text text-transparent">
              {event.name} - Registration
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
              Fill in your details to register
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#00f0ff]/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close registration form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[65vh] overflow-y-auto px-4 md:px-6 py-4">
          {/* Event Details - Compact */}
          <div className="mb-4 p-3 md:p-4 rounded-xl bg-[#050816]/50 border border-[#00f0ff]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              {/* Entry Fee */}
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#ff006e]/20 flex items-center justify-center mr-2">
                  <span className="text-xs">💰</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Entry Fee</p>
                  <p className="text-sm font-bold text-white">₹{entryFee}</p>
                </div>
              </div>

              {/* Team Size */}
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mr-2">
                  <span className="text-xs">👥</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Team Size</p>
                  <p className="text-sm font-medium text-[#00f0ff]">
                    {event.teamSize === 'single'
                      ? 'Individual'
                      : `${event.minTeamSize || 2}-${event.maxTeamSize || 5} members`}
                  </p>
                </div>
              </div>

              {/* Coordinator Contact */}
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mr-2">
                  <span className="text-xs">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Coordinator</p>
                  <a
                    href={`tel:${event.coordinator.phone}`}
                    className="text-sm font-medium text-[#00f0ff] hover:underline"
                  >
                    {event.coordinator.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Coordinator Name */}
            {event.coordinator.name && (
              <div className="text-xs text-gray-300 mt-2">
                Coordinator: <span className="font-medium">{event.coordinator.name}</span>
              </div>
            )}
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {/* Full Name */}
            <div className="form-group">
              <label
                htmlFor="fullName"
                className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
              >
                Full Name <span className="text-[#ff006e]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                         text-white text-sm placeholder-gray-500 focus:outline-none 
                         focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
              >
                Email <span className="text-[#ff006e]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                         text-white text-sm placeholder-gray-500 focus:outline-none 
                         focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Phone */}
              <div className="form-group">
                <label
                  htmlFor="phone"
                  className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                >
                  Phone <span className="text-[#ff006e]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm placeholder-gray-500 focus:outline-none 
                           focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                  placeholder="9876543210"
                />
              </div>

              {/* College */}
              <div className="form-group">
                <label
                  htmlFor="college"
                  className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                >
                  College <span className="text-[#ff006e]">*</span>
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm placeholder-gray-500 focus:outline-none 
                           focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                  placeholder="Your college name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Year */}
              <div className="form-group">
                <label
                  htmlFor="year"
                  className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                >
                  Year <span className="text-[#ff006e]">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm focus:outline-none focus:border-[#00f0ff] 
                           focus:ring-1 focus:ring-[#00f0ff]/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#0a0e27]">
                    Select Year
                  </option>
                  <option value="1st" className="bg-[#0a0e27]">
                    1st Year
                  </option>
                  <option value="2nd" className="bg-[#0a0e27]">
                    2nd Year
                  </option>
                  <option value="3rd" className="bg-[#0a0e27]">
                    3rd Year
                  </option>
                  <option value="4th" className="bg-[#0a0e27]">
                    4th Year
                  </option>
                </select>
              </div>

              {/* Team Size (if group event) */}
              {event.teamSize === 'group' && (
                <div className="form-group">
                  <label
                    htmlFor="teamSize"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Team Size <span className="text-[#ff006e]">*</span>
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                             text-white text-sm focus:outline-none focus:border-[#00f0ff] 
                             focus:ring-1 focus:ring-[#00f0ff]/50 transition-all appearance-none"
                  >
                    {Array.from(
                      { length: (event.maxTeamSize || 5) - (event.minTeamSize || 2) + 1 },
                      (_, i) => (event.minTeamSize || 2) + i
                    ).map((num) => (
                      <option key={num} value={num} className="bg-[#0a0e27]">
                        {num} {num === 1 ? 'member' : 'members'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Team Name (if group event) */}
            {event.teamSize === 'group' && (
              <div className="form-group">
                <label
                  htmlFor="teamName"
                  className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                >
                  Team Name <span className="text-[#ff006e]">*</span>
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm placeholder-gray-500 focus:outline-none 
                           focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                  placeholder="Enter team name"
                />
              </div>
            )}

            {/* Team Members (if group event) */}
            {event.teamSize === 'group' && (
              <div className="form-group">
                <label
                  htmlFor="teamMembers"
                  className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                >
                  Team Members <span className="text-gray-400">(including yourself)</span>
                </label>
                <textarea
                  id="teamMembers"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm placeholder-gray-500 focus:outline-none 
                           focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all resize-none"
                  placeholder="Member 1, Member 2, Member 3..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter team member names separated by commas
                </p>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start mt-4 p-3 rounded-lg bg-[#050816]/30 border border-[#00f0ff]/10">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 mr-2"
              />
              <label htmlFor="terms" className="text-xs text-gray-300">
                I agree to the terms and conditions and confirm that all provided information is
                accurate. I understand that the entry fee is non-refundable.
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-[#00f0ff]/20 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center">
          <div className="text-xs text-gray-400">
            Need help? Contact: <span className="text-[#00f0ff]">{event.coordinator.phone}</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 
                       border border-gray-700 rounded-lg transition-colors w-full sm:w-auto
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r 
                       from-[#ff006e] to-[#00f0ff] rounded-lg hover:shadow-lg 
                       hover:shadow-[#ff006e]/30 transition-all duration-300 w-full sm:w-auto
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;