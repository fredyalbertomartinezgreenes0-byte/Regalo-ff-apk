import React from "react";
import { CATEGORIES, CategoryId, SPECIAL_ASSETS } from "../data/items";
import { sounds } from "../utils/audio";

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  selectedCounts: Record<CategoryId, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  selectedCounts,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-3 mb-4">
      <div
        id="category-tabs-row"
        className="grid grid-cols-4 gap-2.5 sm:gap-3"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = selectedCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              onClick={() => {
                sounds.playTap();
                onSelectCategory(cat.id);
              }}
              className={`relative aspect-square rounded-xl p-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-[#252528] border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.45)] scale-[1.03]"
                  : "bg-[#18181b] border border-zinc-800 hover:border-zinc-700 hover:bg-[#202023] opacity-80 hover:opacity-100"
              }`}
              title={cat.description}
            >
              {/* Verified Icon badge on all category tabs (Puños, Skins, Armas, Diamantes) */}
              <div
                className="absolute top-1 left-1 z-10"
                title="Con Verificador Oficial Garena"
                aria-hidden="true"
              >
                <img
                  src={SPECIAL_ASSETS.verificado}
                  alt=""
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>

              <img
                src={cat.iconUrl}
                alt={cat.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                referrerPolicy="no-referrer"
              />

              {/* Selection Counter badge if items selected */}
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-zinc-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-zinc-900">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
