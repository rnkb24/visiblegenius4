import React, { useState, useCallback, useRef } from 'react';
import { ApiKeyChecker } from './components/ApiKeyChecker';
import { ImageUploader } from './components/ImageUploader';
import { PasswordGate } from './components/PasswordGate';
import { ProcessingView } from './components/ProcessingView';
import { ResultsView } from './components/ResultsView';
import { generateTransmutedImage } from './services/geminiService';
import { AppStatus, GeneratedImage, StylePreset } from './types';
import { STYLE_PRESETS } from './constants';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [images, setImages] = useState<GeneratedImage | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [detectedRatio, setDetectedRatio] = useState<string>("1:1");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(STYLE_PRESETS[0]);

  const cleanBase64 = (dataUrl: string) => {
    return dataUrl.split(',')[1] || dataUrl;
  };

  const detectAspectRatio = (base64: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (ratio > 1.5) resolve("16:9");
        else if (ratio > 1.1) resolve("4:3");
        else if (ratio < 0.6) resolve("9:16");
        else if (ratio < 0.9) resolve("3:4");
        else resolve("1:1");
      };
      img.onerror = (error) => reject(error);
      img.src = base64;
    });
  };

  const processImage = useCallback(async (base64Input: string, ratio: string) => {
    setStatus(AppStatus.PROCESSING);
    setErrorMsg(null);
    setImages(null);

    try {
      const cleanInput = cleanBase64(base64Input);
      const processedImage = await generateTransmutedImage(cleanInput, selectedStyle.prompt, ratio);

      setImages({
        original: base64Input,
        processed: processedImage,
      });
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      
      // Handle 'Requested entity was not found' error by prompting for key selection again
      if (err.message && err.message.includes("Requested entity was not found")) {
        setStatus(AppStatus.IDLE);
        if (window.aistudio && window.aistudio.openSelectKey) {
            await window.aistudio.openSelectKey();
        }
        return;
      }

      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "Transformation interrupted.");
    }
  }, [selectedStyle]);

  const handleImageSelect = useCallback(async (base64: string) => {
    setPreviewImage(base64);
    try {
      const ratio = await detectAspectRatio(base64);
      setDetectedRatio(ratio);
    } catch (error) {
      console.error("Failed to detect aspect ratio:", error);
      setDetectedRatio("1:1");
    }
    if (status === AppStatus.SUCCESS || status === AppStatus.ERROR) {
        setStatus(AppStatus.IDLE);
        setImages(null);
    }
  }, [status]);

  const handleStartProcessing = () => {
    if (previewImage) {
        processImage(previewImage, detectedRatio);
    }
  };

  const handleDownload = useCallback(() => {
    if (!images?.processed) return;
    const link = document.createElement('a');
    link.download = `visible-genius-${selectedStyle.id}-${Date.now()}.png`;
    link.href = images.processed;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [images, selectedStyle]);

  const handleLogout = () => {
    setIsAuthorized(false);
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setImages(null);
    setPreviewImage(null);
    setErrorMsg(null);
  };

  if (!isAuthorized) {
    return <PasswordGate onAuthorized={() => setIsAuthorized(true)} />;
  }

  if (!apiKeyReady) {
    return (
      <div className="min-h-screen bg-[#91d290] flex items-center justify-center p-8">
        <ApiKeyChecker onReady={() => setApiKeyReady(true)} />
      </div>
    );
  }

  // --- VIEW STATE: SUCCESS (RESULTS) ---
  if (status === AppStatus.SUCCESS && images) {
    return (
        <ResultsView 
            images={images} 
            style={selectedStyle} 
            onDownload={handleDownload} 
            onReset={handleReset} 
        />
    );
  }

  // --- VIEW STATE: DASHBOARD (IDLE / ERROR / PROCESSING) ---
  return (
    <div className="min-h-screen w-full bg-[#91d290] text-black font-sans flex flex-col animate-fade-in relative">
      
       {/* Processing Overlay */}
       {status === AppStatus.PROCESSING && (
         <ProcessingView protocol={selectedStyle.label} ratio={detectedRatio} />
       )}

       {/* Top Navigation Bar - Solid Green to stay above background */}
      <nav className="w-full px-6 py-6 flex justify-between items-center border-b-4 border-black bg-[#91d290] z-20 relative">
        <div className="flex items-center gap-3">
            <span className="font-black text-2xl tracking-tighter text-black uppercase">VISIBLE GENIUS</span>
        </div>
        <div className="flex items-center gap-4">
             <button 
                onClick={handleLogout}
                className="bg-black border-2 border-black px-4 py-2 text-xs font-semibold tracking-widest text-[#91d290] hover:bg-[#91d290] hover:text-black transition-colors uppercase rounded-md"
             >
                Close Session
             </button>
        </div>
      </nav>

      {/* Main Content Area - Solid Green Background */}
      <div className="flex-1 w-full flex flex-col relative">
        <div className="flex-1 max-w-6xl mx-auto w-full p-6 lg:p-12 flex flex-col z-10">
            
            {/* Header - Centered Layout matching reference */}
            <div className="mb-6 w-full flex flex-col items-center justify-center text-center">
                <h1 className="font-black text-[6.2vw] xl:text-[4.5rem] uppercase tracking-tight leading-[0.85] mb-3 text-black whitespace-nowrap max-w-full">
                    FORM FOLLOWS FUNCTION
                </h1>
                <p className="font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-black bg-[#91d290] px-2 py-1 shadow-sm">
                    UPLOAD PHOTO AND SELECT STYLE
                </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12">
                
                {/* Styles Area: Order 2 on Mobile, Left Column on Desktop */}
                <div className="order-2 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-1 h-full">
                    <div className="bg-[#91d290] text-black p-6 rounded-lg border-4 border-black h-full flex flex-col">
                        <h3 className="font-black text-2xl uppercase mb-4 border-b-2 border-black pb-2">Select Style</h3>
                        <div className="flex flex-col gap-0 overflow-y-auto pr-2 custom-scrollbar flex-1">
                            {STYLE_PRESETS.map((style, index) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style)}
                                    className={`
                                        flex flex-col items-start text-left px-4 py-4 border-b-2 last:border-b-0 border-black/10 transition-colors rounded-lg
                                        ${selectedStyle.id === style.id 
                                            ? 'bg-[#2E5339] text-white' 
                                            : 'hover:bg-black/5 text-black'}
                                    `}
                                >
                                    <span className="font-bold text-sm uppercase block mb-1 tracking-wide">{index + 1}. {style.label}</span>
                                    <span className={`text-[10px] leading-tight block font-medium uppercase ${selectedStyle.id === style.id ? 'opacity-100' : 'opacity-90'}`}>
                                        {style.description}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side Wrapper: Contents on Mobile (to split items), Flex col on Desktop (to group items) */}
                <div className="contents lg:flex lg:flex-col lg:gap-6 lg:col-span-7 lg:col-start-6 lg:row-start-1">
                    
                    {/* Upload Area: Order 1 on Mobile */}
                    <div className="order-1 lg:order-none w-full">
                        <ImageUploader 
                            onImageSelected={handleImageSelect} 
                            isLoading={status === AppStatus.PROCESSING}
                            currentImage={previewImage}
                            detectedRatio={detectedRatio}
                        />
                    </div>

                    {/* Action Area: Order 3 on Mobile */}
                    <div className="order-3 lg:order-none flex flex-col gap-4">
                        <button
                            onClick={handleStartProcessing}
                            disabled={!previewImage || status === AppStatus.PROCESSING}
                            className="w-full py-4 bg-[#2E5339] text-white font-semibold text-lg uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:cursor-not-allowed border-4 border-black shadow-none rounded-lg"
                        >
                            {status === AppStatus.PROCESSING ? 'Processing...' : 'Generate Image'}
                        </button>

                        {errorMsg && (
                            <div className="border-4 border-black bg-white p-4 font-normal text-red-600 text-center uppercase rounded-lg">
                                Error: {errorMsg}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Footer Section - Solid Green to stay above background */}
      <div className="w-full bg-[#91d290] border-t-2 border-black/10 z-20 relative">
        <div className="max-w-6xl mx-auto px-6 py-6 lg:px-12 flex justify-between items-center w-full">
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">BETA v0.6</span>
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">DESIGNED BY RON RADOM</span>
        </div>
      </div>

    </div>
  );
};

export default App;