import React from "react";
import { GameItem, PlayerProfile } from "../types";
import { Trash2, Sparkles, CheckCircle2, User, Gift, Send } from "lucide-react";
import { SPECIAL_ASSETS } from "../data/items";
import { sounds } from "../utils/audio";

interface SelectionSidebarProps {
  player: PlayerProfile | null;
  playerId: string;
  selectedItems: GameItem[];
  onRemoveItem: (item: GameItem) => void;
  onClearAll: () => void;
  onDarClick: () => void;
}

export const SelectionSidebar: React.FC<SelectionSidebarProps> = ({
  player,
  playerId,
  selectedItems,
  onRemoveItem,
  onClearAll,
  onDarClick,
}) => {
  const totalDiamonds = selectedItems
    .filter((it) => it.category === "diamonds" && it.amount)
    .reduce((acc, it) => acc + (it.amount || 0), 0);

  return (
    <aside className="w-full bg-[#121216] border border-zinc-800 rounded-2xl p-5 sticky top-20 flex flex-col justify-between shadow-xl">
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
          </div>
          {selectedItems.length > 0 && (
            <span className="bg-amber-400 text-zinc-950 font-black text-xs px-2 py-0.5 rounded-full">
              {selectedItems.length}
            </span>
          )}
        </div>

        {/* Player Status In Sidebar */}
        {player && (
          <div className="bg-[#18181f] border border-zinc-800/90 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 p-1 flex items-center justify-center shrink-0">
                <img
                  src={SPECIAL_ASSETS.verificado}
                  alt=""
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <div className="font-extrabold text-white text-xs leading-tight flex items-center gap-1">
                  <span>ID Oficial:</span>
                  <span className="text-amber-400 font-mono font-bold">{player.id}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">
                  {player.region} • Conectado
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Items Scroll Area */}
        <div className="mb-4">
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-end mb-2">
              <button
                onClick={() => {
                  sounds.playDeselect();
                  onClearAll();
                }}
                className="text-red-400 hover:text-red-300 p-1 rounded transition-colors cursor-pointer"
                title="Vaciar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {selectedItems.length > 0 && (
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#18181f] border border-zinc-800 hover:border-zinc-700 rounded-xl p-2 flex items-center justify-between gap-2.5 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-white flex items-center gap-1 truncate">
                        <img
                          src={SPECIAL_ASSETS.verificado}
                          alt=""
                          className="w-3.5 h-3.5 object-contain shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playDeselect();
                      onRemoveItem(item);
                    }}
                    className="text-zinc-500 hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer shrink-0"
                    title="Quitar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals Calculation */}
        {totalDiamonds > 0 && (
          <div className="bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-cyan-500/30 rounded-xl p-3 mb-4 flex items-center justify-between text-xs">
            <span className="text-base">💎</span>
            <span className="text-cyan-400 font-mono font-black text-sm">
              +{totalDiamonds.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Action Button DAR in sidebar */}
      <div>
        <button
          id="btn-dar-desktop"
          onClick={onDarClick}
          className="w-full bg-[#facc15] hover:bg-[#eab308] active:bg-[#ca8a04] text-zinc-950 font-black text-xl py-3.5 px-4 rounded-xl tracking-wider uppercase shadow-[0_4px_20px_rgba(250,204,21,0.35)] transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <span>DAR</span>
          {selectedItems.length > 0 && (
            <span className="text-xs font-black bg-zinc-950 text-amber-300 px-2 py-0.5 rounded-full">
              {selectedItems.length}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
