import { useEffect, useRef, useState } from "react";
import { categoryLabel, roastLabel, type Product } from "../data/products";
import { eur } from "../lib/format";
import { ArrowIcon, CheckIcon, PlusIcon, RoastDots } from "./Icons";

interface ProductCardProps {
  product: Product;
  index: number;
  onOpenProduct: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function ProductCard({ product, index, onOpenProduct, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-espresso-700/70 bg-espresso-850 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]"
      style={{ transitionDelay: `${(index % 3) * 40}ms` }}
    >
      <button
        onClick={() => onOpenProduct(product)}
        className="relative block cursor-pointer overflow-hidden text-left"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: `radial-gradient(55% 42% at 50% 25%, ${product.accent}4d, transparent 72%)` }}
        />
        <img
          src={product.image}
          alt={`Saco de café ${product.name}`}
          loading="lazy"
          className="relative aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-espresso-950/70 to-transparent" />
        {product.badge && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-ember-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-espresso-950 shadow-lg">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3.5 left-3.5 translate-y-2 rounded-full bg-espresso-950/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-crema-100 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Ver detalhes
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-crema-400">
          {product.origin} · {categoryLabel(product.category)}
        </p>
        <h3 className="font-display mt-1.5 text-[21px] font-semibold leading-tight text-crema-50">
          {product.name}
        </h3>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-espresso-600/90 bg-espresso-800/70 px-2.5 py-0.5 text-[11px] font-semibold text-crema-200"
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-crema-400">
          <RoastDots level={product.roast} />
          Torra {roastLabel(product.roast).toLowerCase()}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-espresso-700/80 pt-4">
          <p className="font-display text-[22px] font-semibold leading-none text-crema-50">
            {eur(product.price["250g"])}
            <span className="ml-1 text-xs font-normal text-crema-400">/ 250 g</span>
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all active:scale-[0.96] ${
              added
                ? "bg-sage-400 text-espresso-950"
                : "bg-ember-500 text-espresso-950 hover:bg-ember-400"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="h-4 w-4" /> Adicionado
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" /> Adicionar
              </>
            )}
          </button>
          <button
            onClick={() => onOpenProduct(product)}
            aria-label={`Detalhes de ${product.name}`}
            className="group/btn flex items-center justify-center rounded-full border border-espresso-500/80 px-4 text-crema-200 transition-all hover:border-ember-500/70 hover:text-ember-300 active:scale-[0.96]"
          >
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
