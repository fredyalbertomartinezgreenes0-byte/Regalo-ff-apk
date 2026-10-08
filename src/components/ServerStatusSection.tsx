import React from "react";
import { Server, ShieldCheck, CheckCircle2, Wifi, Users, Zap, Radio, Terminal } from "lucide-react";
import { GARENA_SERVERS, GarenaServerNode } from "../services/garenaService";
import { sounds } from "../utils/audio";

interface ServerStatusSectionProps {
  currentServer?: GarenaServerNode;
  onSelectServer?: (server: GarenaServerNode) => void;
  onOpenModal?: () => void;
}

export const ServerStatusSection: React.FC<ServerStatusSectionProps> = ({
  currentServer,
  onSelectServer,
  onOpenModal,
}) => {
  return (
    <section id="server-status" className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80 bg-[#0e0e12]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-emerald-400 text-xs font-black tracking-widest uppercase mb-1.5 inline-block">
              INFRAESTRUCTURA DE CONEXIÓN GARENA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Estado de los Servidores Garena Free Fire
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Monitoreo y enlace en tiempo real con los nodos oficiales de entrega y protocolo de Garena Free Fire.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playTap();
                onOpenModal?.();
              }}
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-transform active:scale-95"
            >
              <Terminal className="w-4 h-4" />
              <span>Diagnóstico de Red Garena</span>
            </button>

            <div className="flex items-center gap-2 bg-[#16161b] border border-emerald-500/30 rounded-2xl px-3.5 py-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-xs">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">ESTADO GLOBAL:</span>
                <span className="text-emerald-400 font-extrabold text-xs sm:text-sm">NODOS GARENA ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Server grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GARENA_SERVERS.map((srv) => {
            const isConnected = currentServer?.id === srv.id;
            return (
              <div
                key={srv.id}
                className={`rounded-2xl p-4 flex flex-col justify-between transition-all border ${
                  isConnected
                    ? "bg-[#181822] border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                    : "bg-[#141418] border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Server className={`w-4 h-4 ${isConnected ? "text-amber-400" : "text-zinc-400"}`} />
                      <span className="text-xs font-bold text-white truncate max-w-[170px]">
                        {srv.name}
                      </span>
                    </div>
                    {isConnected ? (
                      <span className="flex items-center gap-1 text-[10px] text-amber-300 font-black bg-amber-500/20 border border-amber-400/50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        ACTIVO
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        ONLINE
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                    <div className="flex justify-between">
                      <span>Gateway:</span>
                      <span className="text-zinc-300 truncate max-w-[120px]">{srv.gateway}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Puerto TCP:</span>
                      <span className="text-zinc-200 font-bold">{srv.port}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latencia / Ping:</span>
                      <span className="text-emerald-400 font-bold">{srv.latencyMs} ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IP Nodo:</span>
                      <span className="text-zinc-400">{srv.ip}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {srv.code} • {srv.protocol}
                  </span>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      onSelectServer?.(srv);
                      onOpenModal?.();
                    }}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      isConnected
                        ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    {isConnected ? "Conectado" : "Conectar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
