import React, { useState } from 'react';
import { BookOpen, Award, Sparkles, GraduationCap, Calendar, Clock, ListChecks, CheckCircle2, ChevronRight, X, Phone, User, NotebookPen, Info, ArrowRight } from 'lucide-react';

interface CourseProps {
  id: string;
  title: string;
  subtitle: string;
  category: 'Beginner' | 'Professional' | 'Advanced Masterclass';
  duration: string;
  investment: string;
  description: string;
  curriculum: string[];
  inclusions: string[];
  image: string;
  badge: string;
}

const COURSES_DATA: CourseProps[] = [
  {
    id: 'nail-art-foundation',
    title: 'Self-Nail Art Mastery',
    subtitle: 'Foundation & Personal Care Masterclass',
    category: 'Beginner',
    duration: '2 Days (4 Hours / Day)',
    investment: '₹4,999',
    description: 'Perfect for hobbyists and nail care enthusiasts wanting to apply, style, and safely maintain professional-looking sets right from the convenience of home. Learn the step-by-step secret to beautiful, long-lasting gel manicures that don\'t chip!',
    curriculum: [
      'Basic natural nail anatomy and precise sanitization protocols',
      'Flawless waterless cuticle prep and natural nail shaping',
      'The secrets of bubble-free gel base and color lacquer application',
      'Minimalist design art: brush hand-painted lines, foils, stickers, and dotting tools',
      'How to safely soak off gel polish without damaging your natural keratin'
    ],
    inclusions: [
      'Personal Nail Art Starter Kit (UV/LED Mini Lamp, Premium Gel Polish, Base & Top Coat, Buffer, Nail File, Foil kit)',
      'The Nails By Purvi Official Beginner PDF Guidebook',
      'Hands-on practice on professional trainers and nail wheels',
      'Complimentary Certification of Completion'
    ],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
    badge: 'Self-Care & Hobby'
  },
  {
    id: 'pro-nail-technician',
    title: 'Professional Nail Technician Bootcamp',
    subtitle: 'All-in-One Certification Board Course',
    category: 'Professional',
    duration: '7 Days (5 Hours / Day)',
    investment: '₹14,999',
    description: 'A career-defining intensive catalog designed to turn complete beginners into highly valuable, certified, salon-ready professional nail artists. From precision e-file dry detailing to complex structural sculpting, this is our most comprehensive signature course.',
    curriculum: [
      'Advanced Russian Dry Manicure (E-file detailing, cuticle correction, and shape preparation)',
      'Soft Gel Extensions (Gel-X/full cover tips installation for rapid premium transformations)',
      'Acrylic Extension Systems (Form alignment, acrylic powder-to-liquid tip synthesis, bead control)',
      'Sculpted Hard Builder Gel (Restructuring uneven nail beds, apex building, and stress-fracture engineering)',
      'Infill procedures, cosmetic extensions rebalancing, and damage-free painless drill-removal workflows',
      'Salon Business Fundamentals: client consultations, photography branding, and service pricing menus'
    ],
    inclusions: [
      'Master Professional Tooling Kit (Heavy-Duty Portable E-File Drill, Professional Acrylic Monomer & Powders, Premium Nail Extension Forms, Sculpting Gels, Builder Brushes, Professional files)',
      'Fully Detailed Step-by-Step Training Manual Booklet',
      'Hands-on Live Model practice sessions with personalized expert 1-on-1 feedback',
      'Golden Framed Career-Ready Professional Nail Artist Certification',
      'Exclusive Lifetime WhatsApp Mentorship and post-course doubt clearing'
    ],
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344ca?q=80&w=600&auto=format&fit=crop',
    badge: 'Most Popular / Career Course'
  },
  {
    id: 'elite-3d-nail-art',
    title: 'Elite 3D & Advanced Nail Art Masterclass',
    subtitle: 'High-Impact Creative Design & Embellishments',
    category: 'Advanced Masterclass',
    duration: '3 Days (6 Hours / Day)',
    investment: '₹9,999',
    description: 'Elevate your existing technician service offering into high-end structural hand-painted luxury art. Learn the advanced creative styles requested by high-profile clients, brides, and editorial modeling runways.',
    curriculum: [
      '3D Silicone Relief Sculptures (handcrafting gorgeous textured flowers, bows, and elevated structures)',
      'Intricate Hand-Painted Fine-line detailed work, watercolor blending, and blooming inks',
      'Modern High-Glass Glaze Tech: Chrome pigments, aurora powders, and flawless foil encapsulation',
      'Bridal Luxury Detailing: Crystal embedding, micro-pearl containment, and gold foil leaf layering',
      'Heavy glitter suspension and gemstone secure embedding techniques for 4+ weeks durability'
    ],
    inclusions: [
      'Advanced Nail Art Accessories Kit (Premium Liner Brushes, 3D Silicone tool, Palette plate, Chrome jars, Blooming Gels, High-Grade Charms)',
      'Lifetime Digital Library of Masterclass design references and catalogs',
      'Official Master-Class Specialty Certification of Artistry by Nails by Purvi',
      'Special list of top verified luxury suppliers in India for raw materials'
    ],
    image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=600&auto=format&fit=crop',
    badge: 'Elite Specialty Up-skill'
  }
];

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<CourseProps | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('nail-art-foundation');
  
  // Registration Form State
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [preferredBatch, setPreferredBatch] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTabData = COURSES_DATA.find(c => c.id === activeTab) || COURSES_DATA[0];

  const handleOpenBooking = (course: CourseProps) => {
    setSelectedCourse(course);
    setShowBookingModal(true);
  };

  const handleBookCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    
    setIsSubmitting(true);
    
    const formattedDateString = preferredBatch === 'instant' ? "Immediate / Next Available Batch" : preferredBatch;
    
    // Design matching Whatsapp message
    const whatsappText = `Hello Purvi! I would like to book a seat for the *${selectedCourse.title}* course.
    
📝 *Registration Details:*
• *Student Name:* ${studentName}
• *WhatsApp Number:* ${studentPhone}
• *Course Selected:* ${selectedCourse.title} (${selectedCourse.category})
• *Preferred Batch/Month:* ${formattedDateString}
• *Current Experience:* ${experienceLevel}

Please guide me with the seat availability and enrollment steps! Thank you.`;

    try {
      // Send register action to backend so owner is instantly notified via Email via our Resend setup
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: `COURSE INQUIRY: ${selectedCourse.title}`,
          date: formattedDateString,
          time: `Experience: ${experienceLevel}`,
          wantsReminder: true,
          phone: studentPhone,
          // Add extra student meta details inside the request
          name: studentName
        })
      });
    } catch (error) {
      console.warn('Backend notification failed, proceeding to WhatsApp directly', error);
    } finally {
      setIsSubmitting(false);
    }

    // Direct redirection link to Purvi's phone
    const url = `https://wa.me/918055262013?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank');
    
    // Clear forms and close
    setShowBookingModal(false);
    setStudentName('');
    setStudentPhone('');
    setPreferredBatch('');
    setExperienceLevel('Beginner');
  };

  return (
    <section id="courses" className="py-24 bg-gradient-to-b from-rose-50/20 via-white to-rose-50/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-600 bg-rose-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Nails by Purvi Academy
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-4 tracking-tight">
            Learn Premium Nail Art
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-rose-200 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 font-light text-base leading-relaxed">
            Professional classes for hobbyists wishing to paint their own nails perfectly at home, and intensive bootcamp courses designed to help you start your own successful salon business. Learn from master artist <strong className="font-medium text-gray-900">Purvi Ramani</strong>.
          </p>
        </div>

        {/* Tab Controls for Desktop / Mobile Selection list */}
        <div className="flex border-b border-rose-100 justify-center mb-12 overflow-x-auto scroller-hide gap-2 px-1 max-w-2xl mx-auto">
          {COURSES_DATA.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveTab(course.id)}
              className={`py-3 px-5 sm:px-6 text-xs sm:text-sm tracking-widest uppercase font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === course.id
                  ? 'border-rose-500 text-rose-600 font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-600Hover'
              }`}
            >
              {course.title.split(' ')[0]} {course.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>

        {/* Selected Course Presentation Card */}
        <div className="bg-white rounded-3xl border border-rose-100/50 shadow-xl shadow-rose-200/10 overflow-hidden transform transition duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Image Banner with dynamic category badge */}
            <div className="relative h-64 sm:h-96 lg:h-auto lg:col-span-5 min-h-[350px]">
              <img 
                src={selectedTabData.image} 
                alt={selectedTabData.title} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/25 to-transparent"></div>
              
              <div className="absolute top-6 left-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-white bg-rose-600/90 backdrop-blur-md px-4 py-2 rounded-full border border-rose-400/20">
                  {selectedTabData.badge}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-rose-300 font-sans text-xs uppercase tracking-widest font-semibold mb-1">
                  {selectedTabData.category}
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
                  {selectedTabData.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-light mt-1">
                  {selectedTabData.subtitle}
                </p>
              </div>
            </div>

            {/* In-depth details, curriculum and call to action booking */}
            <div className="p-6 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-between">
              <div>
                <blockquote className="text-gray-500 italic text-sm sm:text-base font-light border-l-4 border-rose-200 pl-4 mb-6">
                  "{selectedTabData.description}"
                </blockquote>

                {/* Course Metadata: Duration / Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-rose-50/30 border border-rose-100/50 rounded-2xl p-4 sm:p-5 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-100/50 rounded-xl text-rose-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Course Schedule</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-850">{selectedTabData.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-100/50 rounded-xl text-rose-600">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Registration Fee</p>
                      <p className="text-sm font-semibold text-rose-600">{selectedTabData.investment} <span className="text-[10px] font-normal text-gray-400 italic">(all inclusive)</span></p>
                    </div>
                  </div>
                </div>

                {/* Curriculum Modules */}
                <div className="mb-8">
                  <h4 className="text-sm uppercase tracking-widest font-semibold text-gray-900 flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-rose-500" />
                    Course Syllabus & Topics
                  </h4>
                  <ul className="space-y-3">
                    {selectedTabData.curriculum.map((topic, index) => (
                      <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 font-light">
                        <ChevronRight className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What is Included (Tooling kit / files) */}
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-semibold text-gray-900 flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-rose-500" />
                    Student Benefits & Takeaways
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {selectedTabData.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-gray-600 font-light">
                        <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to action booking */}
              <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-gray-400 font-light">Seats are highly limited (Max 5 per batch for 1-on-1 care)</p>
                  <p className="text-sm text-gray-800 font-sans font-medium mt-0.5">Booking verified instantly on WhatsApp</p>
                </div>
                <button
                  onClick={() => handleOpenBooking(selectedTabData)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide text-white bg-rose-600 rounded-full hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/20 active:scale-[0.98] transition-all cursor-pointer shadow-md"
                >
                  Book Course Online
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Benefits banner bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-rose-100/30 text-center">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-1">Elite 1-on-1 Attention</h4>
            <p className="text-zinc-500 text-xs font-light">Each class is restricted to small counts giving you immediate feedback on strokes and shapes.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-rose-100/30 text-center">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-1">Official Certification</h4>
            <p className="text-zinc-500 text-xs font-light">Earn structured credentials recognized across high-end salons in Nashik or support self-marketing.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-rose-100/30 text-center">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-1">Premium Toolkit</h4>
            <p className="text-zinc-500 text-xs font-light">Every professional student receives physical apparatus (E-files, brushes, monomer powders) to start practicing.</p>
          </div>
        </div>

      </div>

      {/* RENDER DYNAMIC COURSE BOOKING MODAL */}
      {showBookingModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowBookingModal(false)} 
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <GraduationCap className="w-12 h-12 text-rose-500 mx-auto mb-2" />
                <h3 className="text-2xl font-serif text-gray-900 mb-1">Course Registration</h3>
                <div className="w-12 h-0.5 bg-rose-200 mx-auto mb-3"></div>
                <p className="text-gray-500 font-light text-xs sm:text-sm">
                  Register for <strong className="text-rose-600 font-medium">{selectedCourse.title}</strong>
                </p>
                <div className="mt-2 text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-full inline-block font-medium">
                  Fee: {selectedCourse.investment} (Inclusive of Kit)
                </div>
              </div>
              
              <form onSubmit={handleBookCourseSubmit} className="space-y-4">
                
                {/* Student Full Name */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Full Name <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-300">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm text-gray-900 bg-rose-50/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">WhatsApp Phone Number <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 10-digit number"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm text-gray-900 bg-rose-50/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Preferred batch/month */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Preferred Start Batch <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-300">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      required
                      value={preferredBatch}
                      onChange={(e) => setPreferredBatch(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm text-gray-900 bg-rose-50/20 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Select upcoming batch slot</option>
                      <option value="June 2026 Batch">June 2026 Batch (Starting June 20)</option>
                      <option value="July 2026 Batch">July 2026 Batch (Starting July 10)</option>
                      <option value="August 2026 Batch">August 2026 Batch (Starting August 05)</option>
                      <option value="instant">First Available Date (Urgent Class)</option>
                    </select>
                  </div>
                </div>

                {/* Prior experiences level */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Your Current Experience <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-300">
                      <NotebookPen className="w-4 h-4" />
                    </div>
                    <select
                      required
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm text-gray-900 bg-rose-50/20 outline-none transition-all appearance-none"
                    >
                      <option value="Beginner">Beginner (No past experience, start from zero)</option>
                      <option value="Self Taught">Self-Taught (Practice on friends/self)</option>
                      <option value="Working Practitioner">Professional Technician (Upskilling existing career)</option>
                    </select>
                  </div>
                </div>

                {/* Disclaimer info alert */}
                <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-100 flex items-start gap-2 text-[11px] text-gray-500 font-light">
                  <Info className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Submission books your batch preference slot and opens WhatsApp. Purvi Ramani will message you to confirm physical seat allocation.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide text-white bg-rose-600 rounded-xl hover:bg-rose-700 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-rose-500/20 disabled:opacity-75"
                >
                  {isSubmitting ? 'Registering Slot...' : 'Confirm Class Booking'}
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
