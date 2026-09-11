import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-md w-full px-4 animate-in slide-in-from-top duration-300">
      <div
        id="app-toast-notification"
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-[#00ff88]/40 shadow-[0_10px_30px_rgba(0,255,136,0.3)] text-white"
        style={{
          background: 'rgba(15, 10, 26, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold font-['Space_Grotesk'] text-white">
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-[11px] text-[#a7a2bd] font-mono mt-0.5">
                {toast.description}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-[#a7a2bd] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
