import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Droplet, AlertCircle, Calendar, ShieldCheck, Heart } from 'lucide-react';

interface CareSection {
  id: string;
  type: string;
  subtitle: string;
  lifeSpan: string;
  infillTime: string;
  dos: string[];
  donts: string[];
  proTip: string;
}

export function AftercareInstructions() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('acrylic');

  const aftercareData: CareSection[] = [
    {
      id: 'acrylic',
      type: 'Acrylic Extensions',
      subtitle: 'For ultimate strength, durability and high-impact custom lengths.',
      lifeSpan: '3 - 4 Weeks',
      infillTime: 'Every 2 - 3 Weeks',
      dos: [
        'Apply high-quality cuticle oil twice daily to keep the natural bed flexible and hydrated.',
        'Wear protective rubber gloves when washing dishes, using cleaning chemicals, or gardening.',
        'Wash hands with antibacterial soap after dirt exposure to prevent bacteria trapped under lifting nails.'
      ],
      donts: [
        'Never use your acrylics as screwdrivers, peelers, or soda can openers.',
        'Do not peel, pick, or pry lifting acrylics off. This severely tears away your natural nail layers.',
        'Avoid soaking your hands in hot water, hot tubs, or pools for extended periods.'
      ],
      proTip: 'If an acrylic nail lifts or chips, do not try to glue it back down yourself. Trapped moisture can lead to a bacterial infection ("greenie"). Book a swift repair instead!'
    },
    {
      id: 'softgel',
      type: 'Soft Gel Extensions / Gel Overlay',
      subtitle: 'Lightweight, flexible, and completely natural feeling overlay layers.',
      lifeSpan: '2 - 3 Weeks',
      infillTime: 'Every 2.5 Weeks',
      dos: [
        'Be gentle for the first 24 hours as the seal curing completes its environmental adjustment.',
        'Dry your hands thoroughly after washing. Gels love water-free margins to maintain a tight seal.',
        'Use mild soap and dry with lint-free towels whenever possible.'
      ],
      donts: [
        'Avoid contact with direct chemical solvents, hair dyes, sunscreen, or acetone-based products.',
        'Do not file the edge of your nail set! Doing so breaks the critical edge seal, leading to instant peeling.',
        'Never bite, chew, or pick at the edges if a lift occurs.'
      ],
      proTip: 'Apply a drop of dry oil or moisturizer to the underside of the free edge. This prevents the natural nail from curling away from the gel overlay.'
    },
    {
      id: 'natural',
      type: 'Dry Manicure & Gel Polish',
      subtitle: 'Flawless cuticle treatment paired with high-shine gel lacquers.',
      lifeSpan: '2 Weeks',
      infillTime: 'Removal & Fresh Set in 14-16 Days',
      dos: [
        'Clean under the nail tips gently using a soft nail brush, not sharp metal files.',
        'Massage hand cream after sanitizing to offset the drying effects of alcohol rubs.',
        'Rinse immediately if you come into contact with highly pigmented foods (like turmeric, curries, or berries).'
      ],
      donts: [
        'Do not pick or scratch at the gel edges, which breaks the surface luster and bond.',
        'Do not bite your cuticles or side walls—this causes painful hangnails and ruins the clean dry-mani look.',
        'Avoid harsh scrubbing sponges directly rubbing against the nail surfaces.'
      ],
      proTip: 'Always schedule a professional removal with us. Safe soak-off or delicate e-file buffing preserves your natural keratine surface.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section id="aftercare" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <span className="inline-flex items-center px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[10px] font-bold tracking-wider uppercase border border-rose-100/50 mb-4 animate-pulse">
          Nail Longevity Guide
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">
          Nail Aftercare & Maintenance
        </h2>
        <p className="text-gray-500 font-light text-base max-w-2xl mx-auto leading-relaxed mb-12">
          Keep your professional set looking breathtaking for longer! Follow our specialized, type-specific guidelines to ensure beauty, strength, and flawless longevity.
        </p>

        {/* Collapsible Accordions */}
        <div className="space-y-4 text-left">
          {aftercareData.map((section) => {
            const isOpen = activeAccordion === section.id;
            return (
              <div 
                key={section.id} 
                className="border border-rose-100/50 rounded-2xl bg-white overflow-hidden shadow-[0_4px_25px_rgba(244,63,94,0.01)] transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 bg-rose-50/10 hover:bg-rose-50/25 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4.5">
                    <div className="p-2.5 bg-white border border-rose-100/50 rounded-xl text-rose-500 shadow-sm shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-gray-900">
                        {section.type}
                      </h3>
                      <p className="text-xs text-gray-400 font-light hidden sm:block mt-0.5">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-rose-500" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Content with smooth height transition simulation */}
                {isOpen && (
                  <div className="p-6 sm:p-8 border-t border-rose-100/30 bg-rose-50/5/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-rose-150/20">
                      <div className="flex gap-2.5 items-center">
                        <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Average Lifespan</p>
                          <p className="text-xs font-semibold text-gray-800">{section.lifeSpan}</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-center">
                        <div className="bg-amber-50 text-amber-600 p-1.5 rounded-lg">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Infill Timeline</p>
                          <p className="text-xs font-semibold text-gray-800">{section.infillTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Do's and Don'ts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Do's */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                          Care Tips & Do's
                        </h4>
                        <ul className="space-y-2.5">
                          {section.dos.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-xs text-gray-600 font-light leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Don'ts */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                          What to Avoid & Don'ts
                        </h4>
                        <ul className="space-y-2.5">
                          {section.donts.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-xs text-gray-600 font-light leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pro Advisory Tip Box */}
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100/50 flex gap-3.5 items-start">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-amber-800">Pro Salon Advisory</p>
                        <p className="text-xs text-amber-700/80 font-light leading-relaxed">
                          {section.proTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* General Universal Rules Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-rose-50/30 to-amber-50/30 border border-rose-100/30 flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="bg-rose-500 text-white p-3 rounded-full shrink-0 shadow-md shadow-rose-300">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-gray-900 mb-1">
              General Longevity Secret: Cuticle hydration is key!
            </h4>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              No matter what system you wear, applying cuticle oil daily creates flexibility. Flexible nails deflect impact and absorb daily shock absorbances, rather than chipping or snapping off.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
