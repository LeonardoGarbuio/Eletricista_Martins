"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="error-page"><p className="eyebrow">ELETRICISTA MARTINS</p><h1>Vamos tentar de novo?</h1><p>Não foi possível carregar esta página. Seus dados não foram enviados.</p><button className="button button-primary" onClick={reset}>Tentar novamente</button></main>; }
