import React from 'react';

interface SynthwaveSunProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const SynthwaveSun: React.FC<SynthwaveSunProps> = ({
  className = '',
  size = 180,
  glow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(255,42,133,0.55) 0%, rgba(255,123,0,0.3) 40%, rgba(157,78,221,0) 70%)',
            filter: 'blur(28px)',
            transform: 'scale(1.35)',
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_20px_rgba(255,42,133,0.6)]"
      >
        <defs>
          <linearGradient id="synthwaveSunsetGrad" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe600" />
            <stop offset="35%" stopColor="#ff7b00" />
            <stop offset="70%" stopColor="#ff2a85" />
            <stop offset="100%" stopColor="#9d4edd" />
          </linearGradient>

          <mask id="sunStripesMask">
            {/* Base white circle */}
            <circle cx="100" cy="100" r="90" fill="white" />
            {/* Horizontal black cutout stripes from middle to bottom with increasing thickness */}
            <rect x="0" y="98" width="200" height="2" fill="black" />
            <rect x="0" y="108" width="200" height="3" fill="black" />
            <rect x="0" y="120" width="200" height="4.5" fill="black" />
            <rect x="0" y="134" width="200" height="6" fill="black" />
            <rect x="0" y="150" width="200" height="8" fill="black" />
            <rect x="0" y="168" width="200" height="10" fill="black" />
            <rect x="0" y="188" width="200" height="14" fill="black" />
          </mask>

          <filter id="sunInnerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main Sun with Masked Striped Cutouts */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="url(#synthwaveSunsetGrad)"
          mask="url(#sunStripesMask)"
        />

        {/* Subtle rim highlight on top half */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
