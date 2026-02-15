import React, { useState, useEffect } from 'react';

interface PasswordGateProps {
  onAuthorized: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onAuthorized }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'photo') {
      onAuthorized();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#91d290] text-black font-sans flex flex-col">
       {/* Top Navigation Bar */}
      <nav className="w-full px-6 py-6 flex justify-between items-center border-b-4 border-black">
        <div className="flex items-center gap-3">
            <span className="font-black text-2xl tracking-tighter uppercase">VISIBLE GENIUS</span>
        </div>
        <div className="flex items-center gap-3">
             <div className="bg-black border-2 border-black px-3 py-1 text-[10px] font-semibold tracking-widest text-[#91d290] rounded-md">LOCKED</div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
            <div className="text-center mb-12">
                <h1 className="font-semibold text-5xl md:text-6xl uppercase tracking-tight text-black mb-4">
                    Restricted<br/>Access
                </h1>
                <p className="font-normal text-black border-b-4 border-black inline-block pb-1 text-sm tracking-[0.2em] uppercase">
                    Please Enter Passphrase
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6 relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ENTER PASSPHRASE"
                        className={`
                            w-full bg-white border-4 border-black px-6 py-5
                            text-center font-normal text-lg tracking-widest text-black placeholder:text-black/40
                            outline-none transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-lg
                            ${error ? 'border-red-600 text-red-600' : ''}
                        `}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-5 bg-[#2E5339] text-white font-semibold text-xl uppercase tracking-wider hover:bg-white hover:text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-lg"
                >
                    Unlock System
                </button>
            </form>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="w-full px-6 py-6">
         <div className="flex justify-between items-center w-full pt-6 border-t-2 border-black/10">
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">BETA v0.6</span>
            <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">DESIGNED BY RON RADOM</span>
         </div>
      </div>
    </div>
  );
};
