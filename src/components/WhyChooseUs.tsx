import { ShieldCheck, Palette, Award } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-rose-500" />,
      title: "Hygiene-focused",
      description: "Strict sterilization protocols for all tools and a clean, safe environment for every client."
    },
    {
      icon: <Palette className="w-8 h-8 text-rose-500" />,
      title: "Custom Designs",
      description: "Personalized nail art and creative designs tailored specifically to your unique style and preferences."
    },
    {
      icon: <Award className="w-8 h-8 text-rose-500" />,
      title: "Long-lasting quality",
      description: "Premium products and expert application techniques ensuring your vibrant nails look flawless for weeks."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-rose-200 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-rose-100 hover:shadow-xl hover:shadow-rose-100/50 hover:border-rose-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
