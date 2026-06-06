import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, X, UploadCloud, Settings2, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  createdAt: number;
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 1000 },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 2000 },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 3000 },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1516975080661-46bba20bcfdf?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 4000 },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 5000 },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1610992015732-2449b76344ca?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 6000 },
  { id: '7', type: 'image', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop', createdAt: Date.now() - 7000 }
];

export function ServiceGallery({ isFullPage = false }: { isFullPage?: boolean }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // Intersection Observer state and ref for optimized image loading
  const [isNear, setIsNear] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // Pre-triggers image load when user is within 400px of the gallery section
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nails_saas_gallery_v2');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems(DEFAULT_ITEMS);
      }
    } else {
      // Try to load old v1 data, otherwise default
      const oldSaved = localStorage.getItem('nails_saas_gallery');
      if (oldSaved) {
        try {
          const oldItems = JSON.parse(oldSaved);
          setItems(oldItems);
        } catch (e) {
          setItems(DEFAULT_ITEMS);
        }
      } else {
        setItems(DEFAULT_ITEMS);
      }
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (items.length > 0 || localStorage.getItem('nails_saas_gallery_v2')) {
      localStorage.setItem('nails_saas_gallery_v2', JSON.stringify(items));
    }
  }, [items]);

  const filteredItems = items.sort((a,b) => b.createdAt - a.createdAt);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const saveItem = (url: string, type: 'image' | 'video') => {
      const newItem: GalleryItem = {
          id: Math.random().toString(36).substring(2, 9),
          type,
          url,
          createdAt: Date.now()
      };
      setItems(prev => [newItem, ...prev]);
      setIsModalOpen(false);
      setUploadFile(null);
      setPreviewUrl(null);
  };

  const handleUpload = () => {
    if (!uploadFile) return;
    
    const isVideo = uploadFile.type.startsWith('video/');
    
    if (isVideo) {
        const reader = new FileReader();
        reader.onloadend = () => {
            try {
                saveItem(reader.result as string, 'video');
            } catch(e) {
                console.error("Storage Issue: Video file is too large for browser local storage.");
            }
        };
        reader.readAsDataURL(uploadFile);
    } else {
        // Compress image to avoid local storage quota limits
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            
            try {
               const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
               saveItem(dataUrl, 'image');
            } catch(e) {
               console.error("Storage limit reached.");
            }
        };
        img.src = URL.createObjectURL(uploadFile);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex(prev => prev !== null ? (prev > 0 ? prev - 1 : filteredItems.length - 1) : null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex(prev => prev !== null ? (prev < filteredItems.length - 1 ? prev + 1 : 0) : null);
  };

  return (
    <section className="py-24 bg-rose-50/20 relative" id="gallery" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 relative">
          {isFullPage && (
            <a 
              href="#gallery" 
              className="inline-flex items-center gap-2 text-rose-600 font-medium hover:text-rose-700 transition-colors mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Home
            </a>
          )}
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            {isFullPage ? "Full Service Portfolio" : "Service Portfolio"}
          </h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Explore our artistic creations. We pride ourselves on delivering picture-perfect results tailored to you.
          </p>
          
          <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`absolute top-0 right-0 p-3 rounded-full transition-all duration-300 ${isAdminMode ? 'bg-rose-100 text-rose-600 shadow-inner' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'} cursor-pointer z-10 flex items-center justify-center gap-2 group`}
            title="Toggle SaaS Admin Mode"
          >
            <Settings2 className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
            {isAdminMode && <span className="text-xs font-semibold pr-2 tracking-wider uppercase">Admin Mode</span>}
          </button>
        </div>

        {/* Masonry/Grid Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-6">
           {/* Admin Upload Card */}
           {isAdminMode && !isDataLoading && (
             <div 
               onClick={() => setIsModalOpen(true)}
               className="aspect-[4/5] bg-white border-2 border-dashed border-rose-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1"
             >
               <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                 <Plus className="w-6 h-6 text-rose-600" />
               </div>
               <span className="text-sm font-medium text-gray-800 tracking-wide">Add Media</span>
               <span className="text-xs text-gray-400 mt-1">Photo or Video</span>
             </div>
           )}

           {isDataLoading ? (
             Array.from({ length: isFullPage ? 8 : 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="aspect-[4/5] bg-rose-50/10 border border-rose-100/20 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-100/20 via-rose-50/5 via-transparent to-transparent" />
                  <div className="h-6 w-24 bg-rose-100/40 rounded-full mb-3 z-10" />
                </div>
             ))
           ) : (
             (isFullPage ? filteredItems : filteredItems.slice(0, 6)).map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                   {!isNear ? (
                      <div className="absolute inset-0 bg-rose-100/30 animate-pulse flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-200/60 animate-ping" />
                      </div>
                    ) : item.type === 'video' ? (
                     <>
                       <video src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay muted loop playsInline />
                       <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-full">
                           <Play className="w-4 h-4 text-white fill-white" />
                       </div>
                     </>
                   ) : (
                     <img src={item.url} alt="Portfolio Item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
                   )}
                   
                   <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl pointer-events-none"></div>

                   {isAdminMode && (
                     <button 
                       onClick={(e) => handleDelete(item.id, e)}
                       className="absolute top-4 right-4 w-9 h-9 bg-white/90 text-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-red-500 hover:text-white transition-all duration-200 z-10"
                       title="Delete Image"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                </div>
             ))
           )}
        </div>
        
        {!isFullPage && filteredItems.length > 6 && !isDataLoading && (
          <div className="mt-12 text-center">
            <a 
              href="#portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium tracking-wide text-white bg-gray-900 rounded-full hover:bg-rose-600 transition-colors shadow-xl shadow-gray-900/10 cursor-pointer"
            >
              View All Photos
            </a>
          </div>
        )}

        {filteredItems.length === 0 && !isAdminMode && !isDataLoading && (
            <div className="text-center py-20">
                <p className="text-gray-500 font-light text-lg">No media uploaded yet.</p>
            </div>
        )}
      </div>

      {/* SaaS Admin Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-serif text-gray-900">Add to Gallery</h3>
                <p className="text-sm text-gray-500 mt-1">Upload a photo or video to showcase your work.</p>
              </div>
              <button onClick={() => { setIsModalOpen(false); setUploadFile(null); setPreviewUrl(null); }} className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Media Uploader */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Media File</label>
                <div className={`relative border-2 border-dashed ${previewUrl ? 'border-transparent' : 'border-gray-300'} rounded-2xl flex flex-col items-center justify-center hover:bg-gray-50 transition-colors bg-white overflow-hidden aspect-video cursor-pointer group`}>
                  {previewUrl ? (
                    uploadFile?.type.startsWith('video/') ? (
                      <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop />
                    ) : (
                      <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                    )
                  ) : (
                    <div className="relative z-10 flex flex-col items-center pointer-events-none text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8 text-rose-500" />
                        </div>
                        <p className="text-base font-medium text-gray-900">Click to browse or drag & drop</p>
                        <p className="text-sm text-gray-500 mt-2 font-light">Supports JPEG, PNG, MP4</p>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                  />

                  {previewUrl && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-40 pointer-events-none">
                          <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium">Click to Change</span>
                      </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                  <button 
                    onClick={handleUpload}
                    disabled={!uploadFile}
                    className="w-full cursor-pointer bg-gray-900 text-white rounded-full py-4 text-base font-medium tracking-wider hover:bg-rose-600 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-gray-900/10"
                  >
                    Publish to Gallery
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 cursor-pointer z-[120]"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4">
            <button 
              onClick={handlePrevious}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-[120]"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {filteredItems[lightboxIndex].type === 'video' ? (
                <video 
                  src={filteredItems[lightboxIndex].url} 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg" 
                  controls 
                  autoPlay 
                  playsInline 
                />
              ) : (
                <img 
                  src={filteredItems[lightboxIndex].url} 
                  alt="Gallery Lightbox" 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg" 
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-[120]"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-6 left-0 w-full text-center text-white/50 text-sm pointer-events-none">
              {lightboxIndex + 1} of {filteredItems.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
