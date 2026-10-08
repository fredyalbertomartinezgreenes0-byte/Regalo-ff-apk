import React, { useState, useEffect } from "react";
import { X, ShieldCheck, CheckCircle, Clock, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { SPECIAL_ASSETS } from "../data/items";
import { GameItem, PlayerProfile } from "../types";
import { sounds } from "../utils/audio";

interface VerificationModalProps {
  player: PlayerProfile | null;
  playerId: string;
  selectedItems: GameItem[];
  onClose: () => void;
  onVerifiedSuccess: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  player,
  playerId,
  selectedItems,
  onClose,
  onVerifiedSuccess,
}) => {
  const [showInteractiveStep, setShowInteractiveStep] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(299); // 04:59

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartVerification = () => {
    sounds.playTap();
    setShowInteractiveStep(true);
  };

  const handleCompleteVerification = () => {
    sounds.playInject();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      sounds.playSuccess();

      // Fire vibrant Booyah confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#facc15", "#22c55e", "#38bdf8", "#ec4899"],
        });
      } catch {}

      onVerifiedSuccess();
    }, 1200);
  };

  const totalDiamonds = selectedItems
    .filter((it) => it.category === "diamonds" && it.amount)
    .reduce((acc, it) => acc + (it.amount || 0), 0);

  return (
    <div
      id="verification-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        id="verification-card"
        className="relative w-full max-w-[390px] bg-[#0c0c0e] border border-zinc-800 rounded-3xl p-6 sm:p-7 text-center shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900/80 hover:bg-zinc-800 transition-colors"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {!showInteractiveStep ? (
          /* Exact Match with Screenshot 1 */
          <div className="flex flex-col items-center">
            {/* Free Fire Logo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-zinc-700/60 bg-black flex items-center justify-center">
              <img
                src={SPECIAL_ASSETS.logo}
                alt="Free Fire"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* VERIFICACIÓN REQUERIDA (Matching Screenshot 1) */}
            <h2
              id="title-verification-required"
              className="text-[#facc15] font-black text-2xl sm:text-[26px] tracking-wide uppercase mb-4 drop-shadow-[0_2px_10px_rgba(250,204,21,0.25)]"
            >
              VERIFICACIÓN REQUERIDA
            </h2>

            {/* Subtitle (Matching Screenshot 1) */}
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-[280px] mb-7 font-normal">
              Completa la verificación para recibir los ítems en tu cuenta.
            </p>

            {/* Summary preview badge */}
            <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 mb-6 text-xs text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
                <div className="text-left flex items-center gap-1.5 overflow-hidden">
                  <img
                    src={SPECIAL_ASSETS.verificado}
                    alt="V"
                    className="w-4 h-4 object-contain shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <span className="text-zinc-400 block text-[9px] uppercase">Estado de Cuenta:</span>
                    <span className="font-extrabold text-emerald-400 text-xs truncate">
                      Servidor Conectado
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="text-zinc-400 block text-[9px] uppercase">ID OFICIAL:</span>
                  <span className="font-mono font-bold text-amber-400 text-xs">
                    {playerId || player?.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">Total a entregar:</span>
                <span className="font-extrabold text-emerald-400">
                  {selectedItems.length} ítems
                  {totalDiamonds > 0 ? ` (+${totalDiamonds.toLocaleString()} 💎)` : ""}
                </span>
              </div>
            </div>

            {/* VERIFICAR AHORA (Matching Screenshot 1) */}
            <button
              id="btn-verificar-ahora"
              onClick={handleStartVerification}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] active:bg-[#15803d] text-white font-extrabold text-lg sm:text-xl py-4 px-6 rounded-2xl uppercase tracking-wider shadow-[0_6px_25px_rgba(34,197,94,0.35)] transition-all transform active:scale-95 cursor-pointer"
            >
              VERIFICAR AHORA
            </button>
          </div>
        ) : (
          /* Interactive verification task step */
          <div className="flex flex-col items-center animate-fadeIn">
            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>Tiempo restante: {formatTime(timeLeft)}</span>
            </div>

            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-white font-black text-xl mb-1">
              Verificación Anti-Bot
            </h3>
            <p className="text-zinc-400 text-xs mb-5 max-w-[280px]">
              Desliza el seguro hasta el 100% para validar que eres un jugador humano y activar la entrega automática.
            </p>

            {/* Verification Slider */}
            <div className="w-full bg-zinc-900 border border-zinc-700/70 rounded-2xl p-4 mb-5">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-400">Progreso de validación:</span>
                <span
                  className={`font-black font-mono ${
                    sliderValue === 100 ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {sliderValue}%
                </span>
              </div>

              <input
                id="verification-slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSliderValue(val);
                  if (val === 100) sounds.playSuccess();
                }}
                className="w-full accent-[#22c55e] h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>0% Desliza</span>
                <span>100% Confirmar</span>
              </div>
            </div>

            {/* Action button */}
            <button
              id="btn-confirm-verification"
              onClick={handleCompleteVerification}
              disabled={sliderValue < 100 || isVerifying}
              className={`w-full py-4 px-6 rounded-2xl font-black text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                sliderValue === 100
                  ? "bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-[0_6px_25px_rgba(34,197,94,0.4)] active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Transfiriendo Ítems...</span>
                </>
              ) : sliderValue === 100 ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Completar y Recibir</span>
                </>
              ) : (
                <span>Desliza al 100% para verificar</span>
              )}
            </button>

            <button
              onClick={() => setShowInteractiveStep(false)}
              className="mt-3 text-xs text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
            >
              Volver atrás
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
