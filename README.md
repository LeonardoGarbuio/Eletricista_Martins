# Eletricista Martins — V1

Prévia comercial local para a Eletricista Martins Ponta Grossa. Next.js 16, React 19, TypeScript, Zod e Lucide. CSS próprio, fontes locais e imagens otimizadas com Next Image. Sem dependência de API paga ou backend para a demonstração.

## Abrir e executar

Requisitos: Node.js 22 ou superior e npm.

```powershell
npm install
npm run dev
```

Abra http://127.0.0.1:3000. Para testar a versão de produção:

```powershell
npm run build
npm run start -- -p 3007
```

Abra http://127.0.0.1:3007. O servidor escuta apenas em loopback. Para encerrar, use Ctrl+C no terminal. Nenhum domínio existente foi alterado e não houve publicação.

Neste ambiente, se o cache padrão não tiver permissão de escrita, use `npm install --cache .npm-cache`. Se sua rede usar uma autoridade certificadora corporativa já instalada no Windows, o Node 22 aceita `NODE_USE_SYSTEM_CA=1`; não desative a verificação TLS.

## Configuração

O arquivo `.env.local` desta entrega já contém o número autorizado pelo usuário, **+55 42 2702-0749**, e mantém a indexação desabilitada. Ele é ignorado pelo Git. Em outra máquina, copie `.env.example` para `.env.local` e preencha:

```dotenv
NEXT_PUBLIC_WHATSAPP_NUMBER=554227020749
NEXT_PUBLIC_SITE_INDEXABLE=false
NEXT_PUBLIC_SITE_URL=https://eletricistamartinspg.com
```

Esses valores são públicos e incorporados à compilação. Reinicie o desenvolvimento ou compile novamente após alterá-los. Número vazio ou inválido mantém a geração, cópia e download da mensagem, sem abrir um destinatário fictício. O cadastro/funcionamento do número no WhatsApp deve ser verificado pelo proprietário; a V1 não usa a API do WhatsApp.

## O que funciona

- Navegação responsiva e menu mobile, incluindo teclado e foco visível.
- Catálogo de 15 serviços com categorias, busca sem distinção de acentos, seleção múltipla e resumo contextual.
- Orçamento em seis etapas: serviços, local, preferência, contato, revisão e encaminhamento.
- Validação de campos, telefone brasileiro fixo/celular com DDD e data no fuso de São Paulo. Datas inválidas ou anteriores a hoje são recusadas.
- Voltar e editar etapas; dados preservados durante a navegação na mesma página.
- Mensagem completa com serviços, bairro, imóvel, descrição, observações, data, período, nome, telefone e regra de confirmação.
- WhatsApp configurado, aberto exclusivamente por clique; cópia e download do texto também disponíveis.
- Assistente guiado por opções, galeria ampliável, perguntas frequentes e aviso de privacidade.
- Animações discretas, suporte a movimento reduzido, fontes locais e fotos responsivas.
- Metadados, Open Graph, favicon, robots e sitemap com configuração de indexação.

## Limites intencionais da demonstração

- Escolher uma data **não reserva nem confirma um atendimento**. A equipe combina o horário manualmente.
- Abrir o WhatsApp **não envia a mensagem**. O visitante precisa enviá-la no aplicativo. O site não tem confirmação de entrega ou leitura.
- O assistente é um fluxo por opções, sem IA, chat humano ou automação externa.
- Os dados do formulário ficam em memória no navegador; fechar ou recarregar a página descarta o pedido. Não há banco de dados, agenda administrativa, analytics ou cookies de publicidade.
- As três fotos da vitrine são referências geradas por IA, identificadas na interface. Não são obras da empresa. A marca usa o logotipo original enviado pelo usuário.
- `noindex` e `robots.txt` impedem indexação cooperativa, mas não são controle de acesso. Esta entrega é local; eventual hospedagem privada precisa de autenticação na infraestrutura.

## Personalização

