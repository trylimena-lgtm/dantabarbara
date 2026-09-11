import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0a0712]">
      {/* Retrowave Perspective Grid at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[320px] opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 42, 133, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 123, 0, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          transform: 'perspective(500px) rotateX(65deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
        }}
      />

      {/* Top Left Neon Pink/Purple Orb */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, #ff2a85 0%, #9d4edd 50%, transparent 70%)',
          filter: 'blur(120px)',
          animationDuration: '8s',
        }}
      />

      {/* Center Sunset Orange/Yellow Orb */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #ff7b00 0%, #ff2a85 45%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Bottom Right Electric Violet Orb */}
      <div
        className="absolute -bottom-24 -right-24 w-[550px] h-[550px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, #9d4edd 0%, #ff2a85 40%, transparent 75%)',
          filter: 'blur(130px)',
        }}
      />

      {/* Subtle Star Dust Texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Horizon glow line */}
      <div
        className="absolute bottom-[160px] left-0 right-0 h-[1px] opacity-40"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #ff2a85 30%, #ffe600 50%, #ff2a85 70%, transparent 100%)',
          boxShadow: '0 0 15px #ff2a85',
        }}
      />
    </div>
  );
};
