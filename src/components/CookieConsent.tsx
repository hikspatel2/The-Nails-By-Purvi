import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented or dismissed the cookie banner
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for the banner to slide in gracefully after load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-rose-100 shadow-[0_10px_30px_rgba(244,63,94,0.08)] flex flex-col gap-4 relative">
        <button 
          onClick={handleDecline}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-rose-50 cursor-pointer"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex gap-3 items-start pr-6">
          <div className="bg-rose-50 p-2.5 rounded-xl shrink-0 text-rose-500">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-serif text-lg text-gray-900 font-medium mb-1">Cookie Consent</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              We use cookies to improve your browsing experience, supply customized features, and analyze our traffic. By clicking "Accept All", you agree to our use of cookies.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1 border-t border-rose-50/50">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all cursor-pointer"
          >
            Preferences
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all shadow-md shadow-rose-500/10 hover:shadow-lg cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
