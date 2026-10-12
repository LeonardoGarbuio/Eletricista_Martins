"use client";

import { ArrowRight, ArrowUpRight, CalendarDays, Check, MessageCircle, MousePointer2 } from "lucide-react";
import { services } from "@/data/services";
import { formatDate, type QuoteDetails } from "@/lib/quote";

const steps = [
  {
    title: "Escolha o que precisa",
    description: "Encontre os serviços para seu espaço. Se precisar de mais de um, reúna tudo no mesmo pedido.",
    label: "OS SERVIÇOS", action: "Encontrar meu serviço",
  },
  {
    title: "Diga onde e quando",
    description: "Conte os detalhes e indique uma data e um período de preferência para o atendimento.",
    label: "SUA PREFERÊNCIA", action: "Solicitar um horário",
  },
  {
    title: "Combine com a equipe",
    description: "Envie o resumo pelo WhatsApp. A equipe analisa e conversa com você para combinar o serviço.",
    label: "A CONVERSA", action: "Preparar minha solicitação",
  },
];

export function HowItWorks({ selected, details, openQuote }: { selected: string[]; details: QuoteDetails; openQuote: () => void }) {
  const chosen = services.filter(service => selected.includes(service.id));
  const icons = [MousePointer2, CalendarDays, MessageCircle];
  return <section className="how-section section how-connected" id="como-funciona" aria-labelledby="how-title">
    <div className="container">
      <div className="how-connected-heading">
        <p className="eyebrow"><span /> SIMPLES DO INÍCIO AO FIM</p>
        <h2 id="how-title">Da sua necessidade<br /><span>ao atendimento.</span></h2>
        <p>Um caminho fácil para explicar o que precisa<br className="how-title-break" /> e combinar o próximo passo com a Martins.</p>
      </div>
      <ol className="how-journey">
        {steps.map((item, index) => {
          const Icon = icons[index];
          return <li className="how-milestone" key={item.title}>
            <div className="how-node" aria-hidden="true"><span className="how-node-number">{String(index + 1).padStart(2, "0")}</span><span className="how-node-icon"><Icon size={17} strokeWidth={1.5} /></span></div>
            <div className="how-milestone-copy"><span className="how-phase-label">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p>{index === 0 ? <a className="text-link" href="#servicos">{item.action}<ArrowUpRight size={15} /></a> : <button className="text-link" onClick={openQuote}>{item.action}<ArrowUpRight size={15} /></button>}</div>
          </li>;
        })}
      </ol>
      <div className="how-assurance"><span className="how-assurance-check"><Check size={14} /></span><p>Você indica a preferência.<strong> A equipe confirma a disponibilidade com você.</strong></p></div>
      {chosen.length > 0 && <div className="how-current-request"><span>{chosen.length} {chosen.length === 1 ? "serviço já escolhido" : "serviços já escolhidos"}{details.date ? ` · ${formatDate(details.date)}` : ""}</span><button className="text-link" onClick={openQuote}>Continuar meu pedido <ArrowRight size={15} /></button></div>}
    </div>
  </section>;
}
