import { ArrowUpRight, Building2, Factory, HeartPulse, House, MapPin, Pill, ShoppingCart, Store } from "lucide-react";

const segments = [
  { title: "Residências", description: "Casas e apartamentos, dos reparos às novas instalações.", icon: House },
  { title: "Comércios e empresas", description: "Soluções elétricas para o espaço e a rotina do seu negócio.", icon: Store },
  { title: "Condomínios", description: "Atendimento para áreas comuns e necessidades do condomínio.", icon: Building2 },
  { title: "Farmácias", description: "Instalações e manutenção para o ambiente comercial.", icon: Pill },
  { title: "Franquias", description: "Demandas elétricas para implantação e manutenção de unidades.", icon: Store },
  { title: "Supermercados", description: "Atendimento às necessidades elétricas da operação.", icon: ShoppingCart },
  { title: "Hospitais", description: "Demandas institucionais avaliadas conforme o escopo do serviço.", icon: HeartPulse },
  { title: "Área industrial", description: "Instalações e manutenção conforme a necessidade do projeto.", icon: Factory },
];

export function WhoWeServe({ openQuote }: { openQuote: () => void }) {
  return <section className="section segments-section" id="quem-atendemos" aria-labelledby="segments-title">
    <div className="container">
      <div className="section-heading reveal">
        <div><p className="eyebrow"><span /> QUEM ATENDEMOS</p><h2 id="segments-title">Da sua casa<br /><span>à sua operação.</span></h2></div>
        <p>A Martins atende residências, comércios, empresas e instituições. Cada demanda recebe atenção ao espaço, à rotina e ao que o serviço exige.</p>
      </div>
      <div className="segments-grid">
        {segments.map(({ title, description, icon: Icon }) => <article className="segment-card" key={title}>
          <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
          <h3>{title}</h3><p>{description}</p>
        </article>)}
      </div>
      <div className="segments-coverage">
        <MapPin size={25} strokeWidth={1.5} aria-hidden="true" />
        <div><p className="coverage-label">PONTA GROSSA E REGIÃO · PR</p><h3>Atendimento em outros estados mediante consulta.</h3><p>Conte onde será o serviço. A equipe avalia o escopo, o deslocamento e a disponibilidade com você.</p></div>
        <button className="text-link" onClick={openQuote}>Conversar sobre minha demanda <ArrowUpRight size={17} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}
