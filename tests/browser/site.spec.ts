import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function next(page: Page) { await page.getByRole("button", { name: "Continuar", exact: true }).click(); }

test("quem atendemos apresenta segmentos e conecta ao orçamento", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const section = page.locator("#quem-atendemos");
  await section.scrollIntoViewIfNeeded();
  for (const name of ["Residências", "Comércios e empresas", "Condomínios", "Farmácias", "Franquias", "Supermercados", "Hospitais", "Área industrial"]) {
    await expect(section.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  await expect(section).toContainText("Atendimento em outros estados mediante consulta.");
  await section.screenshot({ path: `test-results/segments-${testInfo.project.name}.png` });
  await page.getByRole("button", { name: "Solicitar Instalações elétricas", exact: true }).click();
  await section.getByRole("button", { name: "Conversar sobre minha demanda", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Instalações elétricas Serviço elétrico", exact: true })).toHaveAttribute("aria-pressed", "true");
  await next(page);
  for (const value of ["Condomínio", "Farmácia", "Franquia", "Supermercado", "Hospital", "Área industrial", "Outro"]) {
    await page.getByLabel("Tipo de local", { exact: true }).selectOption(value);
    await expect(page.getByLabel("Tipo de local", { exact: true })).toHaveValue(value);
  }
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
});

test("vitrine de inspirações conecta referências ao orçamento", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const inspiration = page.locator("#inspiracao");
  await inspiration.scrollIntoViewIfNeeded();
  await expect(inspiration.getByRole("heading", { level: 3 })).toContainText("Outra luz.");
  await inspiration.getByRole("button", { name: "Ver referência de elétrica", exact: true }).click();
  await expect(inspiration.getByRole("heading", { level: 3 })).toContainText("uma boa instalação.");
  await inspiration.getByRole("button", { name: "Ver referência de reformas", exact: true }).click();
  await expect(inspiration).toContainText("profissionais parceiros");
  await inspiration.getByRole("button", { name: "Próxima referência", exact: true }).click();
  await expect(inspiration.getByRole("button", { name: "Ver referência de iluminação", exact: true })).toHaveAttribute("aria-pressed", "true");
  await inspiration.getByRole("button", { name: "Ampliar imagem: Luz que transforma ambientes", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Não é uma obra da empresa.");
  await page.keyboard.press("Escape");
  await expect(inspiration.getByRole("button", { name: "Ampliar imagem: Luz que transforma ambientes", exact: true })).toBeFocused();

  await page.getByRole("button", { name: "Solicitar Tomadas e interruptores", exact: true }).click();
  await inspiration.getByRole("button", { name: "Quero cuidar da iluminação", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Iluminação e luminárias Serviço elétrico", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Tomadas e interruptores Serviço elétrico", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Fechar janela", exact: true }).click();

  if (testInfo.project.name === "mobile") {
    await inspiration.locator(".inspiration-image").dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 290, clientY: 300 }] });
    await inspiration.locator(".inspiration-image").dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 100, clientY: 304 }] });
    await expect(inspiration.getByRole("button", { name: "Ver referência de elétrica", exact: true })).toHaveAttribute("aria-pressed", "true");
  }
  const audit = await new AxeBuilder({ page }).include("#inspiracao").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all(Array.from(document.querySelectorAll<HTMLImageElement>("#inspiracao img")).map(image => image.decode().catch(() => {}))); });
  await inspiration.screenshot({ path: `test-results/inspiration-${testInfo.project.name}.png` });
  for (const width of testInfo.project.name === "mobile" ? [320, 390, 650] : [768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `overflow at ${width}`).toBe(false);
  }
  expect(errors).toEqual([]);
});

