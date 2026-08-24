import { CATEGORIES, type CategoryId, type Product } from "../data/products";
import { FlameIcon, TruckIcon } from "./Icons";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export type SortId = "destaque" | "preco-asc" | "preco-desc" | "nome";

interface ShopSectionProps {
  all: Product[];
  filtered: Product[];
  category: CategoryId | "todos";
  onCategory: (c: CategoryId | "todos") => void;
  sort: SortId;
  onSort: (s: SortId) => void;
  query: string;
  onClearFilters: () => void;
  onOpenProduct: (p: Product) => void;
  onAdd: (p: Product) => void;
}

const SORTS: { id: SortId; label: string }[] = [
  { id: "destaque", label: "Em destaque" },
  { id: "preco-asc", label: "Preço: mais baixo" },
  { id: "preco-desc", label: "Preço: mais alto" },
  { id: "nome", label: "Nome A–Z" },
];

export default function ShopSection({
  all,
  filtered,
  category,
  onCategory,
  sort,
  onSort,
  query,
  onClearFilters,
  onOpenProduct,
  onAdd,
}: ShopSectionProps) {
  const countFor = (id: CategoryId | "todos") =>
    id === "todos" ? all.length : all.filter((p) => p.category === id).length;

  const sortSelect = (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortId)}
        aria-label="Ordenar produtos"
        className="w-full cursor-pointer appearance-none rounded-full border border-espresso-600/70 bg-espresso-800/80 py-2.5 pl-4 pr-10 text-sm font-semibold text-crema-100 transition-colors focus:border-ember-500/70 focus:outline-none"
      >
        {SORTS.map((s) => (
          <option key={s.id} value={s.id} className="bg-espresso-800">
            {s.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-crema-400"
        fill="none"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const categoryButtons = (compact = false) =>
    CATEGORIES.map((c) => {
      const active = category === c.id;
      return (
        <button
          key={c.id}
          onClick={() => onCategory(c.id)}
          className={
            compact
              ? `flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold transition-all active:scale-95 ${
                  active
                    ? "border-ember-500 bg-ember-500 text-espresso-950"
                    : "border-espresso-600/70 bg-espresso-800/60 text-crema-200 hover:border-ember-500/50"
                }`
              : `group flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm font-semibold transition-all ${
                  active
                    ? "bg-ember-500 text-espresso-950 shadow-[0_6px_20px_-8px_rgba(208,126,46,0.7)]"
                    : "text-crema-300 hover:bg-espresso-800 hover:text-crema-100"
                }`
          }
        >
          <span>{c.label}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
              active ? "bg-espresso-950/15 text-espresso-950" : "bg-espresso-700/80 text-crema-300"
            }`}
          >
            {countFor(c.id)}
          </span>
        </button>
      );
    });

  return (
    <section id="coleccao" className="scroll-mt-24 border-t border-espresso-700/70 bg-espresso-900/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-ember-400">
                <span className="h-px w-10 bg-ember-500/70" />
                Prontos a moer
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-crema-50 sm:text-[2.6rem]">
                A colecção <span className="font-light italic text-ember-300">da casa</span>
              </h2>
            </div>
            <p className="text-sm font-semibold text-crema-400">
              {filtered.length} {filtered.length === 1 ? "café" : "cafés"}
              {query && (
                <>
                  {" "}
                  para “<span className="text-ember-300">{query}</span>”
                </>
              )}
            </p>
          </div>
        </Reveal>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
          {/* sidebar desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-7">
              <div>
                <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-crema-400">
                  Categorias
                </h3>
                <nav className="space-y-1">{categoryButtons()}</nav>
              </div>
              <div>
                <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-crema-400">
                  Ordenar por
                </h3>
                {sortSelect}
              </div>
              <div className="space-y-3 rounded-xl border border-espresso-700/80 bg-espresso-850 p-4">
                <p className="flex items-start gap-2.5 text-[13px] leading-snug text-crema-300">
                  <TruckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ember-400" />
                  Envio grátis em encomendas acima de <strong className="text-crema-100">30&nbsp;€</strong>.
                </p>
                <p className="flex items-start gap-2.5 text-[13px] leading-snug text-crema-300">
                  <FlameIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ember-400" />
                  Tostamos às segundas e quintas — o teu café sai sempre fresco.
                </p>
              </div>
            </div>
          </aside>

          <div>
            {/* controlos mobile */}
            <div className="mb-6 space-y-3 lg:hidden">
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                {categoryButtons(true)}
              </div>
              {sortSelect}
            </div>

            {filtered.length === 0 ? (
              <div className="animate-rise flex flex-col items-center rounded-xl border border-dashed border-espresso-600/80 bg-espresso-850/60 px-6 py-20 text-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-14 w-14 text-espresso-500" aria-hidden>
                  <path
                    d="M12 2.6c4.9 0 8.4 4.1 8.4 9.4S16.9 21.4 12 21.4 3.6 17.3 3.6 12 7.1 2.6 12 2.6Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M12 2.8c-2.6 2.6-2.4 5.2-.4 7.4 1.9 2.1 2.3 4.9-.2 7.6-1.3 1.4-2.6 2.5-3.6 3.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path d="m4 20 16-16" stroke="#b0532c" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <h3 className="font-display mt-5 text-2xl font-semibold text-crema-100">
                  Nenhum café encontrado
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-crema-400">
                  Não encontrámos nada para essa combinação de pesquisa e filtros. Experimenta
                  outra palavra — “bergamota” costuma funcionar.
                </p>
                <button
                  onClick={onClearFilters}
                  className="mt-6 rounded-full bg-ember-500 px-6 py-3 text-sm font-bold text-espresso-950 transition-all hover:bg-ember-400 active:scale-95"
                >
                  Limpar pesquisa e filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 90} as="div">
                    <ProductCard product={p} index={i} onOpenProduct={onOpenProduct} onAdd={onAdd} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
