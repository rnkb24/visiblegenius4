import { Navbar } from './Navbar';
import React, { useRef } from 'react';
import { GeneratedImage, StylePreset } from '../types';

interface ResultsViewProps {
  images: GeneratedImage;
  style: StylePreset;
  onDownload: () => void;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ images, style, onDownload, onReset }) => {
  return (
    // Updated background color to #FF934F
    <div className="min-h-screen w-full bg-[#FF934F] text-black font-sans flex flex-col animate-fade-in">
       {/* Top Navigation Bar */}
      <Navbar onCloseSession={onReset} themeColor="#FF934F" />

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-6 lg:p-12">
         {/* Header Section: Left aligned on mobile, Bottom aligned on desktop */}
         {/* Changed breakpoint from md to lg to prevent button overlap on intermediate screens */}
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
            <div className="w-full">
                <h1 className="font-black text-[8vw] md:text-6xl uppercase tracking-tighter text-black mb-2 leading-[0.9] whitespace-nowrap">
                    Output Generated
                </h1>
                <div className="flex items-center gap-2 mt-4">
                     {/* Updated label text color to match background */}
                     <span className="bg-black text-[#FF934F] text-xs font-semibold px-3 py-1 uppercase tracking-widest rounded-sm">Complete</span>
                     <span className="text-black font-medium font-mono text-xs uppercase">// {style.label}</span>
                </div>
            </div>
            
            {/* Adjusted container to wrap properly if needed, although lg:flex-row handles most cases */}
            <div className="flex gap-4 w-full lg:w-auto mt-4 lg:mt-0 lg:mr-4">
                 <button onClick={onReset} className="flex-1 lg:flex-none px-6 py-4 border-4 border-black hover:bg-black hover:text-[#FF934F] text-xs font-semibold uppercase tracking-widest transition-colors bg-transparent rounded-lg">
                    Create New Image
                 </button>
                 <button onClick={onDownload} className="flex-1 lg:flex-none px-8 py-4 bg-[#91d290] text-black border-4 border-black hover:bg-black hover:text-[#91d290] text-xs font-semibold uppercase tracking-widest transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] rounded-lg">
                    Download Asset
                 </button>
            </div>
        </div>

        {/* Image Container */}
        <div className="w-full flex items-center justify-center mb-12">
            <div className="relative inline-block border-4 border-black bg-white p-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-lg">
                <img 
                    src={images.processed} 
                    alt="Result" 
                    className="max-h-[65vh] w-auto block max-w-full rounded" 
                />
                <div className="absolute top-6 left-6">
                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-white rounded-md">
                        GEMINI-3-PRO // 1K
                    </div>
                </div>
            </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-4 border-black pt-6 pb-8">
            <div className="flex gap-4 items-start">
                 <div className="w-40 h-40 border-4 border-black shrink-0 bg-white overflow-hidden rounded-lg">
                     <img src={images.original} alt="Original" className="w-full h-full object-cover grayscale opacity-100" />
                 </div>
                 <div className="py-2">
                    <h3 className="font-semibold text-lg text-black uppercase tracking-widest mb-1">Status Report</h3>
                    <p className="font-normal text-sm text-black/70 uppercase leading-relaxed max-w-[280px]">
                        Session active.<br/>
                        Transmutation successful.
                    </p>
                 </div>
            </div>
         </div>

         {/* Footer Section */}
         <div className="flex justify-between items-center w-full mt-auto pt-6 border-t-2 border-black/10">
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">BETA v0.6</span>
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">DESIGNED BY RON RADOM</span>
         </div>
      </div>
    </div>
  );
};