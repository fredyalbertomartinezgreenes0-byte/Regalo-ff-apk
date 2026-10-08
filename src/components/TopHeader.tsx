import React from "react";
import { SPECIAL_ASSETS } from "../data/items";

interface TopHeaderProps {
  coins?: string;
  diamonds?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  coins = "999.999.999",
  diamonds = "999.999.999",
}) => {
  return (
    <header className="w-full max-w-xl mx-auto pt-2 pb-3 px-3">
      <div
        id="top-stats-bar"
        className="w-full bg-[#111113] border border-[#facc15]/80 rounded-2xl py-2 px-3 sm:px-5 flex items-center justify-between shadow-[0_0_15px_rgba(250,204,21,0.12)] select-none"
      >
        {/* Gold Coins */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img
            src={SPECIAL_ASSETS.moneda}
            alt="Monedas Oro"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
            referrerPolicy="no-referrer"
          />
          <span className="text-white text-xs sm:text-sm font-black tracking-wide font-mono">
            {coins}
          </span>
        </div>

        {/* Diamonds */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-cyan-400 text-sm sm:text-base drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
            💎
          </span>
          <span className="text-white text-xs sm:text-sm font-black tracking-wide font-mono">
            {diamonds}
          </span>
        </div>

        {/* Verified Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-amber-950/40 border border-amber-500/40 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1">
          <img
            src={SPECIAL_ASSETS.verificado}
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
