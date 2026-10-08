import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Copy,
  Check,
  Download,
  Code2,
  FileCode,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { sounds } from "../utils/audio";

interface HtmlViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlViewerModal: React.FC<HtmlViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"rendered" | "clean">("rendered");
  const [searchQuery, setSearchQuery] = useState("");
  const [rawHtml, setRawHtml] = useState("");

  // Generate clean, formatted HTML representation of the document
  useEffect(() => {
    if (!isOpen) return;

    try {
      if (typeof document !== "undefined") {
        // Clone document element to clean up scripts if needed
        const clone = document.documentElement.cloneNode(true) as HTMLElement;
        
        // Format HTML with doctype
        const docTypeString = "<!DOCTYPE html>\n";
        const fullHtml = docTypeString + clone.outerHTML;
        setRawHtml(fullHtml);
      }
    } catch (e) {
      setRawHtml("<!DOCTYPE html>\n<html>\n<head>\n  <title>Portal de Recompensas</title>\n</head>\n<body>\n  <!-- Error al leer DOM en vivo -->\n</body>\n</html>");
    }
  }, [isOpen]);

  // Clean standalone exportable HTML template
  const standaloneHtml = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal de Canje de Recompensas</title>
  <meta name="description" content="Portal interactivo de canje de recompensas, skins, armas evolutivas y diamantes.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #0b0b0e;
      color: #f4f4f5;
    }
  </style>
</head>
<body class="min-h-screen bg-[#0b0b0e] text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950">
  <!-- Portal de Recompensas y Canje -->
  <main class="w-full max-w-xl mx-auto px-3 py-6 space-y-4">
    <!-- Barra Superior de Recursos -->
    <div class="bg-[#111113] border border-amber-400/80 rounded-2xl py-2.5 px-4 flex items-center justify-between shadow-lg">
      <div class="flex items-center gap-2 font-mono font-black text-amber-400">
        <span>🪙 999.999.999</span>
      </div>
      <div class="flex items-center gap-2 font-mono font-black text-cyan-400">
        <span>💎 999.999.999</span>
      </div>
      <div class="bg-amber-950/40 border border-amber-500/40 rounded-full px-2.5 py-1 text-amber-400 font-black text-xs uppercase">
        ✓ VERIFIED
      </div>
    </div>

    <!-- Título Principal -->
    <div class="text-center py-2">
      <span class="text-[10px] font-extrabold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2.5 py-1 rounded-full">
        SISTEMA DE TRANSFERENCIA DIRECTA
      </span>
      <h1 class="text-2xl sm:text-3xl font-black text-white mt-2">
        Canjea Recompensas y Diamantes
      </h1>
      <p class="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
        Ingresa tu ID, selecciona tus ítems favoritos y pulsa DAR para sincronizar con tu buzón.
      </p>
    </div>

    <!-- Barra de Conexión PagoStore Oficial -->
    <div class="bg-[#121217] border border-amber-500/30 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <a href="https://pagostore.garena.com/" target="_blank" class="text-white font-bold hover:text-amber-300">
          pagostore.garena.com
        </a>
        <span class="text-[10px] text-zinc-400">• Oficial</span>
      </div>
      <span class="text-emerald-400 font-mono text-[11px] font-bold bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
        14ms
      </span>
    </div>

    <!-- Formulario de Búsqueda de ID -->
    <div class="flex items-center gap-2">
      <input
        type="text"
        placeholder="Ingresa tu ID de Free Fire"
        class="w-full bg-white text-zinc-900 font-bold placeholder-zinc-400 px-4 py-3.5 rounded-xl text-base outline-none focus:ring-2 focus:ring-amber-500 shadow-md"
      />
      <button class="bg-[#f59e0b] hover:bg-[#d97706] text-zinc-950 font-black p-3.5 px-5 rounded-xl text-base shadow-md cursor-pointer">
        🔍
      </button>
    </div>

    <!-- Categorías -->
    <div class="grid grid-cols-4 gap-2.5 pt-2">
      <button class="bg-[#252528] border-2 border-amber-400 rounded-xl p-3 flex flex-col items-center justify-center font-black text-xs text-white">
        🥊 Puños
      </button>
      <button class="bg-[#18181b] border border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center font-bold text-xs text-zinc-300">
        👕 Ropa
      </button>
      <button class="bg-[#18181b] border border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center font-bold text-xs text-zinc-300">
        🔫 Armas
      </button>
      <button class="bg-[#18181b] border border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center font-bold text-xs text-zinc-300">
        💎 Diamantes
      </button>
    </div>
  </main>
