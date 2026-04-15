import React from 'react';
import logo from '../assets/logo.jpeg';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]">
      {/* Particle Background for Loading Screen */}
      <div className="particles-bg"></div>
      
      <div className="relative">
        {/* Animated outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[ping_3s_infinite]"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin duration-1000"></div>
        
        {/* Logo Container */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/50 glow-box p-1 bg-[#0f172a]">
          <img 
            src={logo} 
            alt="Bot Logo" 
            className="w-full h-full object-cover rounded-full animate-pulse"
          />
        </div>
      </div>

      {/* Text and Progress */}
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white glow-text mb-4">
          VOXA <span className="text-primary">SYSTEM</span>
        </h2>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-shimmer w-full"></div>
        </div>
        
        <p className="mt-4 text-white/50 text-sm font-medium tracking-[0.2em] uppercase">
          Initializing...
        </p>
      </div>
    </div>
  );
};

export default Loading;
