import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { ServiceGallery } from './components/ServiceGallery';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { CookieConsent } from './components/CookieConsent';
import { LoyaltyRewards } from './components/LoyaltyRewards';
import { HowToBook } from './components/HowToBook';
import { AftercareInstructions } from './components/AftercareInstructions';
import { Courses } from './components/Courses';
import { useBooking } from './contexts/BookingContext';
import { Menu, X, ArrowUp } from 'lucide-react';

export default function App() {
  const { openBooking } = useBooking();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Courses', href: '#courses' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }}>
                <img 
                  src="./logo.png?v=2" 
                  alt="Nails by Purvi Ramani Logo" 
                  className="h-16 sm:h-20 w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105 border-none"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="font-serif text-xl sm:text-2xl tracking-tighter text-gray-900 hidden">
                  Nails by Purvi<span className="text-rose-500">.</span>
                </span>
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center lg:space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-500 hover:text-gray-900 px-2 py-2 text-sm uppercase tracking-widest font-medium transition-colors">
                  {link.name}
                </a>
              ))}
              <button
                onClick={openBooking}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-white bg-rose-600 rounded-full hover:bg-rose-700 transition-colors shadow-md shadow-rose-500/20 cursor-pointer whitespace-nowrap"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={openBooking}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white bg-rose-600 rounded-full hover:bg-rose-700 transition-colors shadow-md cursor-pointer whitespace-nowrap"
              >
                Book Now
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 p-2 hover:bg-rose-50 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-rose-100 shadow-xl py-4 flex flex-col items-center gap-4 animate-in slide-in-from-top-4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-rose-600 px-4 py-2 text-lg uppercase tracking-widest font-medium transition-colors w-full text-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Hero />
        <Services />
        <HowToBook />
        <Courses />
        <WhyChooseUs />
        <About />
        <ServiceGallery />
        <AftercareInstructions />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-rose-50/50 py-16 text-center border-t border-rose-100">
        <LoyaltyRewards />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <a href="#" className="flex justify-center" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }}>
              <span className="font-serif text-2xl md:text-3xl tracking-tighter text-gray-900">
                Nails by Purvi<span className="text-rose-500">.</span>
              </span>
            </a>
          </div>
          <p className="text-zinc-500 font-light text-sm">
            &copy; {new Date().getFullYear()} The Nails by Purvi. All rights reserved.<br/>
            Located in Panchvati, Nashik.
          </p>
          <div className="mt-6 flex justify-center space-x-6 text-xs text-zinc-400 font-light">
            <a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
      
      <FloatingWhatsApp />
      <CookieConsent />
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-8 z-40 p-3 bg-white text-[#c68e82] border-2 border-[#c68e82]/20 rounded-full shadow-lg hover:shadow-xl hover:bg-[#c68e82] hover:text-white hover:-translate-y-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
