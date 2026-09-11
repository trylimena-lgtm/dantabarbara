import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  Crown,
  Boxes,
  Cpu,
  Volume2,
  Lock,
  Flame,
} from 'lucide-react';
import { RuleCategory } from '../../types';
import { playSynthClick } from '../../utils/audio';

const serverRuleCategories: RuleCategory[] = [
  {
    id: 'general',
    title: '1. Основные правила и поведение',
    icon: 'ShieldAlert',
    rules: [
      {
        number: '1.1',
        title: 'Уважение к игрокам и администрации',
        description:
          'Запрещены любые проявления токсичности, оскорбления игроков, разжигание межнациональной розни и провокации в общем текстовом и голосовом чате.',
        punishment: 'Мут чата от 30 минут до бана на 24 часа.',
      },
      {
        number: '1.2',
        title: 'Голосовой и микрофонный спам',
        description:
          'Запрещено кричать в микрофон, включать громкие саундпады, помехи или музыку без согласия окружающих игроков.',
        punishment: 'Mute голоса от 1 часа.',
      },
      {
        number: '1.3',
        title: 'Реклама сторонних ресурсов',
        description:
          'Запрещена реклама других игровых проектов, серверов Discord или сайтов без согласования с создателями SundBox:).',
        punishment: 'Перманентный бан (Ban Perm).',
      },
    ],
  },
  {
    id: 'building',
    title: '2. Строительство и защита от крашей',
    icon: 'Boxes',
    rules: [
      {
        number: '2.1',
        title: 'Запрет PropSpam (Проп-спама)',
        description:
          'Категорически запрещено беспричинно спавнить сотни пропов, забивать спавн или создавать неоптимизированные нагромождения.',
        punishment: 'Кик / Бан от 3 дней.',
      },
      {
        number: '2.2',
        title: 'Защита от намеренного краша и лаг-машин',
        description:
          'Запрещено создавать конструкции, предназначенные для искусственного занижения серверного FPS, перегрузки физического движка Havok или зависания игроков.',
        punishment: 'Удаление постройки + Бан от 7 дней до навсегда.',
      },
      {
        number: '2.3',
        title: 'Уважение чужих построек (No Griefing)',
        description:
          'Запрещено трогать, передвигать, спавнить свои пропы внутри чужих баз или удалять чужие механизмы без прямого разрешения владельца.',
        punishment: 'Freeze + Предупреждение / Бан на 1 день.',
      },
      {
        number: '2.4',
        title: 'Застройка спавна (Spawn Block)',
        description:
          'Зона спавна игроков является общественной. Строительство любых стен, заборов или ловушек на спавне строго запрещено.',
        punishment: 'Очистка пропов + Джайл 15 минут.',
      },
    ],
  },
  {
    id: 'wiremod',
    title: '3. Wiremod, Starfall и Expression 2',
    icon: 'Cpu',
    rules: [
      {
        number: '3.1',
        title: 'Лимиты процессорного времени (E2 CPU Time)',
        description:
          'Ваш чип Expression 2 не должен превышать лимит квоты CPU (150-200 микросекунд). Запрещены чипы с бесконечными циклами for/while.',
        punishment: 'Автоматическое отключение чипа / Бан на 24 часа при повторе.',
      },
      {
        number: '3.2',
        title: 'Голографический и аудио спам через Wire',
        description:
          'Запрещено создавать миллионы мерцающих голограмм, крашащих клиентский рендер, или Wire Sound Emitter с оглушающими звуками.',
        punishment: 'Удаление чипа + Варн.',
      },
    ],
  },
  {
    id: 'donators',
    title: '4. Правила для обладателей Донатной Админки',
    icon: 'Crown',
    rules: [
      {
        number: '4.1',
        title: 'Запрет злоупотребления правами (No Admin Abuse)',
        description:
          'Административные команды (Freeze, Slap, Goto, Cloak) предназначены для модерирования и помощи, а не для издевательств над игроками.',
        punishment: 'Предупреждение / Снятие прав без возврата средств при рецидиве.',
      },
      {
        number: '4.2',
        title: 'Noclip и бессмертие в PvP ситуациях',
        description:
          'Запрещено использовать Noclip или Godmode для получения нечестного преимущества в перестрелках или захватах баз.',
        punishment: 'Временная блокировка команды !noclip на 3 дня.',
      },
      {
        number: '4.3',
        title: 'Помощь новичкам',
        description:
          'Администраторы и VIP поощряются за помощь новым игрокам в освоении тулгана, Wiremod и навигации по серверу.',
        punishment: 'Почет и уважение в сообществе!',
      },
    ],
  },
];

export const RulesTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = serverRuleCategories
    .map((cat) => {
      const filteredRules = cat.rules.filter(
        (rule) =>
          rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rule.number.includes(searchQuery)
      );
      return { ...cat, rules: filteredRules };
    })
    .filter((cat) => {
      if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
      return cat.rules.length > 0;
    });

  return (
    <section id="tab-rules" className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(26,17,43,0.7)] border border-[rgba(255,94,184,0.3)] mb-3">
          <ShieldAlert size={14} className="text-[#ff7b00]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff7b00] font-['Space_Grotesk']">
            Регламент Сервера
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] mb-3">
          Свод правил SundBox:)
        </h2>
        <p className="text-sm sm:text-base text-[#a7a2bd]">
          Соблюдение этих правил гарантирует высокий FPS, стабильность сервера и комфортную игру для всех строителей.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a7a2bd]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по номеру правила или ключевому слову (например: краш, E2, noclip)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm placeholder:text-[#a7a2bd]/50 focus:outline-none focus:border-[#ff2a85] transition-colors"
          />
        </div>

        {/* Category selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Все правила' },
            { id: 'general', label: 'Поведение' },
            { id: 'building', label: 'Постройки' },
            { id: 'wiremod', label: 'Wiremod' },
            { id: 'donators', label: 'Донат' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playSynthClick(500);
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer font-['Space_Grotesk'] ${
                activeCategory === cat.id
                  ? 'bg-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.5)]'
                  : 'bg-white/5 hover:bg-white/10 text-[#a7a2bd] hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules List by Category */}
      <div className="max-w-4xl mx-auto space-y-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-3xl bg-black/30 border border-white/10">
            <p className="text-sm text-[#a7a2bd]">Правил по вашему запросу не найдено.</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-[28px] border border-[rgba(255,94,184,0.22)] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
              style={{
                background: 'rgba(26, 17, 43, 0.55)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-6 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ffe600] to-[#ff2a85]" />
                <span>{category.title}</span>
              </h3>

              <div className="space-y-4">
                {category.rules.map((rule) => (
                  <div
                    key={rule.number}
                    className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-[rgba(255,94,184,0.3)] transition-colors space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#ff2a85]/20 border border-[#ff2a85]/40 text-[#ff2a85] font-mono text-xs font-bold">
                          § {rule.number}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white font-['Space_Grotesk']">
                          {rule.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#a7a2bd] leading-relaxed">
                      {rule.description}
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px]">
                      <span className="text-red-400 font-semibold font-['Space_Grotesk'] flex items-center gap-1">
                        <AlertTriangle size={13} />
                        Наказание:
                      </span>
                      <span className="text-[#a7a2bd] font-mono">{rule.punishment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
