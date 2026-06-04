import { Phone, Mail, MapPin, Map } from "lucide-react";
import { useBooking } from "../contexts/BookingContext";

export function Contact() {
  const { openBooking } = useBooking();

  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">Let's Connect</h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-12 text-lg">
              Ready for a transformation? Reach out to book your appointment or inquire about our specialized nail services. I look forward to creating beautiful art for your hands.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Call / WhatsApp</p>
                  <a href="tel:+918055262013" className="text-xl font-light hover:text-rose-400 transition-colors">
                    +91 80552 62013
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:purviramani2@gmail.com" className="text-xl font-light hover:text-rose-400 transition-colors break-all">
                    purviramani2@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-light">
                    Panchvati,<br />Nashik, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/20 to-transparent rounded-3xl" />
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 lg:p-12 relative overflow-hidden h-full min-h-[400px] flex flex-col items-center justify-center text-center">
              <h3 className="text-3xl font-serif mb-6 text-white">Book an Appointment</h3>
              <p className="text-zinc-400 font-light mb-8 max-w-sm">
                Ready to transform your nails? Connect with us on WhatsApp to secure your spot.
              </p>
              <button 
                onClick={openBooking}
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-white bg-rose-600 rounded-full hover:bg-rose-700 transition-colors duration-300 w-full sm:w-auto cursor-pointer shadow-lg shadow-rose-900/20"
              >
                Book via WhatsApp
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
