import { useState, type FormEvent } from "react";
import { BeanIcon, FlameIcon } from "./Icons";

interface FooterProps {
  notify: (title: string, sub?: string) => void;
}

export default function Footer({ notify }: FooterProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Escreve um email válido.");
      return;
    }
    setError("");
    setEmail("");
    notify("Subscrição confirmada", "As Cartas da Torra chegam à tua caixa uma vez por mês.");
  };

  return (
    <footer className="border-t border-espresso-700/70 bg-espresso-950/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ember-500 text-espresso-950">
              <BeanIcon className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-crema-50">BRASA</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-crema-400">
            Torrefacção independente de especialidade. Compramos verde directamente, torramos em
            pequenos lotes e provamos tudo — duas vezes.
          </p>
          <dl className="mt-6 space-y-1 text-sm text-crema-300">
            <div className="flex justify-between gap-6 border-b border-espresso-800 py-2">
              <dt className="font-semibold text-crema-500">Seg – Sex</dt>
              <dd>09h00 – 19h00</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-espresso-800 py-2">
              <dt className="font-semibold text-crema-500">Sábado</dt>
              <dd>10h00 – 18h00</dd>
            </div>
            <div className="flex justify-between gap-6 py-2">
              <dt className="font-semibold text-crema-500">Domingo</dt>
              <dd className="text-clay-300">A descansar os tambores</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-crema-400">
            A torrefacção
          </h3>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-crema-300">
            <p>
              Rua do Forno do Tijolo, 17
              <br />
              1170-117 Lisboa
            </p>
            <p>
              <a href="mailto:ola@brasa.cafe" className="font-semibold text-ember-300 underline-offset-4 transition-colors hover:text-ember-200 hover:underline">
                ola@brasa.cafe
              </a>
            </p>
            <p className="text-crema-400">Metro: Anjos · Autocarros 706, 712</p>
          </address>
        </div>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-crema-400">
            Cartas da torra
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-crema-300">
            Uma carta por mês: lotes novos, receitas de extracção e os bastidores do tambor.
            Sem spam — palavra de torrador.
          </p>
          <form onSubmit={subscribe} className="mt-5">
            <div className="flex overflow-hidden rounded-full border border-espresso-600/70 bg-espresso-800/70 transition-colors focus-within:border-ember-500/70">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="o-teu@email.pt"
                aria-label="Email para newsletter"
                className="w-full bg-transparent px-5 py-3 text-sm text-crema-100 placeholder:text-crema-500 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-ember-500 px-5 text-sm font-extrabold text-espresso-950 transition-colors hover:bg-ember-400 active:scale-[0.98]"
              >
                Subscrever
              </button>
            </div>
            {error && <p className="mt-2 text-[12px] font-semibold text-clay-300">{error}</p>}
          </form>
        </div>
      </div>

      <div className="border-t border-espresso-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-[12px] font-semibold text-crema-500 sm:px-6">
          <p>© 2026 BRASA — café de especialidade, Lda.</p>
          <p className="flex items-center gap-1.5">
            Torrado em Lisboa com
            <FlameIcon className="flame-flicker h-3.5 w-3.5 text-ember-400" />
            e teimosia q.b.
          </p>
        </div>
      </div>
    </footer>
  );
}
