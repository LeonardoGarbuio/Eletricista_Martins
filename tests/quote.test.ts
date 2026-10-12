import assert from "node:assert/strict";
import { test } from "node:test";
import { appointmentSchema, buildMessage, formatPhone, localToday, quoteSchema, validPhone, whatsappUrl } from "../src/lib/quote";

const request = { services: ["instalacoes", "iluminacao"], neighborhood: "Uvaranas", property: "Casa", description: "Instalar duas luminárias na sala.", notes: "Acesso pelo portão lateral.", date: "2099-10-20", period: "Tarde", name: "Cliente Demonstração", phone: "(42) 99999-9999" };
test("mensagem contém todos os campos e ressalva de confirmação", () => {
  const message = buildMessage(request);
  for (const value of ["Instalações elétricas", "Iluminação e luminárias", "Uvaranas", "Casa", request.description, request.notes, "20 de outubro de 2099", "Tarde", request.name, request.phone, "depende da confirmação"]) assert.ok(message.includes(value), value);
});
test("link usa o número autorizado e codifica a mensagem sem perda de dados", () => {
  const message = buildMessage({ ...request, description: "Trocar iluminação & revisar tomadas + interruptores?" });
  const url = new URL(whatsappUrl("+55 42 2702-0749", message)!);
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/554227020749");
  assert.equal(url.searchParams.get("text"), message);
});
test("sem número válido, não há encaminhamento inventado", () => {
  for (const phone of ["", "123", "javascript:alert(1)", "5500000000000"]) assert.equal(whatsappUrl(phone, "Olá"), null);
});
test("datas passadas ou impossíveis não passam na validação", () => {
  for (const date of ["2001-10-01", "2099-02-30", "", "abc"]) assert.equal(appointmentSchema.safeParse({ date, period: "Manhã" }).success, false);
  assert.ok(appointmentSchema.safeParse({ date: localToday(), period: "A combinar" }).success);
});
test("data mínima respeita o fuso de Ponta Grossa", () => {
  assert.equal(localToday(new Date("2026-10-13T01:00:00Z")), "2026-10-12");
});
test("telefone brasileiro permite celular e fixo com DDD", () => {
  assert.ok(validPhone("(42) 2702-0749")); assert.ok(validPhone("(42) 99999-9999"));
  for (const value of ["123", "(00) 99999-9999", "(42) 12345-6789", "11111111111"]) assert.equal(validPhone(value), false);
  assert.equal(formatPhone("42999999999"), "(42) 99999-9999");
  assert.equal(formatPhone("4227020749"), "(42) 2702-0749");
});
test("validação integral impede pedido sem serviço, contato ou local", () => {
  assert.ok(quoteSchema.safeParse(request).success);
  for (const patch of [{ services: [] }, { services: ["inventado"] }, { neighborhood: "" }, { property: "Outros" }, { name: "" }, { description: "curto" }, { phone: "" }]) assert.equal(quoteSchema.safeParse({ ...request, ...patch }).success, false);
});