| Arquivo | Responsabilidade |
| --- | --- |
| `src/config/business.ts` | Nome, região, Instagram, marca e itens da galeria |
| `src/data/services.ts` | Serviços, categorias, descrições, ícones e destaques |
| `src/lib/quote.ts` | Modelo do pedido, validação, telefone, data e mensagem |
| `src/components/site.tsx` | Conteúdo institucional, navegação e assistente |
| `src/components/hero.tsx` | Primeira tela, título e feixe de energia em CSS |
| `src/styles/hero.css` | Composição e tipografia do hero em desktop e celular |
| `src/components/how-it-works.tsx` | Percurso conectado de atendimento |
| `src/components/inspiration-gallery.tsx` | Vitrine por tema, navegação por toque e seleção do serviço relacionado |
| `src/styles/inspiration.css` | Composição editorial e adaptação da vitrine ao celular |
| `src/components/services-catalog.tsx` | Catálogo e resumo da seleção |
| `src/components/quote-wizard.tsx` | Interface de orçamento |
| `src/components/dialog.tsx` | Modal nativo, Escape e restauração de foco |
| `src/app/globals.css` | Paleta, tipografia, página e responsividade |
| `src/styles/wizard.css` | Formulário e versão mobile |
| `src/app/layout.tsx` | Título, descrição e Open Graph |
| `public/images/` | Fotografias locais |

O logotipo original está em `public/brand/logo-martins-original.png` e é usado no cabeçalho, rodapé, orçamento, assistente e Open Graph. Os ícones do navegador e de acesso no celular ficam em `src/app/icon.png` e `src/app/apple-icon.png`. Para trocar a marca futuramente, configure `business.logoPath` e regenere esses ícones a partir do arquivo autorizado. Para fotos reais, altere `portfolio`, revise textos alternativos e retire o aviso de demonstração somente das imagens autorizadas.

## Validação

```powershell
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Os testes de navegador usam o Chrome instalado e iniciam/reutilizam a versão compilada em `127.0.0.1:3007`. Compile antes de rodá-los. A variável `PLAYWRIGHT_PORT` permite escolher outra porta de prévia, por exemplo 3008. Para outro navegador, ajuste `channel` em `playwright.config.ts`.

Os testes cobrem pedido completo em desktop e celular, seleção e busca, data/telefone, revisão, link e mensagem, download, galeria, assistente, menu, teclado, imagens, ausência de rolagem horizontal de 320 a 1920 px, indexação e auditoria automática axe. O acesso ao WhatsApp é interceptado durante o teste: nenhum pedido de teste é enviado. Capturas e traces ficam em `test-results/`.

## Evolução comercial

1. Aprovar a marca, textos, abrangência regional e fotografias reais; confirmar o WhatsApp em um aparelho autorizado.
2. Aprovar a implantação e configurar hospedagem, domínio e acesso. Só então definir `NEXT_PUBLIC_SITE_INDEXABLE=true`. Isso habilita canonical, sitemap público e Schema.org Electrician com os dados do briefing, sem avaliações ou certificações inventadas.
3. Se contratado, adicionar um backend para receber `QuoteRequest`, com estado inicial pendente. Aprovação, recusa e reagendamento devem ocorrer no fluxo do proprietário.
4. Tratar autenticação, permissões, retenção de dados e consentimento antes de armazenar solicitações.
5. Integrar Google Calendar e WhatsApp Business API por provedores apropriados, conforme escopo e custos aprovados. Essas funcionalidades não estão implementadas nesta V1.

## Imagens

As três imagens atuais da vitrine foram geradas com Imagegen e estão identificadas na interface como referências geradas por IA. São arquivos WebP locais: `inspiration-lighting.webp`, `inspiration-electrical.webp` e `inspiration-renovation.webp`. Os originais foram preservados. Veja a [direção de arte](docs/gallery-images.md) e os [prompts usados](docs/gallery-image-prompts.md).

Arquivos da versão anterior, obtidos no Unsplash, preservados no projeto:

- `architecture.jpg`: https://images.unsplash.com/photo-1600585154340-be6161a56a0c
- `interior.jpg`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- `kitchen.jpg`: https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea

O script `scripts/download-assets.mjs` registra as origens e permite recuperar os arquivos. As imagens já estão incluídas; a página não depende do Unsplash em tempo de execução.

O hero usa um feixe de energia em CSS, sem fotografia, canvas ou WebGL. O efeito decorativo usa gradientes e movimento lento, fica atrás do conteúdo e respeita `prefers-reduced-motion`. A tipografia do título usa Barlow Condensed, disponível localmente pelo pacote Fontsource. A imagem conceitual da iteração anterior foi preservada em `public/images/` e não é carregada pelo hero; seu prompt está em [docs/hero-image-prompt.md](docs/hero-image-prompt.md).
