import React from "react";
import { UserCheck, Sparkles, Inbox, ShieldAlert } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: UserCheck,
      title: "Ingresa tu ID de Jugador",
      desc: "Escribe tu ID numérico de Free Fire (o pulsa la lupa para buscar tu perfil). No pedimos contraseña ni acceso a redes sociales.",
      accent: "from-amber-500/20 to-yellow-500/5",
      border: "border-amber-500/30",
      textAccent: "text-amber-400",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "Selecciona tus Recompensas",
      desc: "Navega entre Puños Evolutivos, Ropa Legendaria, Armas y Diamantes. Marca todos los ítems que desees enviar a tu inventario.",
      accent: "from-cyan-500/20 to-blue-500/5",
      border: "border-cyan-500/30",
      textAccent: "text-cyan-400",
    },
    {
      num: "03",
      icon: Inbox,
      title: "Verifica y Recibe en el Buzón",
      desc: "Presiona 'DAR' y confirma tu sesión. Abre tu juego de Free Fire y revisa el apartado del Buzón de Correo en 5 a 15 minutos.",
      accent: "from-emerald-500/20 to-green-500/5",
      border: "border-emerald-500/30",
      textAccent: "text-emerald-400",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80 bg-[#0c0c10]/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1.5 inline-block">
            GUÍA DE CANJE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ¿Cómo Funciona el Generador?
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Tres pasos directos y seguros para sincronizar tus recompensas con los servidores de juego.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative bg-[#141418] border ${step.border} rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl bg-gradient-to-b ${step.accent}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${step.textAccent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-zinc-700/60 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
