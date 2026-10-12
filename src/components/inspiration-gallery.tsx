"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { portfolio } from "@/config/business";

export function InspirationGallery({ onEnlarge, onRequest }: { onEnlarge: (index: number) => void; onRequest: (serviceId: string) => void }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const item = portfolio[active];
  function choose(index: number) { setFailed(false); setActive((index + portfolio.length) % portfolio.length); }

  return <section className="inspiration-section" id="inspiracao" aria-labelledby="inspiration-title">
    <div className="container">
      <div className="inspiration-heading"><div><p className="eyebrow"><span /> UM NOVO OLHAR PARA O SEU ESPAÇO</p><h2 id="inspiration-title">Pequenas mudanças.<br /><span>Novas possibilidades.</span></h2></div><div className="inspiration-heading-aside"><p>Explore uma ideia.<br />Encontre o seu próximo passo.</p><span>REFERÊNCIAS VISUAIS / 01—03</span></div></div>

      <div className="inspiration-showcase" role="region" aria-label="Vitrine de inspirações" aria-roledescription="carrossel">
        <div className="inspiration-image" onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }} onTouchEnd={event => { const start = touch.current; touch.current = null; if (!start || !event.changedTouches.length) return; const end = event.changedTouches[0]; const dx = end.clientX - start.x; const dy = end.clientY - start.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) choose(active + (dx < 0 ? 1 : -1)); }}>
          {!failed ? <Image key={item.src} src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 60vw, 800px" quality={85} onError={() => setFailed(true)} /> : <div className="inspiration-image-error"><p>Não foi possível carregar esta referência.</p><button className="text-link" onClick={() => choose(active + 1)}>Ver outra imagem <ChevronRight size={17} /></button></div>}
          <span className="inspiration-image-disclaimer">REFERÊNCIA GERADA POR IA</span>
          <div className="inspiration-image-meta"><span>{String(active + 1).padStart(2, "0")} <i /> {item.theme.toUpperCase()}</span><button className="inspiration-enlarge" onClick={() => onEnlarge(active)} disabled={failed} aria-label={`Ampliar imagem: ${item.title}`}><span>Ver de perto</span><ZoomIn size={19} /></button></div>
        </div>

        <div className="inspiration-story"><div className="inspiration-story-top"><span>O SEU ESPAÇO PODE MAIS.</span><span className="inspiration-story-index">{String(active + 1).padStart(2, "0")}<small>/03</small></span></div><div className="inspiration-story-copy" key={active}><span className="inspiration-story-category">{item.category}</span><h3>{item.headline[0]}<br /><em>{item.headline[1]}</em></h3><p>{item.description}</p><button className="text-link inspiration-request" onClick={() => onRequest(item.serviceId)}>{item.action}<ArrowUpRight size={19} /></button></div><div className="inspiration-controls"><span>ESCOLHA SEU PRÓXIMO OLHAR</span><div><button className="icon-button" onClick={() => choose(active - 1)} aria-label="Referência anterior"><ChevronLeft size={18} /></button><button className="icon-button" onClick={() => choose(active + 1)} aria-label="Próxima referência"><ChevronRight size={18} /></button></div></div></div>
      </div>

      <div className="inspiration-index" role="group" aria-label="Escolher tema da inspiração">{portfolio.map((reference, index) => <button key={reference.src} className={active === index ? "active" : ""} onClick={() => choose(index)} aria-pressed={active === index} aria-label={`Ver referência de ${reference.theme.toLowerCase()}`}><span className="inspiration-thumb"><Image src={reference.src} alt="" fill sizes="76px" /></span><span className="inspiration-index-text"><small>0{index + 1} / EXPLORE</small><strong>{reference.theme}</strong></span><span className="inspiration-index-arrow"><ArrowUpRight size={18} /></span></button>)}</div>
      <div className="inspiration-bottom"><p>Imagens geradas por IA para inspiração. Não representam obras da Martins.</p><span>Gostou de uma ideia? Conte para a gente.</span></div>
      <p className="sr-only" role="status">Referência {active + 1} de {portfolio.length}: {item.title}. {item.description}</p>
    </div>
  </section>;
}
