import { useEffect, useState } from "react";
import {
  categoryLabel,
  roastLabel,
  WEIGHTS,
  type Product,
  type Weight,
} from "../data/products";
import { eur } from "../lib/format";
import {
  CheckIcon,
  CloseIcon,
  DropIcon,
  FlameIcon,
  LeafIcon,
  MinusIcon,
  MountainIcon,
  PlusIcon,
  RoastDots,
} from "./Icons";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, weight: Weight, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [weight, setWeight] = useState<Weight>("250g");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setWeight("250g");
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const total = product.price[weight] * qty;

  const handleAdd = () => {
    onAdd(product, weight, qty);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      onClose();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        aria-label="Fechar detalhes"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-espresso-950/85 backdrop-blur-sm"
      />
      <div className="animate-rise relative z-10 grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-espresso-600/70 bg-espresso-850 shadow-2xl sm:rounded-xl md:grid-cols-2 md:overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3.5 top-3.5 z-20 grid h-9 w-9 place-items-center rounded-full bg-espresso-950/70 text-crema-200 backdrop-blur transition-all hover:bg-clay-500 hover:text-crema-50"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {/* imagem */}
        <div className="relative md:overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 blur-2xl"
            style={{ background: `radial-gradient(65% 50% at 50% 30%, ${product.accent}50, transparent 75%)` }}
          />
          <img
            src={product.image}
            alt={`Saco de café ${product.name}`}
            className="relative aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:min-h-[540px]"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-ember-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-espresso-950">
              {product.badge}
            </span>
          )}
        </div>

        {/* informação */}
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-ember-400">
            {categoryLabel(product.category)}
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold leading-tight text-crema-50 sm:text-[2.1rem]">
            {product.name}
          </h2>
          <p className="mt-1 text-sm font-semibold text-crema-400">{product.origin}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-espresso-600 bg-espresso-800/70 px-3 py-1 text-[12px] font-semibold text-crema-200"
              >
                {n}
              </span>
            ))}
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-crema-300">{product.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {[
              { icon: <MountainIcon className="h-4 w-4" />, k: "Altitude", v: product.altitude },
              { icon: <DropIcon className="h-4 w-4" />, k: "Processo", v: product.process },
              { icon: <LeafIcon className="h-4 w-4" />, k: "Variedade", v: product.variety },
              {
                icon: <FlameIcon className="h-4 w-4" />,
                k: `Torra ${roastLabel(product.roast).toLowerCase()}`,
                v: <RoastDots level={product.roast} />,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-espresso-700/80 bg-espresso-800/50 px-3.5 py-2.5"
              >
                <dt className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-crema-400">
                  <span className="text-ember-400">{s.icon}</span>
                  {s.k}
                </dt>
                <dd className="mt-1 text-[13px] font-semibold text-crema-100">{s.v}</dd>
              </div>
            ))}
          </dl>

          {/* formato */}
          <div className="mt-6">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-crema-400">
              Formato
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {WEIGHTS.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`rounded-lg border px-4 py-3 text-left transition-all active:scale-[0.97] ${
                    weight === w
                      ? "border-ember-500 bg-ember-500/15 shadow-[inset_0_0_0_1px_var(--color-ember-500)]"
                      : "border-espresso-600/80 bg-espresso-800/50 hover:border-ember-500/40"
                  }`}
                >
                  <span className="block text-sm font-extrabold text-crema-50">{w}</span>
                  <span className={`text-[13px] font-semibold ${weight === w ? "text-ember-300" : "text-crema-400"}`}>
                    {eur(product.price[w])}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* quantidade + adicionar */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center rounded-full border border-espresso-600/80 bg-espresso-800/60">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Diminuir quantidade"
                className="grid h-12 w-11 place-items-center text-crema-200 transition-colors hover:text-ember-300 disabled:opacity-30"
              >
                <MinusIcon />
              </button>
              <span className="w-8 text-center font-display text-lg font-semibold text-crema-50">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                disabled={qty >= 12}
                aria-label="Aumentar quantidade"
                className="grid h-12 w-11 place-items-center text-crema-200 transition-colors hover:text-ember-300 disabled:opacity-30"
              >
                <PlusIcon />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-full text-sm font-extrabold transition-all active:scale-[0.97] ${
                added
                  ? "bg-sage-400 text-espresso-950"
                  : "bg-ember-500 text-espresso-950 shadow-[0_8px_28px_-10px_rgba(208,126,46,0.7)] hover:bg-ember-400"
              }`}
            >
              {added ? (
                <>
                  <CheckIcon className="h-4 w-4" /> No carrinho!
                </>
              ) : (
                <>Adicionar · {eur(total)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
