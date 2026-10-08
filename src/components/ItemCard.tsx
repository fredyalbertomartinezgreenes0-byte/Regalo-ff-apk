import React from "react";
import { Check } from "lucide-react";
import { GameItem } from "../types";
import { SPECIAL_ASSETS } from "../data/items";
import { sounds } from "../utils/audio";

interface ItemCardProps {
  item: GameItem;
  isSelected: boolean;
  onToggle: (item: GameItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isSelected,
  onToggle,
}) => {
  const handleClick = () => {
    if (isSelected) {
      sounds.playDeselect();
    } else {
      sounds.playSelect();
    }
    onToggle(item);
  };

  const isDiamond = item.category === "diamonds";
  const isFist = item.category === "fists";
  const hasVerifiedBadge = true;

  return (
    <div
      id={`item-card-${item.id}`}
      onClick={handleClick}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 select-none flex flex-col items-center justify-center border ${
        isSelected
          ? "bg-[#222227] border-amber-400 shadow-[0_0_14px_rgba(250,204,21,0.45)] ring-1 ring-amber-400 scale-[1.02]"
          : "bg-[#18181c] border-zinc-800/90 hover:border-zinc-600 hover:bg-[#1f1f24]"
      } ${isFist ? "aspect-[16/10]" : "aspect-[3/4]"}`}
    >
      {/* Top Diamond Pill (Clean amount badge on top-left) */}
      {isDiamond && item.amount && (
        <div className="absolute top-1.5 left-1.5 z-10 bg-black/75 backdrop-blur-xs border border-cyan-500/50 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
          <span className="text-cyan-400 text-xs leading-none">💎</span>
          <span className="text-white font-black text-[11px] sm:text-xs tracking-wide font-mono leading-none">
            {item.amount}
          </span>
        </div>
      )}

      {/* Verified Icon on ALL Items (Diamonds, Skins, Puños, Evolutivas) */}
      {hasVerifiedBadge && (
        <div
          className="absolute top-1.5 right-1.5 z-10 flex items-center justify-center bg-black/60 backdrop-blur-xs border border-amber-400/60 rounded-full p-0.5 sm:p-1 shadow-[0_0_8px_rgba(251,191,36,0.35)]"
          title="Verificado Garena Free Fire"
        >
          <img
            src={SPECIAL_ASSETS.verificado}
            alt="Verificado"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Main Image Container (Clean with no text) */}
      <div className="relative w-full h-full flex-1 flex items-center justify-center p-2 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`max-w-full max-h-full object-contain transition-transform duration-200 group-hover:scale-105 ${
            isFist ? "w-full object-cover rounded" : ""
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Yellow checkmark in bottom-right corner (Matching Screenshot 2) */}
      {isSelected && (
        <div className="absolute bottom-1 right-1 bg-amber-400 text-zinc-950 p-0.5 sm:p-1 rounded-md shadow-md z-20 flex items-center justify-center">
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5]" />
        </div>
      )}
    </div>
  );
};
