export function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="./purvi-profile.jpg" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('unsplash.com')) return; // Prevent infinite loop
                    target.src = "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop";
                  }}
                  alt="Purvi designing nails" 
                  className="w-full h-auto aspect-[4/5] object-cover object-center"
                />
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-rose-100 rounded-full -z-10 blur-3xl opacity-60"></div>
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-rose-200 rounded-full -z-10 blur-3xl opacity-40"></div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <span className="text-rose-600 font-medium tracking-wider uppercase text-sm block mb-4">Behind the Art</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Meet Purvi Jagdish Ramani</h2>
            
            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
              <p>
                Hello! I am Purvi, the founder and lead artist at <strong>The Nails by Purvi</strong>. Based in the heart of Panchvati, Nashik, my passion lies in transforming nails into miniature works of art.
              </p>
              <p>
                With a keen eye for detail and a dedication to nail health, I specialize in everything from restorative dry manicures to intricate gel extensions. Every set of nails is a customized experience tailored to your lifestyle and personal aesthetic.
              </p>
              <p>
                My goal is to provide a relaxing, luxurious environment where you can unwind while I meticulously craft the perfect look for your hands. Your satisfaction and confidence are my greatest achievements.
              </p>
            </div>
            
            <div className="mt-10">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Signature_placeholder.svg/512px-Signature_placeholder.svg.png" 
                alt="Purvi Signature" 
                className="h-12 opacity-40 mix-blend-multiply flex-shrink-0 grayscale hue-rotate-180 sepia transition-opacity hover:opacity-70"
                style={{ filter: "invert(1) opacity(0.8) drop-shadow(0 0 0 rose)" }}
              />
              <p className="mt-4 font-serif italic text-gray-800">Purvi Jagdish Ramani</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Founder & Lead Artist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
