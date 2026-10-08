import React, { useState } from "react";
import { SPECIAL_ASSETS } from "../data/items";
import { Volume2, VolumeX, ShieldCheck, Activity, Menu, X, Gift, Link2, Check, Server } from "lucide-react";
import { sounds } from "../utils/audio";
import { GarenaServerNode } from "../services/garenaService";

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onScrollTo: (sectionId: string) => void;
  selectedCount: number;
  currentServer?: GarenaServerNode;
  onOpenServerModal?: () => void;
  onOpenHtmlModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  onScrollTo,
  selectedCount,
  currentServer,
  onOpenServerModal,
  onOpenHtmlModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    sounds.playTap();
    const url = window.location.href;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Copy failed", err);
      }
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0d]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => onScrollTo("generator-section")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.3)] bg-black flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <img
                src={SPECIAL_ASSETS.logo}
                alt="Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                <span>FREE FIRE</span>
                <span className="text-amber-400">REWARDS</span>
              </span>
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Copy / Share Link Button */}
            <button
              onClick={handleCopyLink}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-400/50 hover:text-amber-400"
              }`}
              title="Copiar link"
            >
              {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                sounds.playTap();
                onToggleMute();
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isMuted
                  ? "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                  : "bg-amber-400/10 border-amber-400/30 text-amber-400 hover:bg-amber-400/20"
              }`}
              title={isMuted ? "Activar Sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
