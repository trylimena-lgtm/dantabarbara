import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Sparkles,
  Zap,
  Terminal,
  HelpCircle,
  Clock,
  Flame,
  Crown,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PrivilegePlan } from '../../types';
import { playSuccessChime, playSynthClick } from '../../utils/audio';

interface ShopTabProps {
  onOpenCheckout: (plan: PrivilegePlan, durationIndex: number, steamId: string, discordUsername: string) => void;
  onOpenSteamHelper: () => void;
  defaultSteamId?: string;
}

const adminPlan: PrivilegePlan = {
  id: 'admin_donate',
  name: 'Донатная Админка',
  badge: 'ХИТ ПРОДАЖ',
  isPopular: true,
  description: 'Максимальный комфорт для строительства и развлечений с полным набором административных команд и увеличенными лимитами.',
  durations: [
    { period: '30 дней', days: 30, price: 199, oldPrice: 299, discount: '-33%' },
    { period: '90 дней', days: 90, price: 449, oldPrice: 699, discount: '-36%' },
    { period: 'Навсегда', days: 9999, price: 799, oldPrice: 1299, discount: '-38%' },
  ],
  features: [
    { title: 'Режим полёта Noclip', highlight: true, description: 'Свободное перемещение по карте без ограничений' },
    { title: 'Заморозка (Freeze / Unfreeze)', highlight: true, description: 'Возможность останавливать нарушителей и свои механизмы' },
    { title: 'Персональный префикс и цвет в чате', highlight: true, description: 'Уникальный тег [Admin] и кастомный цвет ника' },
    { title: 'Увеличенный лимит пропов (+500)', highlight: true, description: 'Стройте грандиозные сооружения' },
    { title: 'Приоритетный слот при переполненном сервере', highlight: false, description: 'Вход без очереди' },
    { title: 'Доступ к Wire Sound Emitter и GPU', highlight: false, description: 'Эксклюзивные расширенные компоненты Wiremod' },
    { title: 'Иммунитет к Voteban / Votekick', highlight: false, description: 'Защита от случайных голосований' },
    { title: 'Автоматическая роль Администратора в Discord', highlight: true, description: 'Доступ к закрытому админ-чату сообщества' },
  ],
  commands: [
    '!noclip',
    '!freeze / !unfreeze',
    '!god',
    '!cloak',
    '!goto / !bring',
    '!tp / !return',
    '!slap',
    '!strip',
    '!gag / !mute',
    '!setprefix',
  ],
};

const vipPlan: PrivilegePlan = {
  id: 'vip_status',
  name: 'VIP Статус',
  badge: 'СТАРТОВЫЙ',
  isPopular: false,
  description: 'Базовый набор строителя: повышенные лимиты, красивый статус и доступ к эксклюзивным материалам.',
  durations: [
    { period: '30 дней', days: 30, price: 99, oldPrice: 149 },
    { period: 'Навсегда', days: 9999, price: 349, oldPrice: 499 },
  ],
  features: [
    { title: 'Префикс [VIP] в чате и табе', highlight: true },
    { title: 'Дополнительные +250 пропов', highlight: true },
    { title: 'Доступ к VIP материалам и рэгдоллам', highlight: false },
    { title: 'Роль VIP на официальном Discord сервере', highlight: true },
    { title: 'Увеличенная квота времени Wire E2', highlight: false },
  ],
  commands: ['!vipmenu', '!setcolor', '!tag'],
};

