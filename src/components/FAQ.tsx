import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How long do your services usually take?",
    answer: "Service duration varies based on complexity. A standard dry manicure or gel polish application typically takes 45 to 60 minutes. Soft gel or acrylic extensions with intricate custom nail art can take anywhere from 2 to 3 hours. We focus on precision and quality over speed."
  },
  {
    question: "What is your booking and cancellation policy?",
    answer: "We recommend booking in advance to secure your preferred time slot. If you need to cancel or reschedule, please provide at least 24 hours' notice. Late cancellations may be subject to a fee or loss of deposit to respect our artists' time."
  },
  {
    question: "How should I maintain my nail extensions at home?",
    answer: "To keep your extensions pristine, apply cuticle oil daily to nourish the skin, always wear gloves when doing dishes or using cleaning harsh chemicals, and never use your nails as tools (like opening cans). We recommend scheduling a refill every 3 to 4 weeks."
  },
  {
    question: "Why do you recommend a dry manicure?",
    answer: "A dry manicure is safer and leads to longer-lasting results. Soaking nails in water causes the nail plate to expand, which can lead to polish chipping once it dries and shrinks back to its normal size. Dry manicures ensure a cleaner cuticle line and better product adhesion."
  },
  {
    question: "Can I request custom nail art designs?",
    answer: "Absolutely! We love bringing your creative visions to life. We encourage you to bring reference photos to your appointment. Please note that custom nail art is priced additionally based on the complexity and the extra time required."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-rose-200 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Everything you need to know about our services, booking policies, and maintaining your gorgeous nails.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-rose-100 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-rose-50/30' : 'bg-white hover:border-rose-200'
              }`}
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180 text-rose-500' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 text-gray-600 font-light leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
