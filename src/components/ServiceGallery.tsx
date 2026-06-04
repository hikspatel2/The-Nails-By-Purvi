import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, UploadCloud, Settings2, Play } from 'lucide-react';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  serviceCategory: string;
  createdAt: number;
}

const CATEGORIES = [
  "Dry Manicure",
  "Gel Polish",
  "Temporary Extensions",
  "Soft Gel Extensions",
  "Acrylic / Gel Extensions"
];

const DEFAULT_ITEMS: GalleryItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop', serviceCategory: 'Gel Polish', createdAt: Date.now() - 1000 },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop', serviceCategory: 'Dry Manicure', createdAt: Date.now() - 2000 },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1595123984381-8079ed3a5f70?q=80&w=600&auto=format&fit=crop', serviceCategory: 'Acrylic / Gel Extensions', createdAt: Date.now() - 3000 },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1516975080661-46bba20bcfdf?q=80&w=600&auto=format&fit=crop', serviceCategory: 'Dry Manicure', createdAt: Date.now() - 4000 },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop', serviceCategory: 'Gel Polish', createdAt: Date.now() - 5000 },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1496229156094-1b7cd2bf72dc?q=80&w=600&auto=format&fit=crop', serviceCategory: 'Soft Gel Extensions', createdAt: Date.now() - 6000 }
];

export function ServiceGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nails_saas_gallery');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems(DEFAULT_ITEMS);
      }
    } else {
      setItems(DEFAULT_ITEMS);
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (items.length > 0 || localStorage.getItem('nails_saas_gallery')) {
      localStorage.setItem('nails_saas_gallery', JSON.stringify(items));
    }
  }, [items]);

  const filteredItems = items.filter(item => activeTab === "All" || item.serviceCategory === activeTab).sort((a,b) => b.createdAt - a.createdAt);

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
          serviceCategory: uploadCategory,
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

  return (
    <section className="py-24 bg-rose-50/20 relative" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 relative">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Service Portfolio</h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Explore our artistic creations categorized by service. We pride ourselves on delivering picture-perfect results tailored to you.
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

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-6 py-2.5 rounded-full text-sm tracking-wide font-medium transition-all duration-300 ${
              activeTab === "All" 
              ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105" 
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wide font-medium transition-all duration-300 ${
                activeTab === cat 
                ? "bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-105" 
                : "bg-white text-gray-600 border border-gray-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry/Grid Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-6">
           {/* Admin Upload Card */}
           {isAdminMode && (
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

           {filteredItems.map(item => (
              <div key={item.id} className="group relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
                 {item.type === 'video' ? (
                   <>
                     <video src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay muted loop playsInline />
                     <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-full">
                         <Play className="w-4 h-4 text-white fill-white" />
                     </div>
                   </>
                 ) : (
                   <img src={item.url} alt={item.serviceCategory} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                 )}
                 
                 <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl pointer-events-none"></div>
                 
                 <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-left">
                    <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs tracking-wider uppercase font-medium border border-white/30 shadow-sm">
                      {item.serviceCategory}
                    </span>
                 </div>

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
           ))}
        </div>
        
        {filteredItems.length === 0 && !isAdminMode && (
            <div className="text-center py-20">
                <p className="text-gray-500 font-light text-lg">No media uploaded in this category yet.</p>
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
              <button onClick={() => { setIsModalOpen(false); setUploadFile(null); setPreviewUrl(null); }} className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Category Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Select Service Category</label>
                <div className="relative">
                    <select 
                        value={uploadCategory} 
                        onChange={e => setUploadCategory(e.target.value)}
                        className="w-full appearance-none border-2 border-gray-200 bg-gray-50 rounded-xl px-5 py-4 text-gray-900 focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium cursor-pointer"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
              </div>

              {/* Media Uploader */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Media File</label>
                <div className={`relative border-2 border-dashed ${previewUrl ? 'border-transparent' : 'border-gray-300'} rounded-2xl flex flex-col items-center justify-center hover:bg-gray-50 transition-colors bg-white overflow-hidden aspect-video cursor-pointer group`}>
                  {previewUrl ? (
                    uploadFile?.type.startsWith('video/') ? (
                      <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop />
                    ) : (
                      <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" />
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
                    className="w-full bg-gray-900 text-white rounded-full py-4 text-base font-medium tracking-wider hover:bg-rose-600 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-gray-900/10"
                  >
                    Publish to Gallery
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