</body>
</html>`;
  }, []);

  const displayedHtml = activeTab === "rendered" ? rawHtml : standaloneHtml;

  const filteredLines = useMemo(() => {
    const lines = displayedHtml.split("\n");
    if (!searchQuery.trim()) return lines;
    const query = searchQuery.toLowerCase();
    return lines.filter((line) => line.toLowerCase().includes(query));
  }, [displayedHtml, searchQuery]);

  const handleCopyHtml = async () => {
    sounds.playTap();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(displayedHtml);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = displayedHtml;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      sounds.playSuccess();
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy HTML", err);
    }
  };

  const handleDownloadHtml = () => {
    sounds.playTap();
    try {
      const blob = new Blob([displayedHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = activeTab === "rendered" ? "pagina-completa.html" : "portal-recompensas.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      sounds.playSuccess();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#111116] border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden text-zinc-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600/20 via-[#181822] to-transparent border-b border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base sm:text-lg">
                  Visor de Código HTML
                </h3>
                <span className="text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-mono uppercase">
                  HTML5
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Visualiza, inspecciona y copia el código HTML completo del portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Cerrar visor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Action Controls */}
        <div className="p-3 sm:p-4 bg-[#14141c] border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center bg-[#0d0d12] border border-zinc-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab("rendered");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "rendered"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>HTML DOM Completo</span>
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab("clean");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "clean"
                  ? "bg-amber-500 text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Plantilla Limpia Standalone</span>
            </button>
          </div>

          {/* Search Filter */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el código..."
              className="w-full bg-[#0d0d12] border border-zinc-700/80 focus:border-amber-400 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none font-mono"
            />
          </div>

          {/* Primary Action Buttons: COPY HTML & DOWNLOAD */}
          <div className="flex items-center gap-2">
            <button
              id="btn-copy-html-inside-modal"
              onClick={handleCopyHtml}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-zinc-950"
                  : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 active:scale-95"
              }`}
              title="Copiar todo el código HTML al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡HTML Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar HTML</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Descargar archivo .html"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar .html</span>
            </button>
          </div>
        </div>

        {/* Code Content Viewport */}
        <div className="flex-1 overflow-auto bg-[#0a0a0e] p-4 font-mono text-xs leading-relaxed scrollbar-thin select-text">
          <pre className="text-zinc-300 whitespace-pre-wrap break-all font-mono">
            <code>
              {filteredLines.map((line, idx) => (
                <div key={idx} className="flex hover:bg-zinc-900/60 px-1 rounded py-0.5">
                  <span className="w-12 text-zinc-600 select-none text-right pr-3 shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      line.includes("<") || line.includes(">")
                        ? "text-amber-200/90"
                        : line.includes("class=")
                        ? "text-emerald-300/90"
                        : "text-zinc-300"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Bottom Status Footer */}
        <div className="p-3 bg-[#111116] border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>HTML5 Válido</span>
            </span>
            <span className="font-mono text-zinc-500">
              {displayedHtml.split("\n").length} líneas
            </span>
            <span className="font-mono text-zinc-500">
              {(displayedHtml.length / 1024).toFixed(1)} KB
            </span>
          </div>

          <button
            onClick={handleCopyHtml}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer hover:underline"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar HTML al portapapeles</span>
          </button>
        </div>
      </div>
    </div>
  );
};
