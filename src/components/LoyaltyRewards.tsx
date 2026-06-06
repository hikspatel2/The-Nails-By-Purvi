import React from 'react';
import { Gift, Heart, Sparkles, Crown } from 'lucide-react';

export function LoyaltyRewards() {
  const milestones = [
    {
      visits: "3 Visits",
      title: "Complementary Care",
      description: "Enjoy a free hand-reflexology massage & custom essential oil cuticle repair upgrade with your service.",
      icon: Heart,
      badge: "Silver Tier"
    },
    {
      visits: "6 Visits",
      title: "15% Art Voucher",
      description: "Receive 15% off any custom custom nail art service, encapsulation, or complex hand-painted sets.",
      icon: Sparkles,
      badge: "Gold Tier"
    },
    {
      visits: "10 Visits",
      title: "VIP Set or Free Mani",
      description: "Claim ₹500 off on full acrylic/soft gel extensions, OR complete complementary Deluxe Manicure.",
      icon: Crown,
      badge: "Platinum VIP"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-left">
      <div className="bg-white border border-rose-100 rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(244,63,94,0.02)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(244,63,94,0.06)]">
        {/* Soft atmospheric glow accents */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-rose-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-rose-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[10px] font-bold tracking-wider uppercase border border-rose-100/50">
              Loyalty Rewards
            </span>
            <h3 className="text-3xl md:text-3xl font-serif text-gray-900 leading-tight">
              Precious Hands Club
            </h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md">
              Your continued trust is our greatest pride. To show our gratitude, regular clients are automatically enrolled in our loyalty program. <strong>No physical stamps to carry!</strong> We track your visits built directly around your <strong>WhatsApp phone number</strong> database. 
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-2.5 text-rose-600 text-xs font-semibold">
                <Gift className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                <span className="leading-relaxed">
                  How to redeem: Just mention your loyalty rewards or WhatsApp number when booking! Your discount is verified during checkout.
                </span>
              </div>
              
              <a
                href={`https://wa.me/918055262013?text=${encodeURIComponent("Hi Purvi! I'm a regular client and would like to book my next appointment and check my Loyalty Rewards status ✨")}`}
                target="_blank"
                rel="noreferrer referrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/10 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.375 3.469 2.235 2.235 3.465 5.21 3.465 8.373 0 6.537-5.325 11.86-11.859 11.86-2.004-.001-3.973-.509-5.714-1.472L0 24zm6.59-4.846c1.62.962 3.208 1.468 4.757 1.469 5.483 0 9.945-4.461 9.948-9.944.002-2.656-1.03-5.153-2.905-7.03C16.516 1.772 14.02 1.74 11.859 1.74c-5.485 0-9.948 4.462-9.95 9.946-.001 1.776.471 3.511 1.365 5.048l-.936 3.42 3.51-.92z"/>
                </svg>
                Check Rewards & Book
              </a>
            </div>
          </div>

          {/* Milestones Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-rose-50/10 hover:bg-rose-50/30 border border-rose-100/30 hover:border-rose-100/60 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-rose-50 p-2 rounded-xl text-rose-500 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-extrabold tracking-widest uppercase text-rose-500 bg-white border border-rose-100/50 px-2 py-0.5 rounded-full">
                        {item.visits}
                      </span>
                    </div>
                    
                    <div className="space-y-0.5">
                      <h4 className="font-serif text-sm text-gray-900 font-medium group-hover:text-rose-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-rose-400 font-medium tracking-wide uppercase">
                        {item.badge}
                      </p>
                    </div>
                    
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
