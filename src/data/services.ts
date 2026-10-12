export type ServiceIcon = "bolt" | "circuit" | "shower" | "light" | "plug" | "building" | "brick" | "hammer" | "tiles" | "pipe" | "paint" | "gutter" | "roof" | "garden" | "tools";
export type Category = "Elétrica" | "Manutenção" | "Reformas";
export type Service = { id: string; title: string; description: string; category: Category; icon: ServiceIcon; featured?: boolean };
export const services: Service[] = [
  { id: "instalacoes", title: "Instalações elétricas", description: "Infraestrutura elétrica para construir, ampliar ou renovar seu espaço.", category: "Elétrica", icon: "bolt", featured: true },
  { id: "manutencao", title: "Manutenção elétrica", description: "Avaliação e correção de falhas para a sua rotina continuar funcionando.", category: "Elétrica", icon: "circuit", featured: true },
  { id: "iluminacao", title: "Iluminação e luminárias", description: "A luz certa faz a diferença. Instalação e substituição de luminárias.", category: "Elétrica", icon: "light", featured: true },
  { id: "chuveiros", title: "Instalação de chuveiros", description: "Instalação e troca de chuveiros com avaliação das condições elétricas.", category: "Elétrica", icon: "shower", featured: true },
  { id: "tomadas", title: "Tomadas e interruptores", description: "Trocas, novos pontos e pequenos reparos elétricos no seu imóvel.", category: "Elétrica", icon: "plug", featured: true },
  { id: "residencial-comercial", title: "Elétrica residencial e comercial", description: "Soluções elétricas para as necessidades da sua casa ou do seu negócio.", category: "Elétrica", icon: "building" },
  { id: "pedreiro", title: "Serviços de pedreiro", description: "Alvenaria e intervenções para transformar seu imóvel.", category: "Reformas", icon: "brick", featured: true },
  { id: "carpintaria", title: "Carpintaria", description: "Ajustes e serviços em estruturas e elementos de madeira.", category: "Reformas", icon: "hammer" },
  { id: "azulejista", title: "Azulejista", description: "Assentamento e reparos em pisos e revestimentos.", category: "Reformas", icon: "tiles" },
  { id: "encanador", title: "Encanador", description: "Avaliação de vazamentos e reparos nas instalações hidráulicas.", category: "Manutenção", icon: "pipe" },
  { id: "pintura", title: "Pintura", description: "Renovação de paredes e acabamentos para um novo ambiente.", category: "Reformas", icon: "paint" },
  { id: "calhas", title: "Limpeza de calhas", description: "Remoção de resíduos e manutenção das calhas do imóvel.", category: "Manutenção", icon: "gutter" },
  { id: "telhados", title: "Conserto de telhados", description: "Avaliação e reparos para cuidar da cobertura do seu espaço.", category: "Manutenção", icon: "roof" },
  { id: "jardins", title: "Terrenos e jardins", description: "Limpeza de terrenos e cuidado com as áreas externas.", category: "Manutenção", icon: "garden" },
  { id: "reparos", title: "Reparos gerais", description: "Conte o que precisa. Ajudamos a organizar a solução.", category: "Manutenção", icon: "tools" },
];
