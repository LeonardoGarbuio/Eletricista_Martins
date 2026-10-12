"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, CalendarDays, Copy, Download, Info, MapPin, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { services } from "@/data/services";
import { business } from "@/config/business";
import { appointmentSchema, buildMessage, contactSchema, emptyQuote, formatDate, formatPhone, localToday, locationSchema, periods, propertyTypes, quoteSchema, serviceSchema, whatsappUrl, type QuoteDetails } from "@/lib/quote";
import { ServiceIcon } from "./icons";
import { Dialog } from "./dialog";

const steps = ["Serviços", "Local", "Preferência", "Contato", "Revisão", "Enviar"];
const titles = ["Como podemos ajudar?", "Onde será o atendimento?", "Qual é o melhor dia para você?", "Como podemos falar com você?", "Está tudo certo por aqui?", "Sua mensagem está pronta."];
const descriptions = ["Escolha um ou mais serviços para o seu pedido.", "Alguns detalhes ajudam a entender o que você precisa.", "Indique sua preferência. A equipe confirmará a disponibilidade.", "Usaremos esses dados para conversar sobre sua solicitação.", "Confira os detalhes antes de preparar sua mensagem.", "Revise a mensagem e continue pelo WhatsApp."];

export function QuoteWizard({ selected, toggle, onClose, details, setDetails }: { selected: string[]; toggle: (id: string) => void; onClose: () => void; details: QuoteDetails; setDetails: (value: QuoteDetails) => void }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const request = { ...details, services: selected };
  const message = step === 5 && quoteSchema.safeParse(request).success ? buildMessage(request) : "";
  const url = whatsappUrl(business.whatsapp, message);
  useEffect(() => { headingRef.current?.focus(); bodyRef.current?.scrollTo({ top: 0 }); }, [step]);
  function update(key: keyof QuoteDetails, value: string) {
    setDetails({ ...details, [key]: value });
    setErrors(prev => { const next = { ...prev }; delete next[key]; return next; });
  }
  function validate() {
    const result = step === 0 ? serviceSchema.safeParse(selected) : step === 1 ? locationSchema.safeParse(details) : step === 2 ? appointmentSchema.safeParse(details) : step === 3 ? contactSchema.safeParse(details) : quoteSchema.safeParse(request);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { next[String(issue.path[0] ?? "services")] = issue.message; });
      setErrors(next);
      requestAnimationFrame(() => { document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); });
      return false;
    }
    setErrors({}); return true;
  }
  function goNext() { if (validate()) setStep(prev => Math.min(prev + 1, 5)); }
  function edit(index: number) { setErrors({}); setFeedback(""); setStep(index); }
  async function copyMessage() {
    try { await navigator.clipboard.writeText(message); setFeedback("Mensagem copiada. Nenhuma solicitação foi enviada pelo site."); }
    catch { setFeedback("Não foi possível copiar automaticamente. Selecione a mensagem abaixo ou baixe o texto."); }
  }
  function download() {
    const objectUrl = URL.createObjectURL(new Blob([message], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = objectUrl; anchor.download = "solicitacao-eletricista-martins.txt"; anchor.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    setFeedback("Mensagem salva em arquivo. Nenhuma solicitação foi enviada pelo site.");
  }
  const fieldError = (key: string) => errors[key] ? <span id={`error-${key}`} className="field-error">{errors[key]}</span> : null;
  const fieldLabels: Record<string, string> = { neighborhood: "Bairro ou região", description: "O que precisa ser feito?", notes: "Mais algum detalhe?", date: "Data desejada", name: "Seu nome", phone: "Telefone com DDD" };
  const a11y = (key: string) => ({ "aria-label": fieldLabels[key], "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `error-${key}` : undefined });
  return <Dialog onClose={onClose} labelledBy="quote-title" className="quote-dialog">
    <aside className="wizard-sidebar"><div className="wizard-logo"><img className="wizard-brand-image" src={business.logoPath} alt="Logo Eletricista Martins" width="40" height="40" /> MARTINS<span>.</span></div><p className="eyebrow">SEU PRÓXIMO PASSO</p><h2>Vamos cuidar<br />do seu espaço.</h2><p>Uma solicitação organizada.<br />Um atendimento mais simples.</p><ol className="wizard-steps">{steps.map((label, index) => <li key={label} className={index === step ? "current" : index < step ? "completed" : ""}><span>{index < step ? <Check size={15} /> : String(index + 1).padStart(2, "0")}</span>{index < step ? <button onClick={() => edit(index)}>{label}</button> : <span aria-current={index === step ? "step" : undefined}>{label}</span>}</li>)}</ol><div className="wizard-reassurance"><ShieldCheck size={22} /><p>O horário será confirmado pela equipe após a análise da solicitação.</p></div></aside>
    <div className="wizard-content"><div className="wizard-mobile-progress"><span>ETAPA {step + 1} DE 6</span><span>{steps[step]}</span><div><i style={{ width: `${((step + 1) / 6) * 100}%` }} /></div></div>
      <div className="wizard-body" ref={bodyRef}><span className="wizard-step-label">{String(step + 1).padStart(2, "0")} / {steps[step].toUpperCase()}</span><h2 id="quote-title" ref={headingRef} tabIndex={-1}>{titles[step]}</h2><p className="wizard-description">{descriptions[step]}</p>
        <form id="quote-form" onSubmit={event => { event.preventDefault(); goNext(); }} noValidate>
          {step === 0 && <><div className="wizard-service-list">{services.map(service => <button key={service.id} type="button" className={`wizard-service ${selected.includes(service.id) ? "active" : ""}`} aria-pressed={selected.includes(service.id)} onClick={() => { toggle(service.id); setErrors({}); }}><ServiceIcon name={service.icon} size={23} /><span>{service.title}<small>{service.category !== "Elétrica" ? "Serviço complementar · parceiros" : "Serviço elétrico"}</small></span><span className="checkbox">{selected.includes(service.id) && <Check size={14} />}</span></button>)}</div>{fieldError("services")}</>}
          {step === 1 && <div className="form-fields"><label htmlFor="neighborhood">Bairro ou região<input id="neighborhood" value={details.neighborhood} onChange={e => update("neighborhood", e.target.value)} placeholder="Ex.: Uvaranas, Centro, Oficinas..." autoComplete="address-level3" maxLength={100} {...a11y("neighborhood")} />{fieldError("neighborhood")}</label><fieldset><legend>Tipo de imóvel</legend><div className="choice-grid">{propertyTypes.map(type => <label className={`choice ${details.property === type ? "active" : ""}`} key={type}><input type="radio" name="property" value={type} checked={details.property === type} onChange={() => update("property", type)} {...a11y("property")} /><span>{type}</span></label>)}</div>{fieldError("property")}</fieldset><label htmlFor="description">O que precisa ser feito?<textarea id="description" rows={3} maxLength={1000} value={details.description} onChange={e => update("description", e.target.value)} placeholder="Conte um pouco sobre o serviço que você precisa." {...a11y("description")} />{fieldError("description")}</label><label htmlFor="notes">Mais algum detalhe? <span className="optional">Opcional</span><textarea id="notes" rows={2} maxLength={500} value={details.notes} onChange={e => update("notes", e.target.value)} placeholder="Ex.: acesso pelo portão lateral." {...a11y("notes")} />{fieldError("notes")}</label></div>}
          {step === 2 && <div className="form-fields"><div className="info-box"><CalendarDays size={23} /><p>Esta é uma <strong>preferência de atendimento</strong>. Seu horário será confirmado pela equipe após a análise da solicitação.</p></div><label htmlFor="date">Data desejada<input id="date" type="date" min={localToday()} value={details.date} onChange={e => update("date", e.target.value)} {...a11y("date")} />{fieldError("date")}</label><fieldset><legend>Período de preferência</legend><div className="choice-grid periods">{periods.map(period => <label className={`choice ${details.period === period ? "active" : ""}`} key={period}><input type="radio" name="period" value={period} checked={details.period === period} onChange={() => update("period", period)} {...a11y("period")} /><span>{period}</span></label>)}</div>{fieldError("period")}</fieldset><p className="form-footnote">Não exibimos horários disponíveis nem reservamos a agenda automaticamente.</p></div>}
          {step === 3 && <div className="form-fields"><label htmlFor="name">Seu nome<input id="name" autoComplete="name" value={details.name} onChange={e => update("name", e.target.value)} maxLength={100} placeholder="Como você gostaria de ser chamado?" {...a11y("name")} />{fieldError("name")}</label><label htmlFor="phone">Telefone com DDD<input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={details.phone} onChange={e => update("phone", formatPhone(e.target.value))} placeholder="(42) 99999-9999" {...a11y("phone")} />{fieldError("phone")}</label><div className="info-box neutral"><ShieldCheck size={24} /><p>Seus dados ficam nesta página até você decidir enviar a mensagem pelo WhatsApp. O site não armazena sua solicitação.</p></div></div>}
          {step === 4 && <div className="review"><ReviewRow title="Serviços" edit={() => edit(0)}><ul>{services.filter(s => selected.includes(s.id)).map(s => <li key={s.id}><Check size={14} />{s.title}</li>)}</ul></ReviewRow><ReviewRow title="Local e necessidade" edit={() => edit(1)}><p>{details.neighborhood} · {details.property}</p><p>{details.description}</p>{details.notes && <p className="review-note">Observações: {details.notes}</p>}</ReviewRow><ReviewRow title="Preferência de atendimento" edit={() => edit(2)}><p>{formatDate(details.date)} · {details.period}</p><span className="pending-label">Sujeito à confirmação da equipe</span></ReviewRow><ReviewRow title="Seu contato" edit={() => edit(3)}><p>{details.name} · {details.phone}</p></ReviewRow>{Object.keys(errors).length > 0 && <p className="field-error" role="alert">Revise os dados do pedido. A data desejada precisa ser de hoje em diante.</p>}</div>}
          {step === 5 && <div className="send-stage"><div className="message-status"><Check size={22} /><div><strong>Pronto para o próximo passo</strong><p>{url ? "A mensagem será aberta para você enviar." : "Prévia de demonstração · envio ainda não ativado"}</p></div></div>{!url && <div className="info-box"><Info size={22} /><p>O WhatsApp da empresa está aguardando confirmação. Você pode copiar ou baixar a mensagem para testar a experiência.</p></div>}<label htmlFor="message-preview" className="message-label">Mensagem para o WhatsApp</label><textarea id="message-preview" className="message-preview" value={message} readOnly rows={12} /><div className="message-tools"><button type="button" className="text-link" onClick={copyMessage}><Copy size={16} /> Copiar mensagem</button><button type="button" className="text-link" onClick={download}><Download size={16} /> Baixar texto</button></div><p className="send-feedback" role="status">{feedback}</p>{url && <a className="button button-primary whatsapp-send" href={url} target="_blank" rel="noopener noreferrer" onClick={event => { if (!quoteSchema.safeParse(request).success) { event.preventDefault(); setStep(4); setErrors({ date: "Revise sua data de preferência." }); return; } setFeedback("O WhatsApp foi aberto. Envie a mensagem por lá para encaminhar o pedido. Seu horário ainda depende da confirmação da equipe."); }}><MessageCircle size={19} /> Abrir WhatsApp e continuar <ArrowRight size={17} /></a>}<p className="form-footnote">Abrir o WhatsApp não envia a mensagem automaticamente e não confirma o agendamento.</p></div>}
        </form>
      </div>
      <div className="wizard-footer">{step > 0 ? <button className="text-link" onClick={() => edit(step - 1)}><ArrowLeft size={16} /> Voltar</button> : <span className="wizard-count">{selected.length} selecionado{selected.length !== 1 ? "s" : ""}</span>}{step < 5 ? <button className="button button-primary" type="submit" form="quote-form">{step === 4 ? "Preparar mensagem" : "Continuar"}<ArrowRight size={18} /></button> : <button className="button button-outline" onClick={onClose}>Voltar ao site <ArrowRight size={17} /></button>}</div>
      {Object.keys(errors).length > 0 && step < 4 && <span className="sr-only" role="alert">{Object.values(errors).join(" ")}</span>}
    </div>
  </Dialog>;
}
function ReviewRow({ title, children, edit }: { title: string; children: React.ReactNode; edit: () => void }) {
  return <div className="review-row"><div><h3>{title}</h3><button type="button" onClick={edit} aria-label={`Editar ${title}`}>Editar <ChevronRight size={13} /></button></div>{children}</div>;
}
