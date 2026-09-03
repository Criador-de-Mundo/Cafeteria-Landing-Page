import { categoryLabel, roastLabel, type Product } from "../data/products";
import { eur } from "../lib/format";
import { ArrowIcon, BeanIcon, DropIcon, MountainIcon, RoastDots } from "./Icons";
import Reveal from "./Reveal";

interface IntroBandProps {
  product: Product;
  onOpenProduct: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export default function IntroBand({ product, onOpenProduct, onQuickAdd }: IntroBandProps) {
  const scrollToShop = () =>
    document.getElementById("coleccao")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24 lg:pt-16">
        {/* coluna editorial */}
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-ember-400">
              <span className="h-px w-10 bg-ember-500/70" />
              Micro-lotes · torrados em Lisboa
            </p>
            <h1 className="font-display text-[2.7rem] font-semibold leading-[1.01] tracking-tight text-crema-50 sm:text-6xl xl:text-[4.5rem]">
              Do grão à chávena,
              <br />
              com o <em className="font-light italic text-ember-300">fogo certo</em>.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-crema-300 sm:text-base">
              Compramos directamente a produtores em três continentes, torramos em pequenos
              lotes de 12&nbsp;kg e enviamos em menos de sete dias após a torra. Seis cafés,
              zero compromissos — só o que está no pico da curva.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToShop}
                className="group flex items-center gap-2.5 rounded-full bg-ember-500 px-6 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_30px_-8px_rgba(208,126,46,0.55)] transition-all hover:bg-ember-400 hover:shadow-[0_10px_36px_-6px_rgba(208,126,46,0.65)] active:scale-95"
              >
                Explorar a colecção
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onOpenProduct(product)}
                className="rounded-full border border-espresso-500/80 px-6 py-3.5 text-sm font-bold text-crema-200 transition-all hover:border-ember-500/70 hover:text-ember-300 active:scale-95"
              >
                Torra da semana
              </button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-espresso-700/80 pt-6">
              {[
                ["06", "micro-lotes em carta"],
                ["≤ 7 dias", "da torra à tua porta"],
                ["84+", "pontuação SCA média"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-semibold text-ember-300">{n}</dt>
                  <dd className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-crema-400">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* destaque da semana */}
        <Reveal delay={180}>
          <article className="relative mx-auto w-full max-w-md">
            {/* carimbo giratório */}
            <div className="absolute -left-7 -top-8 z-20 hidden h-28 w-28 sm:block">
              <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
                <defs>
                  <path id="circPath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <circle cx="50" cy="50" r="49" fill="#1a120d" stroke="#4e382a" />
                <text className="fill-ember-300 text-[10.2px] font-bold uppercase" style={{ letterSpacing: "2.6px" }}>
                  <textPath href="#circPath">torra fresca • pequenos lotes •</textPath>
                </text>
              </svg>
              <BeanIcon className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-ember-400" />
            </div>

            <div className="overflow-hidden rounded-xl border border-espresso-600/70 bg-gradient-to-b from-espresso-800 to-espresso-850 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
              <button
                onClick={() => onOpenProduct(product)}
                className="group relative block w-full cursor-pointer overflow-hidden"
                aria-label={`Ver detalhes de ${product.name}`}
              >
                {/* vapor */}
                <svg
                  viewBox="0 0 60 40"
                  className="pointer-events-none absolute left-1/2 top-3 z-10 h-10 w-16 -translate-x-1/2 text-crema-100/80"
                  fill="none"
                  aria-hidden
                >
                  {[0, 1, 2].map((i) => (
                    <path
                      key={i}
                      className="steam-path"
                      style={{ animationDelay: `${i * 0.9}s` }}
                      d={`M${18 + i * 12} 34 C ${14 + i * 12} 26, ${22 + i * 12} 20, ${18 + i * 12} 12 C ${15 + i * 12} 7, ${20 + i * 12} 4, ${18 + i * 12} 2`}
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-80"
                  style={{ background: `radial-gradient(60% 45% at 50% 22%, ${product.accent}55, transparent 70%)` }}
                />
                <img
                  src={product.image}
                  alt={`Saco de café ${product.name}`}
                  className="relative aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 z-10 rounded-full bg-ember-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-espresso-950">
                  {product.badge ?? categoryLabel(product.category)}
                </span>
              </button>

              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-crema-400">
                  {product.origin}
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-2xl font-semibold text-crema-50">{product.name}</h2>
                  <span className="font-display text-xl font-semibold text-ember-300">
                    {eur(product.price["250g"])}
                    <span className="ml-1 text-xs font-normal text-crema-400">/ 250 g</span>
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {product.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-espresso-600 bg-espresso-800/60 px-2.5 py-0.5 text-[11px] font-semibold text-crema-200"
                    >
                      {n}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-crema-400">
                    <RoastDots level={product.roast} />
                    {roastLabel(product.roast)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-espresso-700/80 pt-3.5 text-[12px] text-crema-300">
                  <span className="flex items-center gap-1.5">
                    <MountainIcon className="h-3.5 w-3.5 text-ember-400" /> {product.altitude}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DropIcon className="h-3.5 w-3.5 text-ember-400" /> {product.process}
                  </span>
                </div>
                <div className="mt-5 flex gap-2.5">
                  <button
                    onClick={() => onQuickAdd(product)}
                    className="flex-1 rounded-full bg-crema-100 py-3 text-sm font-bold text-espresso-950 transition-all hover:bg-ember-300 active:scale-[0.97]"
                  >
                    Adicionar · {eur(product.price["250g"])}
                  </button>
                  <button
                    onClick={() => onOpenProduct(product)}
                    className="rounded-full border border-espresso-500/80 px-5 text-sm font-bold text-crema-200 transition-all hover:border-ember-500/70 hover:text-ember-300 active:scale-[0.97]"
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
