import React, { useState, useEffect } from 'react';
import { Star, X, Upload, CheckCircle2, MessageSquarePlus, Camera } from 'lucide-react';

const initialTestimonials = [
  {
    name: "Aarti Sharma",
    text: "Purvi is incredibly talented! She took her time and paid so much attention to detail. My gel extensions have never looked this natural and perfect.",
    rating: 5,
    role: "Regular Client",
    image: null
  },
  {
    name: "Sneha Patel",
    text: "I got a dry manicure for the first time, and I'm never going back to traditional water manicures. Purvi's salon is clean, relaxing, and her nail art skills are unmatched.",
    rating: 5,
    role: "First-time Visitor",
    image: null
  },
  {
    name: "Priya Singh",
    text: "The best nail studio in Nashik! She always understands exactly what design I want. My nails last for weeks without chipping.",
    rating: 5,
    role: "Loyal Client",
    image: null
  }
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1200);

    // Check if URL has ?action=review to automatically open the modal
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'review' || window.location.hash === '#review') {
      setIsModalOpen(true);
      // Clean up the URL (optional but nice)
      window.history.replaceState({}, '', window.location.pathname);
      
      // Scroll into view if needed
      setTimeout(() => {
        document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    
    return () => clearTimeout(timer);
  }, []);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      name,
      text: description,
      rating,
      role: "Client",
      image: previewImage
    };
    
    setTestimonials([newReview, ...testimonials]);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
      setName("");
      setDescription("");
      setRating(5);
      setPreviewImage(null);
    }, 2000);
  };

  return (
    <section className="py-24 bg-rose-50/50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Client Love</h2>
          <div className="w-20 h-1 bg-rose-200 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Real experiences from our beautiful clients at The Nails by Purvi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {isDataLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`testimonial-skeleton-${index}`} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100/50 relative flex flex-col justify-between min-h-[280px] animate-pulse">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-rose-100/60 rounded-full" />
                    ))}
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="h-3.5 bg-gray-100 rounded w-full" />
                    <div className="h-3.5 bg-gray-100 rounded w-5/6" />
                    <div className="h-3.5 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 bg-rose-50/80 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-grow">
                    <div className="h-3.5 bg-gray-200/85 rounded w-24" />
                    <div className="h-2.5 bg-rose-100/50 rounded w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100/50 relative flex flex-col">
                <div className="flex text-rose-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current text-rose-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-600 font-light italic mb-6 leading-relaxed flex-grow">
                  "{testimonial.text}"
                </p>
                
                {testimonial.image && (
                  <div className="mb-6 rounded-xl overflow-hidden h-32 w-full object-cover">
                    <img src={testimonial.image} alt="Client result" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-rose-500">{testimonial.role}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white border border-rose-200 text-rose-600 px-8 py-4 rounded-full font-medium hover:bg-rose-50 transition-colors shadow-sm cursor-pointer"
          >
            <MessageSquarePlus className="w-5 h-5" />
            Write a Review
          </button>
        </div>

        {/* Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 relative my-8">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-500">Your review means a lot to us.</p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-serif text-gray-900 mb-2">Share Your Experience</h3>
                      <p className="text-gray-500 font-light text-sm">We'd love to hear about your visit to The Nails by Purvi.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2 font-medium">Your Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-3 border border-rose-100/50 rounded-xl focus:ring-rose-500 focus:border-rose-500 sm:text-sm text-gray-900 bg-rose-50/30 outline-none transition-colors"
                          placeholder="e.g. Priya Sharma"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2 font-medium">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRating(star)}
                              className="focus:outline-none cursor-pointer p-1"
                            >
                              <Star 
                                className={`w-8 h-8 ${star <= rating ? 'fill-current text-rose-500' : 'text-gray-200'}`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2 font-medium">Your Review</label>
                        <textarea
                          required
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="block w-full px-4 py-3 border border-rose-100/50 rounded-xl focus:ring-rose-500 focus:border-rose-500 sm:text-sm text-gray-900 bg-rose-50/30 outline-none transition-colors resize-none"
                          placeholder="Tell us about your experience..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2 font-medium">Add Photo (Optional)</label>
                        <div className="mt-1 flex flex-col items-center justify-center border-2 border-rose-100/50 border-dashed rounded-xl bg-rose-50/30 overflow-hidden group relative min-h-[200px]">
                          {previewImage ? (
                            <div className="absolute inset-0">
                              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <label className="text-white text-sm font-medium cursor-pointer p-4 rounded-md">
                                  Click to change
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                  />
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4 text-center w-full p-6">
                              <div className="flex justify-center gap-4">
                                <label className="flex flex-col items-center justify-center w-28 h-28 border border-rose-200 rounded-xl bg-white hover:bg-rose-50 transition-colors cursor-pointer text-gray-600 shadow-sm">
                                  <Upload className="w-6 h-6 text-rose-400 mb-2" />
                                  <span className="text-sm font-medium">Upload File</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                  />
                                </label>
                                
                                <label className="flex flex-col items-center justify-center w-28 h-28 border border-rose-200 rounded-xl bg-white hover:bg-rose-50 transition-colors cursor-pointer text-gray-600 shadow-sm">
                                  <Camera className="w-6 h-6 text-rose-400 mb-2" />
                                  <span className="text-sm font-medium">Take Photo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    className="hidden"
                                    onChange={handleImageChange}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-colors mt-6 cursor-pointer"
                      >
                        Submit Review
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
