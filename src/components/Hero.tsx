import { Calendar, Droplets } from "lucide-react";
import { useBooking } from "../contexts/BookingContext";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative flex items-center justify-center pt-24 sm:pt-28 pb-8 sm:pb-10 overflow-hidden bg-[#faf8f6]">
      {/* Background gradients for soft marble/silk feel */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-200/40 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-100/50 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-orange-50/60 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8 pb-8 md:pb-12">
        
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Left Content */}
          <div className="w-[50%] md:w-1/2 flex flex-col items-start text-left shrink-0">
            <span className="text-rose-400 uppercase tracking-[0.2em] text-[8px] sm:text-xs font-semibold mb-2 sm:mb-6 flex items-center gap-1 sm:gap-2">
              <span className="w-4 sm:w-8 h-px bg-rose-300"></span>
              Nail Artist
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-gray-900 font-serif leading-[1.1] mb-1 sm:mb-2 tracking-tight">
              Beauty <br/>
              <span className="font-serif">at Your</span> <span className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-rose-400/90 -rotate-2 inline-block ml-1 sm:ml-2 select-none tracking-normal mt-1 sm:mt-0">Fingertips</span>
              <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-rose-300 inline-block -mt-8 sm:-mt-12 md:-mt-16 ml-1 sm:ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </h1>
            
            <div className="flex items-center gap-2 md:gap-4 mt-2 sm:mt-6 mb-2 sm:mb-6">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-rose-300" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <div className="w-12 sm:w-24 h-px bg-rose-200"></div>
            </div>

            <p className="text-zinc-600 text-[10px] sm:text-sm md:text-lg lg:text-xl font-light mb-4 sm:mb-10 max-w-[180px] sm:max-w-md leading-relaxed pr-0 sm:pr-2">
              Luxury nail art, premium products, and perfection in every detail.
            </p>
            
            <a
              href="#services"
              className="group inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-[9px] sm:text-xs md:text-sm font-medium tracking-[0.1em] text-white bg-[#c68e82] rounded-full hover:bg-[#b07d72] transition-all duration-300 shadow-md cursor-pointer uppercase"
            >
              Explore <span className="hidden sm:inline">&nbsp;Services</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex-1 relative">
            <div className="relative w-full mx-auto aspect-[4/5] max-w-[500px]">
               {/* Decorative Elements */}
              <div className="absolute top-2 right-2 sm:top-6 sm:right-6 md:top-10 md:right-10 w-full h-full bg-[#f4e2de] rounded-xl sm:rounded-2xl md:rounded-[2rem] -z-10 rotate-3 transition-transform duration-700 hover:rotate-6"></div>
              
              {/* The Main Image */}
              <div className="w-full h-full rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-white border-2 sm:border-4 border-white relative z-0">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop"
                  alt="Luxury manicure"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000"
                />
              </div>

              {/* Overlapping Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 md:bottom-10 md:-right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-[#c68e82] text-white rounded-full flex flex-col items-center justify-center p-1 sm:p-2 md:p-4 shadow-xl z-20 border-2 sm:border-4 border-white/20 backdrop-blur-sm cursor-default hover:scale-105 transition-transform duration-300">
                <span className="text-[5px] sm:text-[7px] md:text-[8px] lg:text-[10px] uppercase tracking-widest mb-0.5">Let Your</span>
                <span className="font-script text-sm sm:text-xl md:text-3xl lg:text-4xl -rotate-6">Nails</span>
                <span className="text-[4px] sm:text-[6px] md:text-[8px] lg:text-[10px] uppercase tracking-widest mt-0.5 whitespace-nowrap">Do The Talking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="mt-12 sm:mt-16 flex flex-row items-center justify-center sm:justify-start lg:justify-between w-full max-w-md lg:max-w-xl gap-4 sm:gap-6 md:gap-8 mx-auto lg:mx-0">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-default">
            <div className="text-rose-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
            <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-1">Customized</h4>
            <p className="text-[8px] sm:text-[10px] md:text-sm text-gray-500 font-light">Tailored to Your Style</p>
          </div>
          <div className="w-px h-8 sm:h-10 md:h-12 bg-rose-200/50"></div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-default">
            <div className="text-rose-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
              </svg>
            </div>
            <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-1">Luxury</h4>
            <p className="text-[8px] sm:text-[10px] md:text-sm text-gray-500 font-light">Premium Products</p>
          </div>
          <div className="w-px h-8 sm:h-10 md:h-12 bg-rose-200/50"></div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-default">
            <div className="text-rose-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
              <Droplets className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" strokeWidth={0.8} />
            </div>
            <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-1">Perfection</h4>
            <p className="text-[8px] sm:text-[10px] md:text-sm text-gray-500 font-light">Flawless Every Time</p>
          </div>
        </div>

      </div>
    </section>
  );
}
