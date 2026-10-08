import React, { useState } from "react";
import { ChevronDown, HelpCircle, Shield, Clock, AlertCircle, Key } from "lucide-react";
import { sounds } from "../utils/audio";

interface FaqItem {
  question: string;
  answer: string;
  icon: typeof HelpCircle;
}

const FAQS: FaqItem[] = [
  {
    question: "¿Es seguro para mi cuenta de Free Fire?",
    answer:
      "Sí, el generador solo requiere tu ID público de jugador. Nunca solicitamos tu contraseña, datos de Facebook o Google, ni acceso a tus credenciales privadas. La entrega se realiza mediante el protocolo de regalos y buzón dentro del juego.",
    icon: Shield,
  },
  {
    question: "¿Cuánto tiempo tarda en llegar la recompensa al juego?",
    answer:
      "Normalmente los paquetes de diamantes y cajas de ítems se reflejan en tu buzón de correo en un lapso de 5 a 15 minutos tras completar la verificación. En momentos de alta demanda de servidores puede demorar hasta 30 minutos.",
    icon: Clock,
  },
  {
    question: "¿Cuántas veces puedo reclamar ítems?",
    answer:
      "Cada cuenta de Free Fire puede realizar hasta 3 solicitudes de canje por día para mantener la estabilidad de los nodos de transferencia y prevenir bloqueos automáticos.",
    icon: Key,
  },
  {
    question: "¿Qué pasa si ingresé un ID incorrecto?",
    answer:
      "Si el ID no existe en los servidores de Free Fire, el sistema mostrará un aviso antes de generar. Si el ID pertenece a otro jugador y completas el proceso, los ítems se enviarán a ese ID. Asegúrate de verificar tu ID correctamente antes de continuar.",
    icon: AlertCircle,
  },
  {
    question: "¿Funciona en Free Fire MAX y Free Fire estándar?",
    answer:
      "Sí, los ítems y diamantes son compartidos por la misma cuenta de Free Fire sin importar si juegas en la versión normal o en Free Fire MAX.",
    icon: HelpCircle,
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    sounds.playTap();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80 bg-[#0a0a0d]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1.5 inline-block">
            SOPORTE Y PREGUNTAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Respuestas claras a las dudas más comunes sobre la entrega de recompensas.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faq.icon;

            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#16161c] border-amber-500/40 shadow-lg"
                    : "bg-[#111115] border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isOpen
                          ? "bg-amber-400/20 text-amber-400"
                          : "bg-zinc-800/80 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-amber-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
