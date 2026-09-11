import React from 'react';
import {
  MessageSquare,
  Users,
  Bot,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Headphones,
} from 'lucide-react';
import { playSynthClick } from '../../utils/audio';

export const DiscordTab: React.FC = () => {
  const discordInviteUrl = 'https://discord.gg/gmod-sandbox';

  return (
    <section id="tab-discord" className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 mb-3">
          <MessageSquare size={14} className="text-[#5865F2]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#5865F2] font-['Space_Grotesk']">
            Discord Сообщество
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] mb-3">
          Присоединяйся к SundBox:)
        </h2>
        <p className="text-sm sm:text-base text-[#a7a2bd]">
          Общайся с другими инженерами, делись постройками и чипами Expression 2, получай новости об обновлениях и техподдержку.
        </p>
      </div>

      {/* Main Discord Showcase Card */}
      <div
        className="max-w-4xl mx-auto rounded-[28px] border border-[rgba(88,101,242,0.35)] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
        style={{
          background: 'rgba(20, 15, 36, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#5865F2]/25 via-[#ff2a85]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Discord Card Preview */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white shadow-[0_0_25px_rgba(88,101,242,0.6)]">
                <MessageSquare size={34} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  SundBox:) Official Community
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#a7a2bd] mt-1 font-['Space_Grotesk']">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                    <strong className="text-white">480+</strong> онлайн
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">1,650+</strong> участников
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#a7a2bd] leading-relaxed">
              Наш Discord сервер тесно интегрирован с игровым сервером Garry's Mod. При покупке привилегий бот автоматически синхронизирует роли и открывает доступ к закрытым каналам.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 pt-2">
              {[
                { title: 'Автоматическая выдача донат-ролей', desc: 'Мгновенно привязывается к вашему профилю' },
                { title: 'Архив готовых E2 чипов и дубликатов', desc: 'Десятки готовых систем от опытных кодеров' },
                { title: 'Прямая связь с Администрацией и тикеты', desc: 'Быстрое решение любых вопросов' },
                { title: 'Голосовые комнаты для совместной стройки', desc: 'Качественный звук без задержек' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-black/30 border border-white/5">
                  <CheckCircle2 size={16} className="text-[#5865F2] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#a7a2bd]">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-black/40 border border-[#5865F2]/25 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center text-[#5865F2]">
              <Users size={24} />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-['Space_Grotesk'] mb-1">
                Ждём тебя на сервере!
              </h4>
              <p className="text-xs text-[#a7a2bd]">
                Нажми кнопку ниже, чтобы получить приглашение в сообщество
              </p>
            </div>

            <a
              id="discord-join-invite-btn"
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSynthClick(650)}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-[0_0_25px_rgba(88,101,242,0.5)] hover:shadow-[0_0_35px_rgba(88,101,242,0.8)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 font-['Space_Grotesk']"
            >
              <span>Присоединиться к Discord</span>
              <ExternalLink size={16} />
            </a>

            <div className="text-[11px] text-[#a7a2bd] flex items-center gap-1.5 pt-2">
              <Bot size={13} className="text-[#00ff88]" />
              <span>SundBox Bot онлайн 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
