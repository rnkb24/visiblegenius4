import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  isLoading: boolean;
  currentImage: string | null;
  detectedRatio?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isLoading, currentImage, detectedRatio }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelected(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isLoading) handleFiles(e.target.files);
  };

  return (
    <div 
      onClick={() => !isLoading && inputRef.current?.click()}
      className={`
        w-full
        ${currentImage ? '' : 'aspect-[8/3] md:aspect-[32/9]'}
        bg-[#91d290]
        border-4 border-black
        transition-all duration-300
        group cursor-pointer
        relative flex flex-col items-center justify-center overflow-hidden
        rounded-lg
        ${isLoading ? 'opacity-50 pointer-events-none' : 'hover:bg-[#a3e0a2]'}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={isLoading}
      />

      {currentImage ? (
        <div className="w-full relative">
             <img 
               src={currentImage} 
               alt="Preview" 
               className="w-full h-auto block" 
             />
             {detectedRatio && (
                <div className="absolute bottom-4 right-4 z-10">
                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                        Ratio: {detectedRatio}
                    </span>
                </div>
             )}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                 <div className="bg-black text-white px-4 py-2 font-semibold uppercase text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all rounded-md">
                    Replace Image
                 </div>
             </div>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center justify-center h-full p-8">
           <h3 className="font-bold text-xl text-black mb-1 uppercase tracking-tight">Upload</h3>
           <p className="font-semibold text-[10px] text-black/60 uppercase tracking-wider">JPG or PNG / Max 5MB</p>
        </div>
      )}
    </div>
  );
};