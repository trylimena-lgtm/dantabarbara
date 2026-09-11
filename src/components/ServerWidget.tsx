import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, Wifi, Cpu, Users, MapPin, Sparkles } from 'lucide-react';
import { ServerStatus } from '../types';
import { playSuccessChime, playSynthClick } from '../utils/audio';

interface ServerWidgetProps {
  status: ServerStatus;
  onCopyIp: () => void;
  hasCopiedIp: boolean;
}

export const ServerWidget: React.FC<ServerWidgetProps> = ({
  status,
  onCopyIp,
  hasCopiedIp,
}) => {
  const [showConsoleCmd, setShowConsoleCmd] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const consoleCommand = `connect ${status.ip}`;

  const handleCopyConsoleCmd = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(consoleCommand);
    setCopiedCmd(true);
    playSuccessChime();
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  const fillPercentage = Math.min(100, Math.round((status.players / status.maxPlayers) * 100));

  return (
    <div
      id="server-monitoring-card"
      className="relative w-full rounded-[28px] border border-[rgba(255,94,184,0.25)] p-5 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-[rgba(255,94,184,0.45)]"
      style={{
        background: 'rgba(26, 17, 43, 0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Background neon flare */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#ff2a85]/15 via-[#ff7b00]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Card Header: Status + Quick Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff88]" />
            </span>
            <span className="text-xs font-bold text-[#00ff88] font-['Space_Grotesk'] uppercase tracking-wider">
              {status.isOnline ? 'СЕРВЕР ОНЛАЙН' : 'ТЕХРАБОТЫ'}
            </span>
          </div>

          <span className="text-xs text-[#a7a2bd] flex items-center gap-1 font-['Space_Grotesk']">
            <Cpu size={14} className="text-[#ff7b00]" />
            {status.tickrate} Tickrate
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#a7a2bd] font-['Space_Grotesk']">
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-[#ff2a85]" />
            Карта: <strong className="text-white font-mono">{status.map}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Wifi size={14} className="text-[#00ff88]" />
            Пинг: <strong className="text-white">{status.ping} ms</strong>
          </span>
        </div>
      </div>

      {/* Main Server IP Banner Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 mb-6">
        {/* IP & Gamemode */}
        <div className="lg:col-span-7">
          <div className="text-[11px] font-semibold text-[#ff7b00] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
            Адрес для прямого подключения (IP:PORT)
          </div>
          <div
            onClick={onCopyIp}
            className="flex items-center gap-3 text-lg sm:text-2xl font-bold font-['JetBrains_Mono'] text-white hover:text-[#ffe600] transition-colors cursor-pointer group select-all"
            title="Кликните, чтобы скопировать IP"
          >
            <span>{status.ip}</span>
            <span className="text-xs font-normal text-[#a7a2bd] group-hover:text-white px-2 py-0.5 rounded bg-white/10 border border-white/10 flex items-center gap-1 font-sans">
              <Copy size={12} />
              Копировать
            </span>
          </div>
          <p className="text-xs text-[#a7a2bd] mt-1.5 flex items-center gap-2">
            <span>Режим: <span className="text-white font-medium">Sandbox (Строительство & Физика)</span></span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-start lg:justify-end gap-2.5">
          {/* Copy IP Button */}
          <button
            id="server-widget-copy-btn"
            onClick={onCopyIp}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
              hasCopiedIp
                ? 'bg-[#00ff88]/20 border-[#00ff88]/50 text-[#00ff88]'
                : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/15 hover:border-white/25'
            }`}
          >
            {hasCopiedIp ? (
              <>
                <Check size={16} />
                <span>IP скопирован!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Скопировать IP</span>
              </>
            )}
          </button>

          {/* Quick Play Steam Button */}
          <a
            id="server-widget-connect-btn"
            href={status.connectUrl}
            onClick={() => playSynthClick(750)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-[0_0_20px_rgba(255,42,133,0.5)] hover:shadow-[0_0_30px_rgba(255,42,133,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer select-none font-['Space_Grotesk']"
            style={{
              background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
            }}
          >
            <Play size={16} className="fill-white" />
            <span>Играть в GMod</span>
          </a>
        </div>
      </div>

      {/* Online Players Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold mb-2 font-['Space_Grotesk']">
          <span className="flex items-center gap-1.5 text-[#a7a2bd]">
            <Users size={14} className="text-[#ffe600]" />
            Онлайн на сервере
          </span>
          <span className="text-white">
            <strong className="text-[#ffe600] text-sm">{status.players}</strong> / {status.maxPlayers} слотов ({fillPercentage}%)
          </span>
        </div>

        <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-[2px] border border-white/10">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(5, fillPercentage)}%`,
              background: 'linear-gradient(90deg, #ffe600 0%, #ff7b00 50%, #ff2a85 100%)',
              boxShadow: '0 0 12px rgba(255, 42, 133, 0.7)',
            }}
          />
        </div>
      </div>

      {/* Console connect toggle */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setShowConsoleCmd(!showConsoleCmd)}
          className="text-xs text-[#a7a2bd] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Terminal size={13} className="text-[#ff7b00]" />
          <span>Подключение через игровую консоль (~)</span>
        </button>

        {showConsoleCmd && (
          <div className="w-full mt-2 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/70 border border-white/15 font-mono text-xs">
            <span className="text-[#00ff88] select-all">{consoleCommand}</span>
            <button
              onClick={handleCopyConsoleCmd}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedCmd ? <Check size={12} className="text-[#00ff88]" /> : <Copy size={12} />}
              <span>{copiedCmd ? 'Скопировано' : 'Копировать'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
