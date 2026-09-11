import React from 'react';
import { Home, ShoppingBag, ShieldCheck, MessageSquare, Terminal } from 'lucide-react';
import { TabType } from '../types';
import { playSynthClick } from '../utils/audio';

interface NavbarDockProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSteamHelper?: () => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'shop', label: 'Донат', icon: ShoppingBag, badge: 'VIP' },
  { id: 'rules', label: 'Правила', icon: ShieldCheck },
  { id: 'discord', label: 'Discord', icon: MessageSquare },
];

export const NavbarDock: React.FC<NavbarDockProps> = ({
  activeTab,
  onSelectTab,
  onOpenSteamHelper,
}) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[94vw] px-2">
      {/* Outer Glow Container */}
      <div className="relative group">
        {/* Glow behind dock */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#ff2a85]/30 via-[#ff7b00]/30 to-[#9d4edd]/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Main Glass Dock Bar */}
        <div
          id="main-navigation-dock"
          className="relative flex items-center justify-center gap-2 sm:gap-4 px-3 sm:px-6 py-2.5 rounded-[30px] border border-[rgba(255,94,184,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          style={{
            background: 'rgba(20, 13, 34, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`dock-tab-${item.id}`}
                onClick={() => {
                  playSynthClick(isActive ? 500 : 620);
                  onSelectTab(item.id);
                }}
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[22px] transition-all duration-300 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a85] ${
                  isActive
                    ? '-translate-y-2.5 shadow-[0_8px_25px_rgba(255,42,133,0.55)] scale-105'
                    : 'text-[#a7a2bd] hover:text-white hover:bg-white/[0.06] translate-y-0'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
                        color: '#ffffff',
                      }
                    : {}
                }
              >
                {/* Active Inner Scoop / Aura */}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#ff2a85] rounded-full blur-[2px]" />
                )}

                <Icon
                  size={19}
                  className={`transition-transform duration-300 ${
                    isActive ? 'stroke-[2.4] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]' : ''
                  }`}
                />

                <span
                  className={`text-xs sm:text-sm font-semibold tracking-wide font-['Space_Grotesk'] ${
                    isActive ? 'text-white' : 'hidden sm:inline-block'
                  }`}
                >
                  {item.label}
                </span>

                {/* Badge for Shop if any */}
                {item.badge && !isActive && (
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-[#ff2a85]/30 text-[#ff7b00] border border-[#ff2a85]/40 font-['Space_Grotesk']">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick SteamID / Console Helper button */}
          {onOpenSteamHelper && (
            <div className="hidden lg:flex items-center pl-1 border-l border-white/10">
              <button
                id="btn-open-steam-helper"
                onClick={() => {
                  playSynthClick(520);
                  onOpenSteamHelper();
                }}
                title="Узнать свой SteamID"
                className="p-2 rounded-full text-[#a7a2bd] hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <Terminal size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
