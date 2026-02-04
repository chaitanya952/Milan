// RegistrationForm.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SubEvent, Coordinator } from '@/lib/eventsData';

interface RegistrationModalProps {
  isOpen?: boolean;
  onClose: () => void;
  subEvent?: SubEvent;
  eventName?: string;
  eventColor?: string;
  eventCoordinator?: Coordinator;
  upiQrCode?: string;
  // Support for direct event prop if needed
  event?: {
    id: string;
    name: string;
    entryFee: {
      single?: number;
      group?: number;
    };
    teamSize: 'single' | 'group';
    minTeamSize?: number;
    maxTeamSize?: number;
    coordinator: {
      name: string;
      phone: string;
    };
  };
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  isOpen = true, 
  onClose, 
  subEvent,
  eventName,
  eventColor,
  eventCoordinator,
  upiQrCode,
  event: directEvent
}) => {
  // Derive event data from various possible props
  const event = directEvent || (subEvent ? {
    id: subEvent.id,
    name: subEvent.name,
    entryFee: subEvent.entryFee,
    teamSize: subEvent.teamSize,
    minTeamSize: subEvent.minTeamSize,
    maxTeamSize: subEvent.maxTeamSize,
    coordinator: eventCoordinator || subEvent.coordinators[0] || { name: 'Coordinator', phone: '+91 00000 00000' }
  } : {
    id: 'general',
    name: eventName || 'General Registration',
    entryFee: { single: 0 },
    teamSize: 'single' as const,
    coordinator: eventCoordinator || { name: 'Coordinator', phone: '+91 00000 00000' }
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration submission
    console.log('Registration data:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  const entryFee = event.teamSize === 'single' 
    ? event.entryFee.single 
    : event.entryFee.group || event.entryFee.single;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-sm">
      <div className="relative w-full max-w-[700px] bg-gradient-to-br from-[#0a0e27] to-[#050816] rounded-2xl border border-[#00f0ff]/20 shadow-2xl shadow-[#00f0ff]/10">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#00f0ff]/20 flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#ff006e] to-[#00f0ff] bg-clip-text text-transparent">
              {event.name} - Registration
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">Fill in your details to register</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#00f0ff]/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[65vh] overflow-y-auto px-4 md:px-6 py-4">
          {/* Event Details - Compact */}
          <div className="mb-4 p-3 md:p-4 rounded-xl bg-[#050816]/50 border border-[#00f0ff]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#ff006e]/20 flex items-center justify-center mr-2">
                  <span className="text-xs">💰</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Entry Fee</p>
                  <p className="text-sm font-bold text-white">₹{entryFee}</p>
                </div>
              </div>
              
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
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                Full Name <span className="text-[#ff006e]">*</span>
              </label>
              <input
                type="text"
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
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                Email <span className="text-[#ff006e]">*</span>
              </label>
              <input
                type="email"
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
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  Phone <span className="text-[#ff006e]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm placeholder-gray-500 focus:outline-none 
                           focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                  placeholder="9876543210"
                />
              </div>

              {/* College */}
              <div className="form-group">
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  College <span className="text-[#ff006e]">*</span>
                </label>
                <input
                  type="text"
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
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  Year <span className="text-[#ff006e]">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#050816]/50 border border-[#00f0ff]/20 rounded-lg 
                           text-white text-sm focus:outline-none focus:border-[#00f0ff] 
                           focus:ring-1 focus:ring-[#00f0ff]/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#0a0e27]">Select Year</option>
                  <option value="1st" className="bg-[#0a0e27]">1st Year</option>
                  <option value="2nd" className="bg-[#0a0e27]">2nd Year</option>
                  <option value="3rd" className="bg-[#0a0e27]">3rd Year</option>
                  <option value="4th" className="bg-[#0a0e27]">4th Year</option>
                </select>
              </div>

              {/* Team Size (if group event) */}
              {event.teamSize === 'group' && (
                <div className="form-group">
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                    Team Size <span className="text-[#ff006e]">*</span>
                  </label>
                  <select
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
                    ).map(num => (
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
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  Team Name <span className="text-[#ff006e]">*</span>
                </label>
                <input
                  type="text"
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
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  Team Members <span className="text-gray-400">(including yourself)</span>
                </label>
                <textarea
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
                I agree to the terms and conditions and confirm that all provided information is accurate.
                I understand that the entry fee is non-refundable.
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
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 
                       border border-gray-700 rounded-lg transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r 
                       from-[#ff006e] to-[#00f0ff] rounded-lg hover:shadow-lg 
                       hover:shadow-[#ff006e]/30 transition-all duration-300 w-full sm:w-auto"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
