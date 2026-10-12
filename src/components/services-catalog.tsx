"use client";
import { useState } from "react";
import { ArrowRight, Check, Plus, Search, X, SlidersHorizontal } from "lucide-react";
import { services, type Category } from "@/data/services";
import { ServiceIcon } from "./icons";

function normalize(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
export function ServicesCatalog({ selected, toggle, openQuote }: { selected: string[]; toggle: (id: string) => void; openQuote: () => void }) {
  const [category, setCategory] = useState<Category | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const matching = services.filter(s => (category === "Todos" || s.category === category) && normalize(s.title + " " + s.description).includes(normalize(query.trim())));
  const visible = category === "Todos" && !query.trim() && !expanded ? matching.filter(s => s.featured) : matching;
  return <section className="section services-section" id="servicos" aria-labelledby="services-title">
    <div className="container">
      <div className="section-heading reveal"><div><p className="eyebrow"><span /> SOLUÇÕES PARA O SEU DIA A DIA</p><h2 id="services-title">O que você precisa,<br /><span className="muted">a gente resolve.</span></h2></div><p>Da tomada que parou de funcionar à transformação de um ambiente. Encontre o serviço e dê o primeiro passo.</p></div>
      <div className="catalog-toolbar"><div className="filter-list" role="group" aria-label="Filtrar serviços por categoria">{(["Todos", "Elétrica", "Manutenção", "Reformas"] as const).map(item => <button key={item} className={`filter ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "Todos" && <SlidersHorizontal size={14} />}{item}</button>)}</div><label className="search-field"><Search size={17} aria-hidden="true" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar um serviço" aria-label="Buscar um serviço" />{query && <button onClick={() => setQuery("")} aria-label="Limpar busca"><X size={15} /></button>}</label></div>
      <p className="sr-only" role="status">{visible.length} serviços encontrados. {selected.length} selecionados.</p>
      <div className="services-grid">{visible.map((service, index) => {
        const active = selected.includes(service.id);
        return <article key={service.id} className={`service-card ${active ? "selected" : ""}`}>
          <div className="service-top"><ServiceIcon name={service.icon} size={31} /><span className="service-number">{String(services.indexOf(service) + 1).padStart(2, "0")}</span></div>
          <span className="service-category">{service.category}{service.category !== "Elétrica" && " · PARCEIROS"}</span>
          <h3>{service.title}</h3><p>{service.description}</p>
          <button className="service-action" aria-pressed={active} aria-label={`${active ? "Remover" : "Solicitar"} ${service.title}`} onClick={() => toggle(service.id)}><span>{active ? "Serviço selecionado" : "Solicitar este serviço"}</span><span className="service-add">{active ? <Check size={17} /> : <Plus size={17} />}</span></button>
        </article>;
      })}</div>
      {visible.length === 0 && <div className="empty-state"><Search size={30} /><h3>Não encontramos esse serviço.</h3><p>Tente outro termo ou conte sua necessidade no serviço de reparos gerais.</p><button className="button button-outline" onClick={() => { setQuery(""); setCategory("Todos"); setExpanded(true); }}>Ver todos os serviços <ArrowRight size={16} /></button></div>}
      <div className="catalog-bottom"><p><span className="tiny-dot" /> Serviços complementares podem ser realizados por profissionais parceiros.</p>{category === "Todos" && !query.trim() && <button className="text-link" onClick={() => setExpanded(!expanded)}>{expanded ? "Mostrar principais serviços" : "Explorar todos os 15 serviços"}<ArrowRight size={17} className={expanded ? "rotate-up" : ""} /></button>}</div>
      {selected.length > 0 && <div className="selection-summary" role="region" aria-label="Serviços selecionados"><div><span className="selection-check"><Check size={20} /></span><div><strong>{selected.length} {selected.length === 1 ? "serviço selecionado" : "serviços selecionados"}</strong><p>{services.filter(s => selected.includes(s.id)).map(s => s.title).join(" · ")}</p></div></div><button className="button button-primary" onClick={openQuote}>Continuar orçamento <ArrowRight size={17} /></button></div>}
    </div>
  </section>;
}
