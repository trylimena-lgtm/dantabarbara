import React from 'react';
import { SynthwaveSun } from '../SynthwaveSun';
import { ServerWidget } from '../ServerWidget';
import { ServerStatus, TabType } from '../../types';
import {
  Sparkles,
  Zap,
  ShieldAlert,
  Layers,
  Wrench,
  Users,
  Terminal,
  Play,
  ArrowRight,
  Cpu,
  Boxes,
  Lock,
  HeartHandshake,
} from 'lucide-react';
import { playSynthClick } from '../../utils/audio';

interface HomeTabProps {
  serverStatus: ServerStatus;
  onCopyIp: () => void;
  hasCopiedIp: boolean;
  onSelectTab: (tab: TabType) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  serverStatus,
  onCopyIp,
  hasCopiedIp,
  onSelectTab,
}) => {
  const perks = [
    {
      icon: Boxes,
      title: 'Расширенные лимиты пропов',
      desc: 'Стройте грандиозные базы, автомобили, механизмы и космические корабли без урезания лимитов.',
      color: 'from-[#ffe600] to-[#ff7b00]',
      tag: '500+ Props',
    },
    {
      icon: Cpu,
      title: 'Wiremod & Expression 2',
      desc: 'Полная свобода программирования чипов E2, голограмм, звуков, дисплеев и интерактивных систем.',
      color: 'from-[#ff7b00] to-[#ff2a85]',
      tag: 'E2 & Starfall',
    },
    {
      icon: ShieldAlert,
      title: 'Анти-Краш & Защита от лагов',
      desc: 'Интеллектуальная система перехвата бесконечных циклов, коллизий и проп-спама для стабильного FPS.',
      color: 'from-[#ff2a85] to-[#9d4edd]',
      tag: 'Anti-Freeze',
    },
    {
      icon: Zap,
      title: '128 Tickrate & Мощный хост',
      desc: 'Максимальная плавность физики Havok, мгновенный отклик тулгана и стабильный пинг по всей РФ и СНГ.',
      color: 'from-[#00ff88] to-[#00b4d8]',
      tag: '128 Tick',
    },
    {
      icon: Wrench,
      title: 'Набор тулов & AdvDupe2',
      desc: 'Advanced Duplicator 2, Precision Tool, Stacker, Multi-Parent, Smart Snap и сохранность ваших построек.',
      color: 'from-[#9d4edd] to-[#ff2a85]',
      tag: 'AdvDupe 2',
    },
    {
      icon: HeartHandshake,
      title: 'Адекватное комьюнити',
      desc: 'Отзывчивая администрация, регулярные ивенты, конкурсы построек и уютная атмосфера для творчества.',
      color: 'from-[#ffe600] to-[#ff2a85]',
      tag: '24/7 Модерация',
    },
  ];

  return (
    <section id="tab-home" className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="relative pt-6 sm:pt-12 text-center flex flex-col items-center">
        {/* Animated Synthwave Sun at Top */}
        <div className="relative mb-6 transform hover:scale-105 transition-transform duration-500">
          <SynthwaveSun size={170} glow={true} />
        </div>

        {/* Server Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(26,17,43,0.7)] border border-[rgba(255,94,184,0.3)] mb-4 shadow-[0_0_20px_rgba(255,42,133,0.3)]">
          <Sparkles size={14} className="text-[#ffe600] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffe600] font-['Space_Grotesk']">
            Garry's Mod Sandbox
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-['Space_Grotesk'] tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ffe600] via-[#ff7b00] to-[#ff2a85] drop-shadow-[0_0_35px_rgba(255,42,133,0.5)]">
          SundBox:)
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-[#a7a2bd] leading-relaxed mb-8 px-4">
          Твоё идеальное пространство для свободного строительства, программирования на <span className="text-white font-semibold">Wiremod / E2</span> и экспериментов с физикой в Garry's Mod.
        </p>

        {/* Primary Call to Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            id="hero-play-steam-link"
            href={serverStatus.connectUrl}
            onClick={() => playSynthClick(700)}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-bold text-white shadow-[0_0_30px_rgba(255,42,133,0.6)] hover:shadow-[0_0_45px_rgba(255,42,133,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer select-none font-['Space_Grotesk']"
            style={{
              background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
            }}
          >
            <Play size={18} className="fill-white" />
            <span>Подключиться к серверу</span>
          </a>

          <button
            id="hero-open-shop-btn"
            onClick={() => {
              playSynthClick(580);
              onSelectTab('shop');
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-[rgba(26,17,43,0.6)] hover:bg-[rgba(26,17,43,0.9)] border border-[rgba(255,94,184,0.35)] hover:border-[#ff2a85] transition-all cursor-pointer font-['Space_Grotesk']"
          >
            <span>Донат магазин</span>
            <ArrowRight size={17} className="text-[#ff7b00]" />
          </button>
        </div>

        {/* Server Live Monitoring Card */}
        <div className="w-full max-w-4xl">
          <ServerWidget
            status={serverStatus}
            onCopyIp={onCopyIp}
            hasCopiedIp={hasCopiedIp}
          />
        </div>
      </div>

      {/* Sandbox Advantages Section */}
      <div className="max-w-7xl mx-auto pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#ff7b00] uppercase tracking-wider font-['Space_Grotesk'] mb-1">
              Почему именно мы
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
              Особенности сервера SundBox:)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a7a2bd] max-w-md">
            Мы оптимизировали движок Source, чтобы вы могли строить масштабные проекты без фризов и просадок FPS.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="group relative rounded-[24px] border border-[rgba(255,94,184,0.18)] p-6 transition-all duration-300 hover:border-[rgba(255,94,184,0.5)] hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                style={{
                  background: 'rgba(26, 17, 43, 0.45)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${perk.color} flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(255,42,133,0.35)] group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ffe600]">
                    {perk.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] mb-2 group-hover:text-[#ffe600] transition-colors">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a7a2bd] leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Gamemode Rules & Etiquette Preview Banner */}
      <div
        className="max-w-7xl mx-auto rounded-[28px] border border-[rgba(255,94,184,0.25)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg, rgba(26,17,43,0.7) 0%, rgba(40,20,60,0.5) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00ff88] font-['Space_Grotesk']">
            <Lock size={14} />
            <span>Чистая игра без токсичности</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
            Ознакомьтесь с правилами сервера
          </h3>
          <p className="text-xs sm:text-sm text-[#a7a2bd] max-w-xl">
            Запрещен намеренный краш сервера, проп-спам и помеха чужим постройкам. Соблюдайте уважение ко всем игрокам песочницы.
          </p>
        </div>

        <button
          onClick={() => {
            playSynthClick(600);
            onSelectTab('rules');
          }}
          className="shrink-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all cursor-pointer font-['Space_Grotesk']"
        >
          Читать правила
        </button>
      </div>
    </section>
  );
};
