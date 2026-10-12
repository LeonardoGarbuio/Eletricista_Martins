export const business = {
  name: "Eletricista Martins",
  location: "Ponta Grossa / PR",
  city: "Ponta Grossa",
  state: "PR",
  instagram: "https://www.instagram.com/eletricistamartinspontagrossa/",
  instagramHandle: "@eletricistamartinspontagrossa",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://eletricistamartinspg.com",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  // Logotipo original enviado pelo usuário, preservado sem redesenho.
  logoPath: "/brand/logo-martins-original.png",
};

export const portfolio = [
  { src: "/images/inspiration-lighting.webp", title: "Luz que transforma ambientes", category: "ILUMINAÇÃO RESIDENCIAL", alt: "Referência gerada por IA de sala residencial com luminária pendente, spots e iluminação quente ao entardecer", theme: "Iluminação", headline: ["Outra luz.", "Outro clima."], description: "Luminárias e pontos de luz para dar uma nova leitura ao seu ambiente.", serviceId: "iluminacao", action: "Quero cuidar da iluminação" },
  { src: "/images/inspiration-electrical.webp", title: "Cada detalhe, uma solução", category: "INSTALAÇÕES E MANUTENÇÃO", alt: "Referência gerada por IA de quadro de distribuição residencial e ferramentas de eletricista", theme: "Elétrica", headline: ["Por trás do espaço,", "uma boa instalação."], description: "Instalações e manutenção elétrica para a rotina da sua casa ou empresa.", serviceId: "instalacoes", action: "Quero uma solução elétrica" },
  { src: "/images/inspiration-renovation.webp", title: "Novas possibilidades para seu espaço", category: "REFORMAS E ACABAMENTOS", alt: "Referência gerada por IA de cozinha renovada com revestimento cerâmico e armários de madeira", theme: "Reformas", headline: ["Seu espaço.", "Novos caminhos."], description: "Reparos e acabamentos coordenados com profissionais parceiros, conforme sua necessidade.", serviceId: "pedreiro", action: "Quero conversar sobre reformas" },
];
