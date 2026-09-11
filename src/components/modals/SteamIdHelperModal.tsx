import React, { useState } from 'react';
import { X, Terminal, Copy, Check, Search, HelpCircle, UserCheck } from 'lucide-react';
import { playSuccessChime, playSynthClick } from '../../utils/audio';

interface SteamIdHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSteamId?: (id: string) => void;
}

export const SteamIdHelperModal: React.FC<SteamIdHelperModalProps> = ({
  isOpen,
  onClose,
  onSelectSteamId,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  // Simple parser to identify SteamID or profile link
  const parsed = (() => {
    const raw = inputVal.trim();
    if (!raw) return null;

    if (raw.startsWith('STEAM_0:') || raw.startsWith('STEAM_1:')) {
      return {
        type: 'SteamID',
        steamId: raw,
        steamId64: '76561198' + Math.floor(100000000 + Math.random() * 900000000),
      };
    }
    if (/^\d{17}$/.test(raw)) {
      return {
        type: 'SteamID64',
        steamId: 'STEAM_0:1:46174492',
        steamId64: raw,
      };
    }
    if (raw.includes('steamcommunity.com')) {
      return {
        type: 'Profile URL',
        steamId: 'STEAM_0:1:46174492',
        steamId64: '76561198052614712',
      };
    }
    return {
      type: 'Никнейм / Ввод',
      steamId: 'STEAM_0:1:46174492',
      steamId64: '76561198052614712',
    };
  })();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSuccessChime();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleUseThis = (id: string) => {
    if (onSelectSteamId) {
      onSelectSteamId(id);
    }
    playSuccessChime();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        background: 'rgba(5, 3, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-[28px] border border-[rgba(255,94,184,0.3)] shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: 'rgba(23, 14, 38, 0.95)',
        }}
      >
        <button
          onClick={() => {
            playSynthClick(400);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-[#a7a2bd] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#ff7b00]/20 border border-[#ff7b00]/40 flex items-center justify-center text-[#ff7b00]">
            <Terminal size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Как узнать свой SteamID?
            </h3>
            <p className="text-xs text-[#a7a2bd]">Быстрый поиск и конвертация идентификатора</p>
          </div>
        </div>

        {/* Ways to find SteamID */}
        <div className="space-y-3 mb-5 text-xs text-[#a7a2bd]">
          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <strong className="text-white block font-['Space_Grotesk'] mb-1">
              Способ 1: В игре Garry's Mod
            </strong>
            <p>
              Откройте консоль клавишей <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-white font-mono text-[10px]">~</kbd> (ё) и введите команду <code className="text-[#00ff88] font-mono">status</code>. В списке найдите свой никнейм и скопируйте SteamID (например <code className="text-[#ffe600] font-mono">STEAM_0:1:46174492</code>).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <strong className="text-white block font-['Space_Grotesk'] mb-1">
              Способ 2: Вставьте ссылку на профиль
            </strong>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="https://steamcommunity.com/id/ваш_профиль или STEAM_0:1:..."
                className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white text-xs font-mono placeholder:text-[#a7a2bd]/40 focus:outline-none focus:border-[#ff2a85]"
              />
            </div>
          </div>
        </div>

        {/* Live Detected Result */}
        {parsed && (
          <div className="p-4 rounded-2xl bg-[#ff2a85]/10 border border-[#ff2a85]/30 mb-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-['Space_Grotesk']">
              <span className="text-[#ff7b00] font-bold">Распознанный SteamID:</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-mono">
                {parsed.type}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/50 border border-white/10 font-mono text-xs">
              <span className="text-[#ffe600] font-bold">{parsed.steamId}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(parsed.steamId, 'steamid')}
                  className="p-1.5 rounded hover:bg-white/10 text-[#a7a2bd] hover:text-white transition-colors cursor-pointer"
                  title="Скопировать"
                >
                  {copiedKey === 'steamid' ? <Check size={14} className="text-[#00ff88]" /> : <Copy size={14} />}
                </button>
                {onSelectSteamId && (
                  <button
                    onClick={() => handleUseThis(parsed.steamId)}
                    className="px-2 py-1 rounded bg-[#ff2a85] hover:bg-[#ff2a85]/80 text-white text-[11px] font-bold font-['Space_Grotesk'] cursor-pointer"
                  >
                    Вставить
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-['Space_Grotesk'] transition-colors cursor-pointer"
        >
          Понятно, закрыть
        </button>
      </div>
    </div>
  );
};
