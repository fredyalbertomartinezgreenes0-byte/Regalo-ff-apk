import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  RefreshCw,
  Check,
  Copy,
} from "lucide-react";
import { PlayerProfile } from "../types";
import { SPECIAL_ASSETS } from "../data/items";
import { GarenaServerNode, fetchGarenaPlayer } from "../services/garenaService";
import { sounds } from "../utils/audio";

interface IdSearchProps {
  idValue: string;
  onIdChange: (val: string) => void;
  player: PlayerProfile | null;
  onPlayerFound: (player: PlayerProfile) => void;
  currentServer: GarenaServerNode;
  onOpenServerModal: () => void;
  hasError?: boolean;
}

export const IdSearch: React.FC<IdSearchProps> = ({
  idValue,
  onIdChange,
  player,
  onPlayerFound,
  currentServer,
  hasError = false,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const handleSearch = async (overrideId?: string) => {
    const targetId = (overrideId || idValue).trim() || "1029384756";
    if (!idValue.trim()) {
      onIdChange(targetId);
    }

    sounds.playTap();
    setIsSearching(true);
    setStatusMessage("Verificando ID en el servidor oficial...");

    try {
      const playerData = await fetchGarenaPlayer(targetId, currentServer.region);

      setTimeout(() => {
        onPlayerFound({
          id: playerData.id,
          nickname: playerData.nickname || "Jugador",
          region: playerData.region,
          level: playerData.level,
          rank: playerData.rank,
          likes: playerData.likes,
          verifiedGarena: true,
          pagoStoreVerified: true,
          pagoStoreUrl: "https://pagostore.garena.com/",
        });
        setIsSearching(false);
        setStatusMessage(null);
        sounds.playSuccess();
      }, 600);
    } catch (err) {
      setIsSearching(false);
      setStatusMessage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCopyId = () => {
    const idToCopy = idValue || player?.id || "";
    if (!idToCopy) return;
    try {
      navigator.clipboard.writeText(idToCopy);
      setCopiedId(true);
      sounds.playTap();
      setTimeout(() => setCopiedId(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-3 mb-4">
      {/* Search Input and Button matching screenshot */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            id="input-player-id"
            type="text"
            value={idValue}
            onChange={(e) => onIdChange(e.target.value.replace(/[^0-9a-zA-Z_]/g, ""))}
            onKeyDown={handleKeyDown}
            placeholder="ID"
            className={`w-full bg-white text-zinc-900 font-bold placeholder-zinc-400 px-4 py-3.5 rounded-xl text-base sm:text-lg outline-none transition-all shadow-md ${
              hasError
                ? "ring-2 ring-red-500 animate-bounce"
                : "focus:ring-2 focus:ring-[#f59e0b]"
            }`}
          />
          {idValue && (
            <button
              onClick={() => onIdChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 font-bold text-sm bg-zinc-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
              title="Borrar ID"
            >
              ×
            </button>
          )}
        </div>

        {/* Orange Search button matching screenshot */}
        <button
          id="btn-search-id"
          onClick={() => handleSearch()}
          disabled={isSearching}
          className="bg-[#f59e0b] hover:bg-[#d97706] active:bg-[#b45309] text-zinc-950 p-3.5 px-4 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 disabled:opacity-75 cursor-pointer"
          title="Verificar ID"
        >
          {isSearching ? (
            <div className="w-6 h-6 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-6 h-6 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* Searching Status Indicator */}
      {statusMessage && (
        <div className="flex items-center gap-2 mt-2 px-1 text-xs text-amber-400 font-mono animate-fadeIn">
          <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Detected Player Card (Verified ID only) */}
      {player && (
        <div
          id="player-verified-badge"
          className="mt-2.5 bg-gradient-to-r from-[#18181b] via-[#1c1c22] to-[#24242a] border border-amber-400/60 rounded-xl p-3.5 text-xs text-zinc-200 shadow-xl animate-fadeIn space-y-2"
        >
          {/* Top connection source header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold text-zinc-300">Servidor Oficial:</span>
              <span className="text-emerald-400 font-mono font-bold">Conectado</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
              <span>{player.region}</span>
            </div>
          </div>

          {/* Player Identity: ID Oficial */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Verified Avatar Badge */}
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-black shrink-0 p-1 shadow-inner">
                <img
                  src={SPECIAL_ASSETS.verificado}
                  alt="Verificado"
                  className="w-full h-full object-contain drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-zinc-400 uppercase font-mono font-bold">ID Oficial:</span>
                  <span className="font-extrabold text-amber-400 font-mono tracking-wider text-sm">
                    {player.id}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="text-zinc-500 hover:text-amber-400 p-0.5 transition-colors cursor-pointer"
                    title="Copiar ID"
                  >
                    {copiedId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ID Verificado
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

