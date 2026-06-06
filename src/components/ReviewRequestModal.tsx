import { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

export function ReviewRequestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clientName, setClientName] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    // Clean up phone number (remove spaces, dashes, etc.)
    let cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Default to India country code if not provided
    if (cleanNumber.length === 10) {
      cleanNumber = '91' + cleanNumber;
    }

    const reviewUrl = `${window.location.origin}/?action=review`; // Link to the website's review modal
    
    const message = `Hi ${clientName || 'there'}! 👋\n\nThank you for choosing The Nails by Purvi Ramani today. We hope you loved your nail service!\n\nIf you have a moment, we would highly appreciate it if you could share your experience and leave us a review here: ${reviewUrl}\n\nYour feedback means the world to us! 💖\n\nWarmly,\nPurvi`;
    
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="font-serif text-xl text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-500" />
            Send Review Link
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSend} className="p-6">
          <p className="text-sm text-gray-600 mb-5">
            Quickly send a pre-written WhatsApp message asking for a review from your client.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="clientName" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Client Name (Optional)
              </label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Sarah"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors bg-gray-50 placeholder:text-gray-400 text-gray-900"
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                WhatsApp Number *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">+91</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors bg-gray-50 placeholder:text-gray-400 text-gray-900"
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!phoneNumber}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-500/20"
          >
            <Send className="w-4 h-4" />
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
