"use client";

import { ArrowDown, ArrowUpRight, House, ShieldCheck } from "lucide-react";

export function Hero({ openQuote }: { openQuote: () => void }) {
  return <section className="crafted-hero" id="inicio" aria-labelledby="hero-title">
    <div className="energy-backdrop" aria-hidden="true"><div className="energy-atmosphere" /><div className="energy-stream"><span className="energy-core" /><span className="energy-flow" /></div><div className="energy-echo" /><div className="energy-fine-line" /></div>
    <div className="container crafted-hero-inner">
      <div className="crafted-copy">
        <p className="crafted-eyebrow"><span /> ELETRICISTA MARTINS <span className="crafted-location">PONTA GROSSA / PR</span></p>
        <h1 id="hero-title" aria-label="Precisou? Chama a Martins."><span className="crafted-title-first">Precisou?</span><span className="crafted-title-second">Chama o</span><span className="crafted-title-brand">Martins<span className="crafted-title-dot">.</span></span></h1>
        <div className="crafted-support"><p className="crafted-description">Elétrica, manutenção e reformas.<br />Um contato para cuidar do seu espaço.</p>
          <div className="crafted-actions"><button className="button button-primary" onClick={openQuote}>Solicitar orçamento <ArrowUpRight size={19} /></button><a className="crafted-services-link" href="#servicos">Conhecer os serviços <ArrowDown size={15} /></a></div>
          <div className="crafted-assurances"><span><ShieldCheck size={16} /> Atendimento profissional</span><span><House size={16} /> Casa e empresa</span></div>
        </div>
      </div>

    </div>
    <div className="container crafted-hero-bottom"><span>ELÉTRICA <i /> MANUTENÇÃO <i /> REFORMAS</span><a href="#servicos">ENCONTRE A SUA SOLUÇÃO <ArrowDown size={13} /></a></div>
  </section>;
}
