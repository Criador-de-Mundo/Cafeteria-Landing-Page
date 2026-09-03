import { products } from "../data/products";
import { BeanIcon } from "./Icons";

export default function Ticker() {
  const items = [
    ...products.flatMap((p) => p.notes),
    "Torra artesanal em pequenos lotes",
    "Envio grátis acima de 30 €",
    "Colheita 2024 / 25",
  ];

  const row = (key: string, ariaHidden = false) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden} key={key}>
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-5 text-[11px] font-bold uppercase tracking-[0.26em] text-crema-300">
            {item}
          </span>
          <BeanIcon className="h-3 w-3 shrink-0 text-ember-500" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-paused overflow-hidden border-y border-espresso-700/70 bg-espresso-950/70 py-2.5">
      <div className="animate-marquee flex w-max">
        {row("a")}
        {row("b", true)}
      </div>
    </div>
  );
}
