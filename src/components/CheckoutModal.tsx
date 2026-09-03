import { useEffect, useRef, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { eur, orderNumber } from "../lib/format";
import type { CartLine } from "./CartDrawer";
import { ArrowIcon, CloseIcon, LockIcon } from "./Icons";

interface CheckoutModalProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

type Step = "envio" | "pagamento" | "processando" | "sucesso";

interface FormData {
  nome: string;
  email: string;
  morada: string;
  cidade: string;
  cp: string;
  cartao: string;
  titular: string;
  validade: string;
  cvc: string;
}

const initialForm: FormData = {
  nome: "",
  email: "",
  morada: "",
  cidade: "",
  cp: "",
  cartao: "",
  titular: "",
  validade: "",
  cvc: "",
};

function Field({
  label,
  error,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-crema-400">
        {label}
      </span>
      <input
        {...rest}
        className={`w-full rounded-lg border bg-espresso-800/70 px-4 py-3 text-sm text-crema-100 placeholder:text-crema-500 transition-all focus:outline-none focus:ring-2 focus:ring-ember-500/25 ${
          error ? "border-clay-500/80 focus:border-clay-400" : "border-espresso-600/70 focus:border-ember-500/70"
        }`}
      />
      {error && <span className="mt-1 block text-[12px] font-semibold text-clay-300">{error}</span>}
    </label>
  );
}

export default function CheckoutModal({
  open,
  lines,
  subtotal,
  shipping,
  total,
  onClose,
  onComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("envio");
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [order, setOrder] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setStep("envio");
      setErrors({});
      setOrder("");
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  if (!open) return null;

  const set = (k: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "cartao") v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "validade") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    if (k === "cp") v = v.replace(/[^\d-]/g, "").slice(0, 8);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validateShipping = () => {
    const er: Partial<Record<keyof FormData, string>> = {};
    if (!form.nome.trim()) er.nome = "Indica o teu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Email inválido.";
    if (!form.morada.trim()) er.morada = "Indica a morada de entrega.";
    if (!form.cidade.trim()) er.cidade = "Indica a cidade.";
    if (!/^\d{4}-\d{3}$/.test(form.cp)) er.cp = "Formato 0000-000.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const validatePayment = () => {
    const er: Partial<Record<keyof FormData, string>> = {};
    if (form.cartao.replace(/\s/g, "").length !== 16) er.cartao = "O cartão tem 16 dígitos.";
    if (!form.titular.trim()) er.titular = "Indica o nome no cartão.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.validade)) er.validade = "Formato MM/AA.";
    if (form.cvc.length < 3) er.cvc = "3 dígitos.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleClose = () => {
    if (step === "sucesso") onComplete();
    else onClose();
  };

  const pay = () => {
    if (!validatePayment()) return;
    setStep("processando");
    timer.current = window.setTimeout(() => {
      setOrder(orderNumber());
      setStep("sucesso");
    }, 1700);
  };

  const summary = (
    <div className="rounded-lg border border-espresso-700/80 bg-espresso-900/60 p-4">
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-crema-400">Resumo</h3>
      <ul className="mt-3 space-y-2">
        {lines.map((l) => (
          <li key={l.key} className="flex justify-between gap-3 text-[13px]">
            <span className="text-crema-300">
              {l.qty} × {l.product.name} <span className="text-crema-500">({l.weight})</span>
            </span>
            <span className="shrink-0 font-semibold text-crema-100">{eur(l.product.price[l.weight] * l.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-3 space-y-1 border-t border-espresso-700/80 pt-2.5 text-[13px]">
        <div className="flex justify-between text-crema-300">
          <dt>Subtotal</dt>
          <dd>{eur(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-crema-300">
          <dt>Envio</dt>
          <dd>{shipping === 0 ? "Grátis" : eur(shipping)}</dd>
        </div>
        <div className="flex justify-between pt-1 text-[15px] font-bold text-crema-50">
          <dt>Total</dt>
          <dd className="text-ember-300">{eur(total)}</dd>
        </div>
      </dl>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <button
        aria-label="Fechar checkout"
        onClick={step === "processando" ? undefined : handleClose}
        className="absolute inset-0 w-full cursor-default bg-espresso-950/85 backdrop-blur-sm"
      />
      <div className="animate-rise relative z-10 max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-espresso-600/70 bg-espresso-850 p-6 shadow-2xl sm:rounded-xl sm:p-8">
        {step !== "processando" && step !== "sucesso" && (
          <button
            onClick={handleClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-espresso-600/70 text-crema-300 transition-all hover:border-clay-500 hover:text-clay-300"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}

        {/* indicador de passos */}
        {(step === "envio" || step === "pagamento") && (
          <>
            <div className="mb-6 flex items-center gap-3">
              {(["envio", "pagamento"] as Step[]).map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold transition-colors ${
                      step === s
                        ? "bg-ember-500 text-espresso-950"
                        : i === 0
                          ? "bg-sage-400 text-espresso-950"
                          : "border border-espresso-500 text-crema-400"
                    }`}
                  >
                    {i === 0 && step === "pagamento" ? "✓" : i + 1}
                  </span>
                  <span
                    className={`text-sm font-bold ${step === s ? "text-crema-50" : "text-crema-400"}`}
                  >
                    {s === "envio" ? "Envio" : "Pagamento"}
                  </span>
                  {i === 0 && <span className="h-px flex-1 bg-espresso-600" />}
                </div>
              ))}
            </div>

            <h2 className="font-display text-2xl font-semibold text-crema-50">
              {step === "envio" ? "Para onde enviamos?" : "Quase lá — pagamento"}
            </h2>
            <p className="mt-1 text-sm text-crema-400">
              {step === "envio"
                ? "Dados de entrega da tua encomenda de café."
                : "Demonstração segura — nenhum dado é guardado ou cobrado."}
            </p>

            <div className="mt-5 space-y-4">
              {step === "envio" ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome completo" placeholder="Maria dos Santos" value={form.nome} onChange={set("nome")} error={errors.nome} />
                    <Field label="Email" type="email" placeholder="maria@exemplo.pt" value={form.email} onChange={set("email")} error={errors.email} />
                  </div>
                  <Field label="Morada" placeholder="Rua do Alecrim, 24 — 2.º Esq." value={form.morada} onChange={set("morada")} error={errors.morada} />
                  <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                    <Field label="Cidade" placeholder="Lisboa" value={form.cidade} onChange={set("cidade")} error={errors.cidade} />
                    <Field label="Código postal" placeholder="1200-018" value={form.cp} onChange={set("cp")} error={errors.cp} />
                  </div>
                  {summary}
                  <button
                    onClick={() => validateShipping() && setStep("pagamento")}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-ember-500 py-3.5 text-sm font-extrabold text-espresso-950 transition-all hover:bg-ember-400 active:scale-[0.98]"
                  >
                    Continuar para pagamento
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              ) : (
                <>
                  <Field label="Número do cartão" inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.cartao} onChange={set("cartao")} error={errors.cartao} />
                  <Field label="Nome no cartão" placeholder="MARIA SANTOS" value={form.titular} onChange={set("titular")} error={errors.titular} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Validade" inputMode="numeric" placeholder="12/27" value={form.validade} onChange={set("validade")} error={errors.validade} />
                    <Field label="CVC" inputMode="numeric" placeholder="123" value={form.cvc} onChange={set("cvc")} error={errors.cvc} />
                  </div>
                  {summary}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("envio")}
                      className="rounded-full border border-espresso-500/80 px-5 py-3.5 text-sm font-bold text-crema-200 transition-all hover:border-ember-500/60 hover:text-ember-300 active:scale-95"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={pay}
                      className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-ember-500 py-3.5 text-sm font-extrabold text-espresso-950 transition-all hover:bg-ember-400 active:scale-[0.98]"
                    >
                      <LockIcon className="h-4 w-4" />
                      Pagar {eur(total)}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {step === "processando" && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-espresso-600 border-t-ember-400" style={{ animationDuration: "0.9s" }} />
              <span className="absolute inset-3 animate-ping rounded-full bg-ember-500/20" />
            </div>
            <h2 className="font-display mt-6 text-2xl font-semibold text-crema-50">A confirmar o pagamento…</h2>
            <p className="mt-2 text-sm text-crema-400">A falar com o banco (de mentira). Uns segundos.</p>
          </div>
        )}

        {step === "sucesso" && (
          <div className="flex flex-col items-center py-8 text-center">
            <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" aria-hidden>
              <circle cx="32" cy="32" r="29" stroke="#84955f" strokeWidth="3" opacity="0.35" />
              <circle cx="32" cy="32" r="29" stroke="#a3b18a" strokeWidth="3" strokeLinecap="round" strokeDasharray="183" strokeDashoffset="0" className="opacity-90" style={{ transformOrigin: "center", transform: "rotate(-90deg)" }} />
              <path d="M20 33.5 28.5 42 45 24.5" stroke="#f0b36a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
            </svg>
            <h2 className="font-display mt-5 text-3xl font-semibold text-crema-50">Encomenda confirmada!</h2>
            <p className="mt-2 text-sm leading-relaxed text-crema-300">
              A tua encomenda <strong className="text-ember-300">{order}</strong> já está na fila da
              torra. Enviámos a confirmação para <strong className="text-crema-100">{form.email || "o teu email"}</strong>.
            </p>
            <div className="mt-6 w-full">{summary}</div>
            <button
              onClick={() => onComplete()}
              className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-ember-500 py-3.5 text-sm font-extrabold text-espresso-950 transition-all hover:bg-ember-400 active:scale-[0.98]"
            >
              Continuar a explorar
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