export const ShopTab: React.FC<ShopTabProps> = ({
  onOpenCheckout,
  onOpenSteamHelper,
  defaultSteamId = '',
}) => {
  const [selectedDurationIdx, setSelectedDurationIdx] = useState<number>(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('admin_donate');
  const [steamId, setSteamId] = useState<string>(defaultSteamId);
  const [discordUsername, setDiscordUsername] = useState<string>('');
  const [steamIdError, setSteamIdError] = useState<string | null>(null);

  const activePlan = selectedPlanId === 'admin_donate' ? adminPlan : vipPlan;

  const validateAndProceed = () => {
    const trimmedSteam = steamId.trim();
    if (!trimmedSteam) {
      setSteamIdError('Пожалуйста, укажите ваш SteamID (например STEAM_0:1:46174492)');
      return;
    }

    setSteamIdError(null);
    playSuccessChime();
    onOpenCheckout(activePlan, selectedDurationIdx, trimmedSteam, discordUsername.trim());
  };

  return (
    <section id="tab-shop" className="space-y-10 pb-16">
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(26,17,43,0.7)] border border-[rgba(255,94,184,0.3)] mb-3">
          <Crown size={14} className="text-[#ffe600]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffe600] font-['Space_Grotesk']">
            Донат Магазин Сервера
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] mb-3">
          Привилегии SundBox:)
        </h2>
        <p className="text-sm sm:text-base text-[#a7a2bd]">
          Автоматическая выдача прав на сервере и роли в Discord сразу после оплаты.
        </p>
      </div>

      {/* Plan Switcher Pills */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            playSynthClick(500);
            setSelectedPlanId('admin_donate');
            setSelectedDurationIdx(0);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-['Space_Grotesk'] ${
            selectedPlanId === 'admin_donate'
              ? 'bg-gradient-to-r from-[#ffe600] via-[#ff7b00] to-[#ff2a85] text-white shadow-[0_0_25px_rgba(255,42,133,0.5)] scale-105'
              : 'bg-white/5 hover:bg-white/10 text-[#a7a2bd] hover:text-white border border-white/10'
          }`}
        >
          <Crown size={16} />
          <span>Донатная Админка (Основной продукт)</span>
        </button>

        <button
          onClick={() => {
            playSynthClick(500);
            setSelectedPlanId('vip_status');
            setSelectedDurationIdx(0);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-['Space_Grotesk'] ${
            selectedPlanId === 'vip_status'
              ? 'bg-gradient-to-r from-[#ffe600] via-[#ff7b00] to-[#ff2a85] text-white shadow-[0_0_25px_rgba(255,42,133,0.5)] scale-105'
              : 'bg-white/5 hover:bg-white/10 text-[#a7a2bd] hover:text-white border border-white/10'
          }`}
        >
          <Sparkles size={16} />
          <span>VIP Статус</span>
        </button>
      </div>

      {/* Main Donation Purchase Card */}
      <div
        className="max-w-4xl mx-auto rounded-[28px] border border-[rgba(255,94,184,0.3)] p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
        style={{
          background: 'rgba(26, 17, 43, 0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ff2a85]/20 via-[#ff7b00]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
                {activePlan.name}
              </h3>
              {activePlan.badge && (
                <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-gradient-to-r from-[#ffe600] to-[#ff7b00] text-black font-['Space_Grotesk'] shadow-[0_0_15px_rgba(255,230,0,0.4)]">
                  {activePlan.badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#a7a2bd] max-w-xl">
              {activePlan.description}
            </p>
          </div>

          {/* Price Preview */}
          <div className="text-left lg:text-right">
            <span className="text-xs text-[#a7a2bd] block font-['Space_Grotesk']">
              Стоимость:
            </span>
            <div className="flex items-baseline gap-2 lg:justify-end">
              <span className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-[#ffe600] via-[#ff7b00] to-[#ff2a85]">
                {activePlan.durations[selectedDurationIdx]?.price} ₽
              </span>
              {activePlan.durations[selectedDurationIdx]?.oldPrice && (
                <span className="text-sm line-through text-[#a7a2bd] font-mono">
                  {activePlan.durations[selectedDurationIdx].oldPrice} ₽
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#00ff88] font-semibold font-['Space_Grotesk']">
              Автоматическая выдача
            </span>
          </div>
        </div>

        {/* Duration selector tabs */}
        <div className="my-6">
          <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2.5 font-['Space_Grotesk']">
            Выберите срок действия:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activePlan.durations.map((dur, idx) => {
              const isSelected = selectedDurationIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    playSynthClick(520);
                    setSelectedDurationIdx(idx);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#ff2a85]/20 border-[#ff2a85] shadow-[0_0_20px_rgba(255,42,133,0.35)]'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  {dur.discount && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ff2a85] text-white font-mono">
                      {dur.discount}
                    </span>
                  )}
                  <div className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-1.5 mb-1">
                    <Clock size={14} className={isSelected ? 'text-[#ffe600]' : 'text-[#a7a2bd]'} />
                    <span>{dur.period}</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#ffe600] font-['Space_Grotesk']">
                    {dur.price} ₽
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Features & Input Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 pt-6 border-t border-white/10">
          {/* Features List */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk'] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#00ff88]" />
              Что входит в привилегию:
            </h4>

            <div className="space-y-2.5">
              {activePlan.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-black/25 border border-white/5"
                >
                  <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <div>
                    <div
                      className={`text-xs sm:text-sm font-semibold ${
                        feature.highlight ? 'text-white' : 'text-[#ffffff]/80'
                      }`}
                    >
                      {feature.title}
                    </div>
                    {feature.description && (
                      <p className="text-[11px] text-[#a7a2bd] mt-0.5">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Admin console commands badges */}
            {activePlan.commands && (
              <div className="pt-3">
                <div className="text-[11px] font-semibold text-[#a7a2bd] mb-2 font-['Space_Grotesk']">
                  Доступные команды администрирования:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePlan.commands.map((cmd, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[11px] font-mono text-[#ffe600]"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SteamID & Discord Form */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-black/40 border border-white/10">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
                Данные для выдачи:
              </h4>

              {/* SteamID Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-white font-['Space_Grotesk']">
                    Ваш SteamID <span className="text-[#ff2a85]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      playSynthClick(520);
                      onOpenSteamHelper();
                    }}
                    className="text-[11px] text-[#ff7b00] hover:text-[#ffe600] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <HelpCircle size={12} />
                    <span>Как узнать?</span>
                  </button>
                </div>
                <input
                  id="shop-steamid-input"
                  type="text"
                  value={steamId}
                  onChange={(e) => {
                    setSteamId(e.target.value);
                    if (steamIdError) setSteamIdError(null);
                  }}
                  placeholder="STEAM_0:1:46174492 или 76561198..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black/70 border text-xs font-mono text-white placeholder:text-[#a7a2bd]/40 focus:outline-none ${
                    steamIdError
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-white/15 focus:border-[#ff2a85]'
                  }`}
                />
                {steamIdError && (
                  <p className="text-[11px] text-red-400 mt-1">{steamIdError}</p>
                )}
              </div>

              {/* Discord Username Field */}
              <div>
                <label className="text-xs font-semibold text-white font-['Space_Grotesk'] block mb-1.5">
                  Discord Username (для роли)
                </label>
                <input
                  id="shop-discord-input"
                  type="text"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  placeholder="username или username#1234"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 focus:border-[#5865F2] text-xs font-mono text-white placeholder:text-[#a7a2bd]/40 focus:outline-none"
                />
                <p className="text-[10px] text-[#a7a2bd] mt-1">
                  Бот автоматически выдаст права на Discord сервере.
                </p>
              </div>

              {/* Security info note */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-[#a7a2bd] space-y-1">
                <div className="flex items-center gap-1.5 text-white font-semibold font-['Space_Grotesk']">
                  <Lock size={12} className="text-[#00ff88]" />
                  <span>Безопасная оплата</span>
                </div>
                <p>
                  Все платежи защищены SSL шифрованием через шлюзы Lava / Enot.
                </p>
              </div>
            </div>

            {/* Buy Button */}
            <div className="pt-5 mt-4 border-t border-white/10">
              <button
                id="shop-buy-submit-btn"
                type="button"
                onClick={validateAndProceed}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-[0_0_25px_rgba(255,42,133,0.55)] hover:shadow-[0_0_35px_rgba(255,42,133,0.85)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 font-['Space_Grotesk']"
                style={{
                  background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
                }}
              >
                <span>Купить за {activePlan.durations[selectedDurationIdx]?.price} ₽</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
