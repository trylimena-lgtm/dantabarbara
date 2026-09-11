import React from 'react';
import { SynthwaveSun } from './SynthwaveSun';
import { Play, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { TabType } from '../types';
import { playSynthClick, playSuccessChime } from '../utils/audio';

interface HeaderProps {
  serverIp: string;
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  onCopyIp: () => void;
  hasCopiedIp: boolean;
  onSelectTab: (tab: TabType) => void;
  activeTab: TabType;
}

export const Header: React.FC<HeaderProps> = ({
  serverIp,
  isOnline,
  playerCount,
  maxPlayers,
  onCopyIp,
  hasCopiedIp,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full px-4 sm:px-6 py-3 border-b border-[rgba(255,94,184,0.12)] bg-[#0a0712]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div
          id="brand-header-link"
          onClick={() => {
            playSynthClick(580);
            onSelectTab('home');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <SynthwaveSun size={42} glow={true} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ffe600] via-[#ff7b00] to-[#ff2a85] group-hover:drop-shadow-[0_0_12px_rgba(255,42,133,0.8)] transition-all">
                SundBox:)
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#ff2a85]/20 text-[#ff2a85] border border-[#ff2a85]/30 font-['Space_Grotesk']">
                Sandbox GMod
              </span>
            </div>
            <p className="text-[11px] text-[#a7a2bd] hidden md:block">
              Wiremod • E2 • No Limits • 128 Tickrate
            </p>
          </div>
        </div>

        {/* Server Quick Status & Connect Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Online badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(26,17,43,0.6)] border border-[rgba(255,94,184,0.18)]">
            <span className="relative flex h-2.5 w-2.5">
              {isOnline && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOnline ? 'bg-[#00ff88]' : 'bg-red-500'
                }`}
              />
            </span>
            <span className="text-xs font-medium text-white/90 font-['Space_Grotesk']">
              {playerCount} / {maxPlayers} Игроков
            </span>
          </div>

          {/* Quick Copy IP Button */}
          <button
            id="header-copy-ip-btn"
            onClick={() => {
              playSuccessChime();
              onCopyIp();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#a7a2bd] hover:text-white border border-white/10 transition-all cursor-pointer font-['JetBrains_Mono']"
            title="Нажмите, чтобы скопировать IP"
          >
            {hasCopiedIp ? (
              <>
                <Check size={14} className="text-[#00ff88]" />
                <span className="text-[#00ff88]">Скопировано</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span className="hidden sm:inline">{serverIp}</span>
                <span className="sm:hidden">IP</span>
              </>
            )}
          </button>

          {/* Steam Direct Connect CTA Button */}
          <a
            id="header-connect-steam-btn"
            href={`steam://connect/${serverIp}`}
            onClick={() => playSynthClick(700)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-full text-white shadow-[0_0_20px_rgba(255,42,133,0.45)] hover:shadow-[0_0_30px_rgba(255,42,133,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer select-none font-['Space_Grotesk']"
            style={{
              background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
            }}
          >
            <Play size={14} className="fill-white" />
            <span>Играть</span>
          </a>

          {/* Discord header link */}
          <button
            id="header-discord-btn"
            onClick={() => {
              playSynthClick(550);
              onSelectTab('discord');
            }}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[#5865F2]/20 hover:bg-[#5865F2]/35 border border-[#5865F2]/40 text-[#5865F2] hover:text-white transition-all cursor-pointer"
            title="Наш Discord сервер"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
