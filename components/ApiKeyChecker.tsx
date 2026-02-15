import React, { useEffect, useState, useCallback } from 'react';

interface ApiKeyCheckerProps {
  onReady: () => void;
}

export const ApiKeyChecker: React.FC<ApiKeyCheckerProps> = ({ onReady }) => {
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkKey = useCallback(async () => {
    try {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        if (selected) {
          setHasKey(true);
          onReady();
        } else {
          setHasKey(false);
        }
      } else {
        if (process.env.API_KEY) {
            setHasKey(true);
            onReady();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [onReady]);

  useEffect(() => {
    checkKey();
  }, [checkKey]);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
      onReady();
    }
  };

  if (loading || hasKey) return null;

  return (
    <div className="max-w-md w-full mx-auto text-center bg-[#121212] rounded-lg p-10 shadow-xl border border-[#FF5D38]/20 font-sans">
      <div className="w-20 h-20 bg-[#050505] rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-[#FF5D38]">
        🔑
      </div>
      <h2 className="font-semibold text-[#5474F4] text-4xl mb-4 uppercase tracking-tight">API Key Needed</h2>
      <p className="font-normal text-[#FF5D38] text-lg mb-8 leading-snug">
        To start creating, please connect your Google Cloud Project API key.
      </p>
      
      <button
        onClick={handleSelectKey}
        className="w-full py-4 bg-[#5474F4] text-white font-semibold text-xl uppercase tracking-wide rounded-lg hover:bg-[#3D5CE0] hover:shadow-lg transition-all"
      >
        Connect Key
      </button>
      
      <div className="mt-8">
        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-sm font-normal text-[#FF5D38]/60 hover:text-[#FF5D38] underline">
          Read Documentation
        </a>
      </div>
    </div>
  );
};