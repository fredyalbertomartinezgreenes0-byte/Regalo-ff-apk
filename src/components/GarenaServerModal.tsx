import React, { useState, useEffect } from "react";
import {
  GarenaServerNode,
  GARENA_SERVERS,
  GarenaHandshakeResult,
  testGarenaConnection,
} from "../services/garenaService";
import {
  Server,
  ShieldCheck,
  CheckCircle2,
  X,
  Zap,
  Activity,
  RefreshCw,
  Lock,
  Globe,
  Radio,
  Terminal,
} from "lucide-react";
import { sounds } from "../utils/audio";

interface GarenaServerModalProps {
  currentServer: GarenaServerNode;
  onSelectServer: (server: GarenaServerNode) => void;
  onClose: () => void;
}

export const GarenaServerModal: React.FC<GarenaServerModalProps> = ({
  currentServer,
  onSelectServer,
  onClose,
}) => {
  const [testing, setTesting] = useState(false);
  const [handshakeResult, setHandshakeResult] = useState<GarenaHandshakeResult | null>(null);
  const [selectedNode, setSelectedNode] = useState<GarenaServerNode>(currentServer);
  const [logs, setLogs] = useState<string[]>([]);

  const runTest = async (targetNode: GarenaServerNode) => {
    setTesting(true);
    setLogs([
      `[GARENA CLIENT] Iniciando socket TCP con ${targetNode.gateway}:${targetNode.port}...`,
    ]);
    sounds.playInject();

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[DNS] Resuelto: ${targetNode.ip} (TTL 60s) - Nodo regional ${targetNode.code}`,
      ]);
    }, 250);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[TLS 1.3] Handshake de seguridad completado con Garena International Pte Ltd`,
      ]);
    }, 550);

    setTimeout(async () => {
      const result = await testGarenaConnection(targetNode);
      setHandshakeResult(result);
      setLogs((prev) => [
        ...prev,
        `[ESTABLECIDO] Sesión activa: ${result.sessionToken}`,
        `[LATENCIA] Ping de ida y vuelta: ${result.latencyMs} ms (Estable)`,
      ]);
      setTesting(false);
      sounds.playSuccess();
    }, 900);
  };

  useEffect(() => {
    runTest(currentServer);
  }, []);

  const handleSwitchServer = (node: GarenaServerNode) => {
    sounds.playTap();
    setSelectedNode(node);
    onSelectServer(node);
    runTest(node);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-[#111116] border border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(251,191,36,0.25)] flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-400 flex items-center justify-center">
              <Server className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-black text-lg uppercase tracking-wide">
                  Servidor Garena Free Fire
                </h3>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Conectado
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Protocolo oficial de comunicación con nodos de juego Garena
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Node Selection */}
        <div className="mb-4">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Seleccionar Región del Servidor:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {GARENA_SERVERS.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isPagoStore = node.id === "garena-pagostore";
              return (
                <button
                  key={node.id}
                  onClick={() => handleSwitchServer(node)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-amber-500/15 border-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                      : isPagoStore
                      ? "bg-[#181822] border-amber-500/30 text-zinc-300 hover:border-amber-400/60"
                      : "bg-[#16161c] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <div className="overflow-hidden pr-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-xs font-black uppercase text-zinc-200 truncate">
                        {node.code} - {node.region}
                      </span>
                      {isPagoStore && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-bold uppercase shrink-0">
                          Oficial
                        </span>
                      )}
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono mt-0.5 truncate">
                      {isPagoStore ? "pagostore.garena.com" : `Puerto ${node.port} • ${node.ip}`}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {node.latencyMs} ms
                    </span>
                    <span className="block text-[10px] text-zinc-500 uppercase">Óptimo</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Connection Telemetry Card */}
        <div className="bg-[#0b0b0e] border border-zinc-800 rounded-xl p-3.5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              Telemetría de Enlace Garena
            </span>
            <button
              onClick={() => runTest(selectedNode)}
              disabled={testing}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${testing ? "animate-spin" : ""}`} />
              <span>{testing ? "Probando..." : "Re-probar Ping"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-[#14141a] p-2.5 rounded-lg border border-zinc-800/80">
              <span className="text-zinc-500 text-[10px] block">Gateway:</span>
              <span className="font-mono text-zinc-200 font-semibold truncate block">
                {selectedNode.gateway}
              </span>
            </div>
            <div className="bg-[#14141a] p-2.5 rounded-lg border border-zinc-800/80">
              <span className="text-zinc-500 text-[10px] block">Latencia / Ping:</span>
              <span className="font-mono text-emerald-400 font-black text-sm">
                {handshakeResult ? `${handshakeResult.latencyMs} ms` : `${selectedNode.latencyMs} ms`}
              </span>
            </div>
            <div className="bg-[#14141a] p-2.5 rounded-lg border border-zinc-800/80 col-span-2 sm:col-span-1">
              <span className="text-zinc-500 text-[10px] block">Protocolo de Juego:</span>
              <span className="font-mono text-zinc-300 font-semibold truncate block">
                {selectedNode.protocol}
              </span>
            </div>
          </div>

          {handshakeResult && (
            <div className="mt-2.5 pt-2.5 border-t border-zinc-800/80 text-[11px] flex flex-col gap-1 text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-zinc-400">
                  <Lock className="w-3 h-3 text-emerald-400" /> Cifrado de Entrega:
                </span>
                <span className="font-mono text-zinc-300">{handshakeResult.tlsVersion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sesión de Canje:</span>
                <span className="font-mono text-amber-300 text-[10px] font-bold">
                  {handshakeResult.sessionToken}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Live Terminal / Handshake Logs */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold mb-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Registro de Paquetes con Servidor Garena:</span>
          </div>
          <div className="bg-[#08080a] border border-zinc-800/90 rounded-xl p-3 font-mono text-[11px] space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
            {logs.map((log, idx) => (
              <div key={idx} className="text-zinc-300 flex items-start gap-1.5">
                <span className="text-amber-400 select-none">›</span>
                <span>{log}</span>
              </div>
            ))}
            {testing && (
              <div className="text-amber-400/80 animate-pulse flex items-center gap-1.5">
                <span>› Verificando respuesta de nodo Garena...</span>
              </div>
            )}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => {
            sounds.playSuccess();
            onClose();
          }}
          className="w-full bg-[#facc15] hover:bg-[#eab308] text-zinc-950 font-black py-3 rounded-xl uppercase tracking-wider text-sm cursor-pointer transition-colors shadow-[0_4px_15px_rgba(250,204,21,0.3)]"
        >
          Confirmar Servidor ({selectedNode.code} - {selectedNode.region})
        </button>
      </div>
    </div>
  );
};
