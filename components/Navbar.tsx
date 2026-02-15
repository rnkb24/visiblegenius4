import React from 'react';

interface NavbarProps {
  onCloseSession: () => void;
  themeColor: string;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onCloseSession, themeColor, className = '' }) => {
  return (
    <nav className={`w-full px-6 py-6 flex justify-between items-center border-b-4 border-black ${className}`}>
      <div className="flex items-center gap-3">
        <span className="font-black text-2xl tracking-tighter text-black uppercase">VISIBLE GENIUS</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCloseSession}
          className="bg-black border-2 border-black px-4 py-2 text-xs font-semibold tracking-widest hover:bg-transparent hover:text-black transition-colors uppercase rounded-md"
          style={{ color: themeColor }}
        >
           Close Session
        </button>
      </div>
    </nav>
  );
};
