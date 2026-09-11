import React, { useState, useEffect } from 'react';
import { TabType, ServerStatus, PrivilegePlan, ToastMessage } from './types';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Header } from './components/Header';
import { NavbarDock } from './components/NavbarDock';
import { Toast } from './components/Toast';
import { HomeTab } from './components/tabs/HomeTab';
import { ShopTab } from './components/tabs/ShopTab';
import { RulesTab } from './components/tabs/RulesTab';
import { DiscordTab } from './components/tabs/DiscordTab';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { SteamIdHelperModal } from './components/modals/SteamIdHelperModal';
import { playSuccessChime } from './utils/audio';

const defaultServerStatus: ServerStatus = {
  ip: '46.174.49.213:27015',
  port: '27015',
  connectUrl: 'steam://connect/46.174.49.213:27015',
  isOnline: true,
  players: 24,
  maxPlayers: 32,
  map: 'gm_construct_flatgrass',
  ping: 28,
  tickrate: 128,
  gamemode: 'Sandbox',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [serverStatus, setServerStatus] = useState<ServerStatus>(defaultServerStatus);
  const [hasCopiedIp, setHasCopiedIp] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // SteamID & Modal States
  const [savedSteamId, setSavedSteamId] = useState<string>('');
  const [isSteamHelperOpen, setIsSteamHelperOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<{
    plan: PrivilegePlan;
    durationIdx: number;
    steamId: string;
    discordUsername: string;
  } | null>(null);

  // Sync tab with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#tab-', '').replace('#', '');
      if (['home', 'shop', 'rules', 'discord'].includes(hash)) {
        setActiveTab(hash as TabType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = `#tab-${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverStatus.ip);
    setHasCopiedIp(true);
    playSuccessChime();

    setToast({
      id: String(Date.now()),
      title: 'IP скопирован в буфер обмена!',
      description: `${serverStatus.ip} • Вставьте в избранное или консоль GMod`,
      type: 'success',
    });

    setTimeout(() => setHasCopiedIp(false), 3000);
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenCheckout = (
    plan: PrivilegePlan,
    durationIndex: number,
    steamId: string,
    discordUsername: string
  ) => {
    setSelectedPlanForCheckout({
      plan,
      durationIdx: durationIndex,
      steamId,
      discordUsername,
    });
    setSavedSteamId(steamId);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0712] text-white flex flex-col justify-between selection:bg-[#ff2a85] selection:text-white">
      {/* Background Retrowave Horizon & Orbs */}
      <BackgroundEffects />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Top Header */}
      <Header
        serverIp={serverStatus.ip}
        isOnline={serverStatus.isOnline}
        playerCount={serverStatus.players}
        maxPlayers={serverStatus.maxPlayers}
        onCopyIp={handleCopyIp}
        hasCopiedIp={hasCopiedIp}
        onSelectTab={handleSelectTab}
        activeTab={activeTab}
      />

      {/* Main Tab Content View */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-28">
        {activeTab === 'home' && (
          <HomeTab
            serverStatus={serverStatus}
            onCopyIp={handleCopyIp}
            hasCopiedIp={hasCopiedIp}
            onSelectTab={handleSelectTab}
          />
        )}

        {activeTab === 'shop' && (
          <ShopTab
            onOpenCheckout={handleOpenCheckout}
            onOpenSteamHelper={() => setIsSteamHelperOpen(true)}
            defaultSteamId={savedSteamId}
          />
        )}

        {activeTab === 'rules' && <RulesTab />}

        {activeTab === 'discord' && <DiscordTab />}
      </main>

      {/* Floating Bottom Capsule Dock */}
      <NavbarDock
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSteamHelper={() => setIsSteamHelperOpen(true)}
      />

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          plan={selectedPlanForCheckout.plan}
          selectedDurationIndex={selectedPlanForCheckout.durationIdx}
          steamId={selectedPlanForCheckout.steamId}
          discordUsername={selectedPlanForCheckout.discordUsername}
          onOpenSteamHelper={() => setIsSteamHelperOpen(true)}
        />
      )}

      {/* SteamID Helper Modal */}
      <SteamIdHelperModal
        isOpen={isSteamHelperOpen}
        onClose={() => setIsSteamHelperOpen(false)}
        onSelectSteamId={(id) => {
          setSavedSteamId(id);
          setToast({
            id: String(Date.now()),
            title: 'SteamID применён!',
            description: id,
            type: 'info',
          });
          setTimeout(() => setToast(null), 3000);
        }}
      />

      {/* Footer copyright and note */}
      <footer className="relative z-10 py-6 border-t border-[rgba(255,94,184,0.1)] text-center text-xs text-[#a7a2bd]/60 font-['Space_Grotesk']">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} SundBox:) — Garry's Mod Sandbox Server.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>IP: <code className="text-[#ffe600] font-mono">{serverStatus.ip}</code></span>
            <span>•</span>
            <span className="text-white/80">Dark Retrowave Glass Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
