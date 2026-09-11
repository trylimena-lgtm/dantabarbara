import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Sparkles, ExternalLink, HelpCircle, ArrowRight } from 'lucide-react';
import { PrivilegePlan } from '../../types';
import { playSuccessChime, playSynthClick } from '../../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PrivilegePlan;
  selectedDurationIndex: number;
  steamId: string;
  discordUsername: string;
  onOpenSteamHelper?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  selectedDurationIndex,
  steamId,
  discordUsername,
  onOpenSteamHelper,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'lava' | 'enot' | 'sbp' | 'card' | 'crypto'>('lava');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const currentDuration = plan.durations[selectedDurationIndex] || plan.durations[0];
  const basePrice = currentDuration.price;
  const finalPrice = promoApplied ? Math.max(0, Math.round(basePrice * (1 - promoDiscount))) : basePrice;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SUNDBOX' || code === 'GMOD' || code === 'SANDBOX') {
      setPromoApplied(true);
      setPromoDiscount(0.15); // 15% discount
      playSuccessChime();
    } else {
      alert('Промокод не найден или устарел.');
    }
  };

  const handleStartPayment = () => {
    setIsProcessing(true);
    playSynthClick(600);

    // Simulate redirection to payment gateway (Lava / GM-Donate / Enot)
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      playSuccessChime();
    }, 1200);
  };

  return (
    <div
      id="checkoutModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        background: 'rgba(5, 3, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="relative w-full max-w-xl rounded-[28px] border border-[rgba(255,94,184,0.3)] shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: 'rgba(23, 14, 38, 0.95)',
        }}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ff2a85]/20 via-[#ff7b00]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playSynthClick(400);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-[#a7a2bd] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {paymentSuccess ? (
          /* Payment Initiated Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/40 text-[#00ff88] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">
              Переход к оплате
            </h3>
            <p className="text-sm text-[#a7a2bd] max-w-md mx-auto mb-6">
              Счет успешно сформирован в платёжной системе. После завершения транзакции привилегия «{plan.name}» и роль в Discord активируются автоматически в течение 1 минуты!
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#a7a2bd]">
                <span>Товар:</span>
                <span className="text-white font-semibold">{plan.name} ({currentDuration.period})</span>
              </div>
              <div className="flex justify-between text-[#a7a2bd]">
                <span>SteamID:</span>
                <span className="text-[#ffe600] font-semibold">{steamId || 'STEAM_0:1:46174492'}</span>
              </div>
              <div className="flex justify-between text-[#a7a2bd]">
                <span>Discord:</span>
                <span className="text-[#5865F2] font-semibold">{discordUsername || 'Не указан'}</span>
              </div>
              <div className="flex justify-between text-[#a7a2bd] pt-2 border-t border-white/10">
                <span>Сумма к оплате:</span>
                <span className="text-[#00ff88] text-sm font-bold font-['Space_Grotesk']">{finalPrice} ₽</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  window.open(`https://lava.top`, '_blank');
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(255,42,133,0.5)] flex items-center justify-center gap-2 cursor-pointer font-['Space_Grotesk']"
                style={{
                  background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
                }}
              >
                <span>Перейти в платежный шлюз</span>
                <ExternalLink size={16} />
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7b00] to-[#ff2a85] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,42,133,0.5)]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                  Оформление привилегии
                </h3>
                <p className="text-xs text-[#a7a2bd]">
                  {plan.name} • {currentDuration.period}
                </p>
              </div>
            </div>

            {/* Recipient Details Review */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 mb-5">
              <div>
                <span className="text-[11px] text-[#a7a2bd] block font-['Space_Grotesk']">
                  Получатель в Steam:
                </span>
                <strong className="text-xs sm:text-sm font-mono text-[#ffe600] break-all">
                  {steamId || 'STEAM_0:1:46174492'}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#a7a2bd] block font-['Space_Grotesk']">
                  Discord для роли:
                </span>
                <strong className="text-xs sm:text-sm font-['Space_Grotesk'] text-[#5865F2] break-all">
                  {discordUsername || 'Не привязан (по желанию)'}
                </strong>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                Выберите способ оплаты:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'lava', name: 'Lava.top / СБП', desc: '0% комиссия, карты РФ/СНГ' },
                  { id: 'enot', name: 'Enot / Карты', desc: 'МИР, Visa, MC' },
                  { id: 'sbp', name: 'QR СБП', desc: 'Мгновенно по QR коду' },
                  { id: 'card', name: 'Зарубежные карты', desc: 'USD / EUR / UAH' },
                  { id: 'crypto', name: 'Криптовалюта', desc: 'USDT, TON, BTC' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      playSynthClick(500);
                      setPaymentMethod(method.id as typeof paymentMethod);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === method.id
                        ? 'bg-[#ff2a85]/20 border-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                        : 'bg-white/[0.04] border-white/10 text-[#a7a2bd] hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold font-['Space_Grotesk'] flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${paymentMethod === method.id ? 'bg-[#ff2a85]' : 'bg-white/30'}`} />
                      {method.name}
                    </div>
                    <div className="text-[10px] opacity-75 mt-0.5 truncate">{method.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Промокод (например, SUNDBOX)"
                  disabled={promoApplied}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono uppercase placeholder:normal-case placeholder:text-[#a7a2bd]/50 focus:outline-none focus:border-[#ff2a85]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode.trim()}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold font-['Space_Grotesk'] transition-all cursor-pointer ${
                    promoApplied
                      ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {promoApplied ? 'Применен -15%' : 'Применить'}
                </button>
              </div>
            </div>

            {/* Price & Guarantee Note */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[rgba(255,42,133,0.15)] to-[rgba(255,123,0,0.15)] border border-[rgba(255,94,184,0.3)] mb-6">
              <div>
                <span className="text-xs text-[#a7a2bd] block font-['Space_Grotesk']">
                  Итого к оплате:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-[#ffe600] to-[#ff2a85]">
                    {finalPrice} ₽
                  </span>
                  {promoApplied && (
                    <span className="text-xs line-through text-[#a7a2bd] font-mono">
                      {basePrice} ₽
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right text-[11px] text-[#00ff88] flex items-center gap-1 font-['Space_Grotesk']">
                <Sparkles size={14} />
                <span>Автовыдача 24/7</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl text-sm font-semibold text-[#a7a2bd] hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Отмена
              </button>

              <button
                type="button"
                id="modal-confirm-pay-btn"
                onClick={handleStartPayment}
                disabled={isProcessing}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-[0_0_25px_rgba(255,42,133,0.5)] hover:shadow-[0_0_35px_rgba(255,42,133,0.8)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 font-['Space_Grotesk']"
                style={{
                  background: 'linear-gradient(135deg, #ffe600 0%, #ff7b00 45%, #ff2a85 100%)',
                }}
              >
                {isProcessing ? (
                  <span>Обработка...</span>
                ) : (
                  <>
                    <span>Оплатить {finalPrice} ₽</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
