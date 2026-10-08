import React from "react";
import { SPECIAL_ASSETS } from "../data/items";
import { ShieldCheck, Lock, ArrowUp } from "lucide-react";
import { sounds } from "../utils/audio";

interface FooterProps {
  onScrollToTop: () => void;
  onOpenHtmlModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="w-full bg-[#070709] border-t border-zinc-800 text-zinc-400 text-xs py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md overflow-hidden border border-amber-400/40">
            <img
              src={SPECIAL_ASSETS.logo}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playTap();
              onScrollToTop();
            }}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 font-bold cursor-pointer transition-colors py-1.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40"
            title="Volver arriba"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
