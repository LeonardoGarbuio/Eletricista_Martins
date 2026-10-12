import { Site } from "@/components/site";
import { business } from "@/config/business";
export default function Page() {
  // Dados comerciais limitados ao briefing fornecido. Sem endereço ou avaliações inventados.
  const schema = { "@context": "https://schema.org", "@type": "Electrician", name: business.name, url: business.siteUrl, areaServed: { "@type": "City", name: "Ponta Grossa", containedInPlace: { "@type": "State", name: "Paraná" } }, sameAs: [business.instagram], ...(business.whatsapp ? { telephone: `+${business.whatsapp}` } : {}) };
  return <>{business.indexable && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}<Site /></>;
}
