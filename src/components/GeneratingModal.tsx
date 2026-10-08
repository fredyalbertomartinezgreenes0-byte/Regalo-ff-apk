import React, { useEffect, useState } from "react";
import { Loader2, Server, Shield, Cpu, CheckCircle2, Radio, Lock } from "lucide-react";
import { GameItem, PlayerProfile } from "../types";
import { GarenaServerNode } from "../services/garenaService";
import { sounds } from "../utils/audio";

interface GeneratingModalProps {
  player: PlayerProfile | null;
  playerId: string;
  selectedItems: GameItem[];
  currentServer?: GarenaServerNode;
  onComplete: () => void;
  onCancel: () => void;
}

export const GeneratingModal: React.FC<GeneratingModalProps> = ({
  player,
  playerId,
  selectedItems,
  currentServer,
  onComplete,
}) => {
  const [progress, setProgress] = useState(10);
  const [currentStep, setCurrentStep] = useState(0);

  const serverName = currentServer?.name || "Garena LATAM (SAC)";
  const serverPort = currentServer?.port || 39003;

  const steps = [
    { text: `Contactando con Servidor Oficial PagoStore (pagostore.garena.com)...`, icon: Server },
    { text: `Autenticando ID Oficial: ${playerId || player?.id || "12673020833"}`, icon: Shield },
    { text: `Preparando ${selectedItems.length} paquetes de ítems en Gateway Garena...`, icon: Cpu },
    { text: "Cifrando transferencia mediante protocolo Garena TLS 1.3...", icon: Loader2 },
    { text: "¡Paquetes autorizados por PagoStore! Verificación requerida...", icon: CheckCircle2 },
  ];

  useEffect(() => {
    sounds.playInject();

    const timer1 = setTimeout(() => {
      setProgress(35);
      setCurrentStep(1);
      sounds.playTap();
    }, 700);

    const timer2 = setTimeout(() => {
      setProgress(68);
      setCurrentStep(2);
      sounds.playInject();
    }, 1500);

    const timer3 = setTimeout(() => {
      setProgress(88);
      setCurrentStep(3);
      sounds.playTap();
    }, 2200);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setCurrentStep(4);
      sounds.playSuccess();
    }, 3000);

    const timer5 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  return (
    <div
      id="generating-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="w-full max-w-sm bg-[#141416] border border-amber-500/40 rounded-2xl p-6 text-center shadow-[0_0_40px_rgba(251,191,36,0.2)]">
        {/* Animated radar/spinner */}
        <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 border-t-amber-400 animate-spin" />
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/50 flex items-center justify-center text-amber-400">
            <CurrentIcon className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-amber-400 font-extrabold text-xl tracking-wide uppercase mb-1">
          Procesando Solicitud
        </h3>
        <p className="text-zinc-400 text-xs mb-4">
          Inyectando recompensas al{" "}
          <span className="text-amber-300 font-mono font-bold">
            ID: {playerId || player?.id}
          </span>
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-3 mb-2 overflow-hidden border border-zinc-700/60 p-0.5">
          <div
            className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-zinc-400 font-mono mb-4 px-1">
          <span>{steps[currentStep]?.text}</span>
          <span className="text-amber-400 font-bold">{progress}%</span>
        </div>

        {/* Summary of items being injected */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 flex flex-col gap-1.5 text-xs text-zinc-300">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Total a entregar:</span>
            <span className="bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-full font-black text-xs">
              {selectedItems.length} ÍTEMS
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono border-t border-zinc-800/80 pt-1.5">
            <span className="flex items-center gap-1 text-emerald-400">
              <Radio className="w-3 h-3" /> Nodo Garena:
            </span>
            <span className="text-zinc-300 truncate max-w-[180px]">
              {currentServer?.gateway || "ff-latam-cluster-01.garena.net"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
