import React, { useState, useEffect } from "react";
import { Radio, Flame, Sparkles } from "lucide-react";

interface ClaimEvent {
  id: string;
  playerMaskedId: string;
  item: string;
  timeAgo: string;
  icon: string;
}

const INITIAL_CLAIMS: ClaimEvent[] = [
  { id: "1", playerMaskedId: "2819****", item: "5,600 Diamantes", timeAgo: "hace 12s", icon: "💎" },
  { id: "2", playerMaskedId: "7741****", item: "Barba del Viejo", timeAgo: "hace 24s", icon: "🧔" },
  { id: "3", playerMaskedId: "9012****", item: "AK47 Dragón Azul", timeAgo: "hace 35s", icon: "⚡" },
  { id: "4", playerMaskedId: "3381****", item: "Puño Flamígero", timeAgo: "hace 48s", icon: "🔥" },
  { id: "5", playerMaskedId: "1284****", item: "Traje Criminal Rojo", timeAgo: "hace 1m", icon: "🎭" },
  { id: "6", playerMaskedId: "6402****", item: "2,180 Diamantes", timeAgo: "hace 1m", icon: "💎" },
  { id: "7", playerMaskedId: "5519****", item: "MP40 Cobra Depredadora", timeAgo: "hace 2m", icon: "🐍" },
];

export const LiveTicker: React.FC = () => {
  const [claims, setClaims] = useState<ClaimEvent[]>(INITIAL_CLAIMS);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomItems = [
        { item: "5,600 Diamantes", icon: "💎" },
        { item: "1,060 Diamantes", icon: "💎" },
        { item: "Barba del Viejo", icon: "🧔" },
        { item: "Puño Dragón", icon: "🐉" },
        { item: "Conjunto Hip Hop", icon: "🧢" },
        { item: "SCAR Megalodón", icon: "🦈" },
        { item: "Winterlands 2023", icon: "❄️" },
      ];
      const randomPrefix = Math.floor(1000 + Math.random() * 9000);
      const chosen = randomItems[Math.floor(Math.random() * randomItems.length)];

      const newClaim: ClaimEvent = {
        id: Date.now().toString(),
        playerMaskedId: `${randomPrefix}****`,
        item: chosen.item,
        timeAgo: "hace instantes",
        icon: chosen.icon,
      };

      setClaims((prev) => [newClaim, ...prev.slice(0, 10)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#111115] border-y border-zinc-800/80 py-2 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-500/40 text-red-400 px-2.5 py-0.5 rounded-md text-[11px] font-black shrink-0 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping inline-block" />
          <span>EN VIVO</span>
        </div>

        {/* Scrolling text marquee */}
        <div className="flex-1 overflow-hidden whitespace-nowrap mask-gradient flex items-center">
          <div className="inline-flex gap-8 items-center text-xs animate-marquee">
            {claims.map((claim) => (
              <span key={claim.id} className="inline-flex items-center gap-1.5 text-zinc-300">
                <span className="text-zinc-500">ID {claim.playerMaskedId}</span>
                <span className="text-amber-400 font-bold">
                  {claim.icon} {claim.item}
                </span>
                <span className="text-zinc-500 text-[10px]">({claim.timeAgo})</span>
                <span className="text-zinc-700 mx-1">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
