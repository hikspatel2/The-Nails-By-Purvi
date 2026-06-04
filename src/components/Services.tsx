import { Sparkles, Scissors, Palette, Clock, Feather, Gem, X, CheckCircle2, ArrowRight, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";

interface ServiceProps {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  steps: string[];
  price?: string;
  image: string;
  icon: LucideIcon;
}

const servicesList: ServiceProps[] = [
  {
    id: "dry-manicure",
    title: "Dry Manicure",
    description: "A waterless manicure that focuses on cuticle care and shaping for a pristine, long-lasting finish.",
    longDescription: "Our signature dry manicure is a waterless treatment that ensures your polish adheres better and lasts longer. By avoiding water soaking, the nail plate remains in its natural state, preventing expansion and contraction that leads to chipping. This treatment is perfect for maintaining optimal nail health while achieving a flawless, long-lasting look.",
    steps: [
      "Consultation and nail assessment",
      "Gentle polish removal (if any)",
      "Precision nail shaping and filing",
      "Detailed e-file cuticle work",
      "Nail plate buffing and preparation",
      "Application of nourishing cuticle oil and hand massage"
    ],
    price: "₹500 - ₹800",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2000&auto=format&fit=crop",
    icon: Scissors
  },
  {
    id: "gel-polish",
    title: "Gel Polish",
    description: "High-shine, chip-resistant gel polish cured under UV light for weeks of flawless color.",
    longDescription: "Enjoy up to 3-4 weeks of flawless, high-gloss color with our premium Gel Polish service. We use top-tier gel products that provide a durable, flexible coating to protect your natural nails. Say goodbye to chipping and smudging, and hello to instantly dry, beautiful nails.",
    steps: [
      "Complete dry manicure preparation",
      "Application of protective gel base coat",
      "Two coats of your chosen gel color",
      "High-shine or matte gel top coat application",
      "UV/LED curing between each layer",
      "Cleansing and hydrating cuticle oil finish"
    ],
    price: "₹800 - ₹1,200",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000&auto=format&fit=crop",
    icon: Palette
  },
  {
    id: "temp-extensions",
    title: "Temporary Extensions",
    description: "Beautiful, natural-looking temporary extensions perfect for upcoming special events or parties.",
    longDescription: "Looking for a quick transformation for a wedding, party, or weekend getaway? Our Temporary Extensions provide instant length, shape, and glamour. These press-on style extensions are applied with safe adhesives, providing a beautiful look that lasts for a short term without long-term commitment.",
    steps: [
      "Natural nail shaping and preparation",
      "Sizing and selection of perfect-fit tips",
      "Application with safe, temporary adhesive",
      "Custom shaping (coffin, almond, square, etc.)",
      "Color or simple nail art application",
      "Post-care instructions for easy removal"
    ],
    price: "₹1,000 - ₹1,500",
    image: "https://images.unsplash.com/photo-1632897597732-c6dc5ef98f58?q=80&w=2000&auto=format&fit=crop",
    icon: Clock
  },
  {
    id: "soft-gel",
    title: "Soft Gel Extensions",
    description: "Lightweight, flexible soft gel tips that provide length and durability with a natural feel.",
    longDescription: "The revolutionary Soft Gel Extensions (often known as Gel-X) are pre-shaped, full-cover nail tips made entirely of gel. They are adhered to your natural nail using gel polish, providing incredible durability without the bulk or damage of traditional acrylics. They feel light, look incredibly natural, and soak off easily.",
    steps: [
      "Thorough cuticle and nail preparation",
      "Sizing and contouring of the soft gel tips",
      "Application of gel adhesive and curing under LED",
      "Refining the shape and length to your preference",
      "Application of gel polish color and design",
      "Top coat finishing and cuticle hydration"
    ],
    price: "₹1,500 - ₹2,500",
    image: "https://images.unsplash.com/photo-1496229156094-1b7cd2bf72dc?q=80&w=2000&auto=format&fit=crop",
    icon: Feather
  },
  {
    id: "acrylic-gel",
    title: "Acrylic / Gel Extensions",
    description: "Strong, sculpted acrylic or hard gel extensions for maximum length, shape customization, and durability.",
    longDescription: "For those who desire ultimate strength, length, and durability, our classic Acrylic or Hard Gel extensions are the perfect choice. These extensions are sculpted specifically for your nail beds, allowing for dramatic shapes and long-lasting wear. Perfect for those with weak natural nails who want a sturdy enhancement.",
    steps: [
      "Dry manicure preparation and gentle nail etching",
      "Application of nail forms or tips",
      "Sculpting the acrylic or hard gel builder",
      "Filing, buffing, and perfecting the custom shape",
      "Application of desired gel color and nail art",
      "Final glossy top coat and nourishing hand treatment"
    ],
    price: "₹2,000 - ₹3,500",
    image: "https://images.unsplash.com/photo-1595123984381-8079ed3a5f70?q=80&w=2000&auto=format&fit=crop",
    icon: Gem
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceProps | null>(null);
  const { openBooking } = useBooking();

  const handleBookNow = (service: ServiceProps) => {
    setSelectedService(null);
    let text = `Hi Purvi, I would like to book an appointment for ${service.title}.`;
    if (service.price) {
      text += `\nI saw the price is roughly ${service.price}.`;
    }
    text += `\nPlease let me know the available time slots.`;
    const url = `https://wa.me/918055262013?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="services" className="py-24 bg-rose-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <span className="text-rose-600 font-medium tracking-wider uppercase text-sm">Our Expertise</span>
            <Sparkles className="w-5 h-5 text-rose-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Signature Services</h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            Experience premium nail care tailored to your unique style. We use high-quality products to ensure your nails not only look beautiful but remain healthy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="p-8 flex flex-col justify-between h-full bg-white relative">
                <div className="absolute -top-6 left-8 bg-white p-3 rounded-2xl shadow-sm border border-rose-50 text-rose-500">
                  <service.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-2xl font-serif text-gray-900">{service.title}</h3>
                    {service.price && (
                      <span className="text-sm font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-full whitespace-nowrap mt-1">
                        {service.price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">{service.description}</p>
                  <p className="text-rose-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider flex items-center gap-1">
                    View Details
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 relative my-8 flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-colors z-10 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-full h-48 sm:h-64 relative shrink-0">
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 md:left-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                    <selectedService.icon className="w-5 h-5" />
                  </div>
                  {selectedService.price && (
                    <span className="text-sm font-medium bg-rose-500/90 px-3 py-1 rounded-full backdrop-blur-md">
                      {selectedService.price}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif">{selectedService.title}</h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto w-full text-left">
              <p className="text-gray-600 leading-relaxed font-light mb-8 text-lg">
                {selectedService.longDescription}
              </p>
              
              <div className="mb-10">
                <h4 className="text-xl font-serif text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                  Service Steps
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {selectedService.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleBookNow(selectedService)}
                className="w-full flex justify-center items-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
              >
                Book {selectedService.title} Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
