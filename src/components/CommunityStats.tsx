import React from "react";
import { Gift, Zap, Users, ShieldCheck } from "lucide-react";

export const CommunityStats: React.FC = () => {
  const stats = [
    {
      label: "Ítems Entregados Hoy",
      value: "48,294",
      icon: Gift,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Diamantes Reclamados",
      value: "14,820,000",
      icon: Zap,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Sobrevivientes en Línea",
      value: "1,489",
      icon: Users,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Tasa de Efectividad",
      value: "99.8%",
      icon: ShieldCheck,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-[#131317] border border-zinc-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-zinc-400 text-[11px] block font-medium leading-tight">
                  {stat.label}
                </span>
                <span className="text-white text-base sm:text-lg font-black font-mono">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
