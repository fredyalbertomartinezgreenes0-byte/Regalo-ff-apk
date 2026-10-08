import React from "react";
import { CheckCircle2, PackageCheck, Sparkles, RefreshCw, Mail } from "lucide-react";
import { GameItem, PlayerProfile } from "../types";
import { sounds } from "../utils/audio";

interface SuccessCelebrationProps {
  player: PlayerProfile | null;
  playerId: string;
  selectedItems: GameItem[];
  onReset: () => void;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  player,
  playerId,
  selectedItems,
  onReset,
}) => {
  const transactionId = `FF-${Math.floor(100000 + Math.random() * 900000)}-LATAM`;

  const totalDiamonds = selectedItems
    .filter((it) => it.category === "diamonds" && it.amount)
    .reduce((acc, it) => acc + (it.amount || 0), 0);

  return (
    <div
      id="success-celebration-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="w-full max-w-md bg-[#101014] border border-amber-500/50 rounded-3xl p-6 sm:p-7 text-center shadow-[0_0_50px_rgba(250,204,21,0.25)] max-h-[90vh] overflow-y-auto">
        {/* Animated Badge */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-1">
          ¡Transferencia Exitosa!
        </h2>
        <p className="text-amber-400 font-extrabold text-sm mb-4 flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> RECOMPENSAS ENVIADAS AL BUZÓN
        </p>

        {/* Transaction Summary Box with PagoStore Verification */}
        <div className="bg-[#18181e] border border-zinc-800 rounded-2xl p-4 text-left mb-4 text-xs space-y-2">
          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-400">ID de Transacción:</span>
            <span className="text-zinc-200 font-mono font-bold">{transactionId}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-400">ID Oficial Free Fire:</span>
            <span className="text-amber-300 font-mono font-bold">{playerId || player?.id}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-400">Validación PagoStore:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> pagostore.garena.com (OK)
            </span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-400">Región de Servidor:</span>
            <span className="text-zinc-200 font-medium">{player?.region || "LATAM"}</span>
          </div>

          {totalDiamonds > 0 && (
            <div className="flex justify-between border-b border-zinc-800/80 pb-2">
              <span className="text-zinc-400">Diamantes Directos:</span>
              <span className="text-cyan-400 font-black font-mono">
                +{totalDiamonds.toLocaleString()} 💎
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-zinc-400">Ítems & Skins:</span>
            <span className="text-emerald-400 font-bold">
              {selectedItems.length} paquetes autorizados
            </span>
          </div>
        </div>

        {/* Notice Info */}
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-[11px] text-amber-200/90 text-left flex items-start gap-2.5 mb-5 leading-relaxed">
          <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Abre tu aplicación de <b>Free Fire</b> y revisa la sección del <b>Buzón de Correo</b>. Los paquetes se entregan en un lapso de 5 a 15 minutos.
          </span>
        </div>

        {/* Action Button */}
        <button
          id="btn-back-to-generator"
          onClick={() => {
            sounds.playTap();
            onReset();
          }}
          className="w-full bg-[#facc15] hover:bg-[#eab308] text-zinc-950 font-black text-base py-3.5 px-5 rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Nuevo Reclamo</span>
        </button>
      </div>
    </div>
  );
};
