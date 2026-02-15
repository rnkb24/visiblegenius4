import React from 'react';

interface ProcessingViewProps {
  protocol: string;
  ratio: string;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ protocol, ratio }) => {
  return (
    // Changed background color to #FF751F
    <div className="fixed inset-0 z-50 bg-[#FF751F] flex flex-col items-center justify-between text-black font-sans animate-fade-in p-6">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full">
          {/* Loading Animation */}
          <div className="mb-12 relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 border-8 border-black opacity-20 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>

          <h2 className="font-semibold text-[10vw] md:text-8xl tracking-widest mb-8 text-center px-4 uppercase leading-none">
            Creating
          </h2>

          <div className="flex flex-col gap-6 items-center w-full max-w-md px-6">
            <div className="w-full border-t-4 border-b-4 border-black py-6 text-center rounded-lg">
                <span className="font-normal text-sm tracking-widest uppercase block mb-2 opacity-60">Applying Style</span>
                <span className="font-semibold text-3xl uppercase block leading-none">{protocol}</span>
            </div>
          </div>
      </div>

       {/* Footer Section */}
      <div className="w-full max-w-6xl mx-auto">
          <div className="flex justify-between items-center w-full pt-6 border-t-2 border-black/10">
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">BETA v0.6</span>
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">DESIGNED BY RON RADOM</span>
          </div>
      </div>
    </div>
  );
};