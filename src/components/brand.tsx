import { Zap } from "lucide-react";
import { business } from "@/config/business";
export function Brand() {
  return <a className={`brand ${business.logoPath ? "brand--original" : ""}`} href="#inicio" aria-label="Eletricista Martins — início">
    {business.logoPath ? <img className="brand-logo" src={business.logoPath} alt="Logo Eletricista Martins Ponta Grossa" width="58" height="58" /> : <span className="brand-mark"><Zap size={30} strokeWidth={2.6} fill="currentColor" aria-hidden="true" /></span>}
    <span className="brand-type" aria-hidden="true"><span>ELETRICISTA</span><strong>MARTINS<span className="brand-dot">.</span></strong></span>
  </a>;
}
