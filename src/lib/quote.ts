import { z } from "zod";
import { services } from "../data/services";

export const propertyTypes = ["Casa", "Apartamento", "Comércio", "Empresa"] as const;
export const periods = ["Manhã", "Tarde", "A combinar"] as const;
export const emptyQuote = { neighborhood: "", property: "", description: "", notes: "", date: "", period: "", name: "", phone: "" };
export type QuoteDetails = typeof emptyQuote;
export type QuoteRequest = QuoteDetails & { services: string[] };

export function localToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
function validDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}
const serviceIds = new Set(services.map(s => s.id));
export const serviceSchema = z.array(z.string().refine(id => serviceIds.has(id), "Serviço inválido.")).min(1, "Escolha pelo menos um serviço.");
export const locationSchema = z.object({
  neighborhood: z.string().trim().min(2, "Informe seu bairro ou região.").max(100, "Use até 100 caracteres."),
  property: z.enum(propertyTypes, { error: "Escolha o tipo de imóvel." }),
  description: z.string().trim().min(10, "Descreva sua necessidade em pelo menos 10 caracteres.").max(1000, "Use até 1.000 caracteres."),
  notes: z.string().trim().max(500, "Use até 500 caracteres."),
});
export const appointmentSchema = z.object({
  date: z.string().refine(date => validDate(date) && date >= localToday(), "Escolha uma data de hoje em diante."),
  period: z.enum(periods, { error: "Escolha um período de preferência." }),
});
export function validPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/.test(digits) && !/^(\d)\1+$/.test(digits);
}
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Use até 100 caracteres."),
  phone: z.string().refine(validPhone, "Informe um telefone válido com DDD."),
});
export const quoteSchema = locationSchema.extend(appointmentSchema.shape).extend(contactSchema.shape).extend({ services: serviceSchema });

export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (!d.length) return "";
  if (d.length <= 2) return `(${d}`;
  const rest = d.slice(2);
  const split = rest.length > 8 ? 5 : 4;
  return `(${d.slice(0, 2)}) ${rest.slice(0, split)}${rest.length > split ? `-${rest.slice(split)}` : ""}`;
}
export function formatDate(date: string) {
  if (!validDate(date)) return "A definir";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "America/Sao_Paulo" }).format(new Date(`${date}T12:00:00Z`));
}
export function buildMessage(request: QuoteRequest) {
  const data = quoteSchema.parse(request);
  return [
    "Olá, equipe Eletricista Martins! Gostaria de solicitar um orçamento.", "",
    `Serviços: ${services.filter(s => data.services.includes(s.id)).map(s => s.title).join(", ")}`,
    `Região: ${data.neighborhood} — Ponta Grossa / PR`, `Tipo de imóvel: ${data.property}`,
    `Descrição: ${data.description}`, ...(data.notes ? [`Observações: ${data.notes}`] : []),
    `Data desejada: ${formatDate(data.date)}`, `Período preferido: ${data.period}`,
    `Nome: ${data.name}`, `Telefone: ${data.phone}`, "",
    "Estou ciente de que o horário depende da confirmação da equipe.",
  ].join("\n");
}
export function whatsappUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  if (!/^55\d{10,11}$/.test(digits) || !validPhone(digits.slice(2))) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
