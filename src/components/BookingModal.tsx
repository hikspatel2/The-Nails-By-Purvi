import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, ArrowRight, Scissors } from 'lucide-react';

interface BookingModalProps {
  onClose: () => void;
  initialService?: string;
}

export function BookingModal({ onClose, initialService = '' }: BookingModalProps) {
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [wantsReminder, setWantsReminder] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let text = "Hi Purvi, I would like to book an appointment!";
    
    if (service && date && time) {
      text = `Hi Purvi, I would like to book an appointment for ${service} on ${date} at ${time}.`;
    } else if (service && date) {
      text = `Hi Purvi, I would like to book an appointment for ${service} on ${date}.`;
    } else if (date && time) {
      text = `Hi Purvi, I would like to book an appointment on ${date} at ${time}.`;
    } else if (date) {
      text = `Hi Purvi, I would like to book an appointment on ${date}.`;
    }
    
    if (wantsReminder && phone) {
      text += `\nI also opted in for a reminder 24 hours before the appointment at ${phone}.`;
    }

    try {
      // Send booking request to backend to notify owner
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, date, time, wantsReminder, phone })
      });
    } catch (error) {
      console.error('Failed to notify owner, continuing with WhatsApp flow', error);
    }

    const url = `https://wa.me/918055262013?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 relative"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif text-gray-900 mb-2">Book a Session</h3>
            <div className="w-12 h-1 bg-rose-200 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 font-light text-sm">
              Select your preferred date and time. We'll confirm the final appointment via WhatsApp.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2 font-medium">Service</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-rose-300">
                  <Scissors className="w-5 h-5" />
                </div>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-rose-100/50 rounded-2xl focus:ring-rose-500 focus:border-rose-500 sm:text-sm text-gray-900 bg-rose-50/30 outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Dry Manicure">Dry Manicure</option>
                  <option value="Gel Polish">Gel Polish</option>
                  <option value="Temporary Extensions">Temporary Extensions</option>
                  <option value="Soft Gel Extensions">Soft Gel Extensions</option>
                  <option value="Acrylic / Gel Extensions">Acrylic / Gel Extensions</option>
                  <option value="Other">Other / Not sure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 font-medium">Preferred Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-rose-300">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full pl-11 pr-4 py-3.5 border border-rose-100/50 rounded-2xl focus:ring-rose-500 focus:border-rose-500 sm:text-sm text-gray-900 bg-rose-50/30 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2 font-medium">Preferred Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-rose-300">
                  <Clock className="w-5 h-5" />
                </div>
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-rose-100/50 rounded-2xl focus:ring-rose-500 focus:border-rose-500 sm:text-sm text-gray-900 bg-rose-50/30 outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select a time slot</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100/50">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="reminder"
                    type="checkbox"
                    checked={wantsReminder}
                    onChange={(e) => setWantsReminder(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500 bg-white"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="reminder" className="font-medium text-gray-700 cursor-pointer">
                    Appointment Reminder
                  </label>
                  <p className="text-gray-500 font-light mt-0.5">
                    Send me an automated reminder 24 hours before my session.
                  </p>
                </div>
              </div>

              {wantsReminder && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm text-gray-600 mb-2 font-medium">WhatsApp / Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91"
                    className="block w-full px-4 py-3 border border-rose-100/50 rounded-xl focus:ring-rose-500 focus:border-rose-500 sm:text-sm text-gray-900 bg-white outline-none transition-colors"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-colors mt-8"
            >
              Continue to WhatsApp
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