test("catálogo, pedido completo e mensagem de WhatsApp", async ({ page }, testInfo) => {
  const local = testInfo.project.name === "mobile" ? "Joinville / SC, Centro" : "Ponta Grossa / PR, Uvaranas";
  const property = testInfo.project.name === "mobile" ? "Supermercado" : "Casa";
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Precisou?");
  await page.getByRole("button", { name: "Solicitar Instalações elétricas", exact: true }).click();
  await page.getByRole("button", { name: "Solicitar Iluminação e luminárias", exact: true }).click();
  await expect(page.getByRole("region", { name: "Serviços selecionados" })).toContainText("2 serviços selecionados");
  await page.getByRole("button", { name: "Continuar orçamento", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Instalações elétricas Serviço elétrico", exact: true })).toHaveAttribute("aria-pressed", "true");
  await next(page);
  await next(page);
  await expect(page.getByText("Informe a cidade / UF e o bairro ou região.", { exact: true })).toBeVisible();
  await page.getByLabel("Cidade / UF e bairro ou região", { exact: true }).fill(local);
  await page.getByLabel("Tipo de local", { exact: true }).selectOption(property);
  await page.getByLabel("O que precisa ser feito?", { exact: true }).fill("Instalar iluminação na sala e revisar a instalação elétrica.");
  await page.getByLabel("Mais algum detalhe?", { exact: false }).fill("Acesso pelo portão lateral.");
  await next(page);
  await expect(page.getByText("Seu horário será confirmado pela equipe após a análise da solicitação.", { exact: false }).last()).toBeVisible();
  await page.getByLabel("Data desejada").fill("2099-10-20");
  await page.getByRole("radio", { name: "Tarde", exact: true }).check();
  await next(page);
  await page.getByLabel("Seu nome", { exact: true }).fill("Cliente Demonstração");
  await page.getByLabel("Telefone com DDD").fill("42999999999");
  await expect(page.getByLabel("Telefone com DDD")).toHaveValue("(42) 99999-9999");
  await next(page);
  await expect(dialog).toContainText("Sujeito à confirmação da equipe");
  await expect(dialog).toContainText("20 de outubro de 2099");
  await expect(dialog).toContainText("Cliente Demonstração");
  await expect(dialog).toContainText(local);
  await expect(dialog).toContainText(property);
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  const message = await page.getByLabel("Mensagem para o WhatsApp").inputValue();
  for (const part of ["Instalações elétricas", "Iluminação e luminárias", local, `Tipo de local: ${property}`, "Tarde", "Cliente Demonstração", "(42) 99999-9999", "portão lateral", "depende da confirmação"]) expect(message).toContain(part);
  if (testInfo.project.name === "mobile") expect(message).not.toContain("Ponta Grossa");
  const link = page.getByRole("link", { name: "Abrir WhatsApp e continuar" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.pathname).toBe("/554227020749");
  expect(url.searchParams.get("text")).toBe(message);
  // Intercepta a navegação: verifica o clique sem contatar WhatsApp ou enviar dados reais.
  await page.context().route("https://wa.me/**", route => route.fulfill({ status: 200, contentType: "text/html", body: "<title>WhatsApp interceptado no teste</title>" }));
  const popupPromise = page.waitForEvent("popup");
  await link.click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(popup.url()).toContain("wa.me/554227020749");
  await popup.close();
  await expect(page.getByRole("status").last()).toContainText("Envie a mensagem por lá");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Baixar texto" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("solicitacao-eletricista-martins.txt");
  await page.screenshot({ path: `test-results/quote-${testInfo.project.name}.png` });
  await page.getByRole("button", { name: "Voltar ao site" }).click();
  await expect(dialog).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("filtros, busca, seleção e retomada", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Reformas", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Carpintaria", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Instalações elétricas", exact: true })).not.toBeVisible();
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.getByRole("textbox", { name: "Buscar um serviço" }).fill("iluminacao");
  await expect(page.locator(".service-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Solicitar Iluminação e luminárias", exact: true }).click();
  await page.getByRole("button", { name: "Remover Iluminação e luminárias", exact: true }).click();
  await expect(page.getByRole("region", { name: "Serviços selecionados" })).not.toBeVisible();
  await page.getByRole("textbox", { name: "Buscar um serviço" }).fill("inexistente");
  await expect(page.getByText("Não encontramos esse serviço.")).toBeVisible();
  await page.getByRole("button", { name: "Ver todos os serviços" }).click();
  await expect(page.locator(".service-card")).toHaveCount(15);
});

test("assistente, galeria, privacidade e teclado", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir atendimento guiado" }).click();
  await expect(page.getByRole("dialog")).toContainText("Orientação por opções");
  await page.getByRole("button", { name: "Conhecer os serviços" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Ampliar imagem: Luz que transforma ambientes" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Próxima imagem" }).click();
  await expect(page.getByRole("dialog")).toContainText("Cada detalhe, uma solução");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Ampliar imagem: Luz que transforma ambientes" })).toBeFocused();
  await page.getByRole("button", { name: "Privacidade", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("não cria reservas");
  await page.keyboard.press("Escape");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
    await expect(page.getByRole("navigation", { name: "Navegação mobile" })).toBeVisible();
    await page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "Como funciona" }).click();
    await expect(page.getByRole("navigation", { name: "Navegação mobile" })).not.toBeVisible();
  }
});

test("acessibilidade, imagens, SEO privado e responsividade", async ({ page }, testInfo) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  for (const width of testInfo.project.name === "mobile" ? [320, 375, 390, 650] : [768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `horizontal overflow at ${width}`).toBe(false);
  }
  await page.setViewportSize(testInfo.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    for (const image of images) { image.loading = "eager"; }
    await Promise.all(images.map(image => image.decode().catch(() => {})));
  });
  expect(await page.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(axe.violations.map(v => ({ id: v.id, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
  await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png`, fullPage: true });
  await page.getByRole("button", { name: "Solicitar orçamento", exact: true }).first().click();
  const wizardAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(wizardAxe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
});
