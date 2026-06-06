import React from 'react';
import { Calendar, MessageSquare, CheckCircle, Sparkles, Gift } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

export function HowToBook() {
  const { openBooking } = useBooking();

  const steps = [
    {
      number: "01",
      title: "Explore & Select",
      description: "Browse our signature designs, dry manicures, extensions, or select Custom Nail Art.",
      icon: Sparkles,
      color: "text-rose-500 bg-rose-50 border-rose-100"
    },
    {
      number: "02",
      title: "Fill Details or Chat",
      description: "Click 'Book Now' to open our brief request form, or tap the Floating WhatsApp button at any time.",
      icon: Calendar,
      color: "text-amber-500 bg-amber-50 border-amber-100"
    },
    {
      number: "03",
      title: "Confirm on WhatsApp",
      description: "Our checkout auto-drafts a complete booking message for you. Send it to instantly connect with Purvi.",
      icon: MessageSquare,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100"
    },
    {
      number: "04",
      title: "Claim Loyalty Rewards",
      description: "Check the repeat client box or mention your number during checkout to secure active bonuses!",
      icon: Gift,
      color: "text-purple-500 bg-purple-50 border-purple-100"
    }
  ];

  return (
    <section id="how-to-book" className="py-20 bg-rose-50/10 border-t border-b border-rose-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <span className="inline-flex items-center px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[10px] font-bold tracking-wider uppercase border border-rose-100/50 mb-4">
          Seamless Booking Experience
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">
          How to Book Your Set
        </h2>
        <p className="text-gray-500 font-light text-base max-w-2xl mx-auto leading-relaxed mb-16">
          Whether you want a luxurious manicure, extensions, or hand-painted art, connecting with us is fast, transparent, and entirely managed over WhatsApp.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative mb-16">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-rose-100 via-amber-100 to-emerald-100 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-rose-100/40 p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(244,63,94,0.01)] hover:shadow-[0_12px_30px_rgba(244,63,94,0.05)] transition-all duration-300 hover:-translate-y-1 group text-left flex flex-col justify-between"
              >
                <div>
                  {/* Step Icon and Number */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`p-3 rounded-xl border ${step.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-serif text-gray-200 group-hover:text-rose-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <h3 className="text-lg font-serif font-medium text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Micro Action Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-semibold text-rose-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Row */}
        <div className="bg-white border border-rose-100/60 rounded-3xl p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(244,63,94,0.01)] transition-transform duration-300 hover:scale-[1.01]">
          <div className="text-left">
            <h4 className="font-serif text-base text-gray-900 font-semibold mb-1">
              Ready to claim your session?
            </h4>
            <p className="text-xs text-gray-500 font-light">
              Tap below to customize your service and launch WhatsApp instantly.
            </p>
          </div>
          
          <button
            onClick={() => openBooking()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-full transition-all shadow-md shadow-rose-500/10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book My Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
