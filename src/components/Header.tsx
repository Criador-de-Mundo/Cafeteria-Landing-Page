import { useState } from "react";
import { BasketIcon, BeanIcon, CloseIcon, SearchIcon } from "./Icons";

interface HeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ query, onQueryChange, cartCount, onOpenCart }: HeaderProps) {
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-espresso-700/70 bg-espresso-900/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[72px] sm:px-6">
        {/* logótipo */}
        <a
          href="#topo"
          className="group flex items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ember-500 text-espresso-950 transition-transform duration-300 group-hover:rotate-12">
            <BeanIcon className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-[22px] font-bold tracking-tight text-crema-50">
              BRASA
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-crema-400">
              café de especialidade
            </span>
          </span>
        </a>

        {/* pesquisa desktop */}
        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-crema-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Pesquisar cafés, origens, notas de prova…"
            className="w-full rounded-full border border-espresso-600/70 bg-espresso-800/80 py-2.5 pl-11 pr-10 text-sm text-crema-100 placeholder:text-crema-500 transition-all focus:border-ember-500/70 focus:outline-none focus:ring-2 focus:ring-ember-500/25"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              aria-label="Limpar pesquisa"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-crema-400 transition-colors hover:bg-espresso-700 hover:text-crema-100"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            onClick={() => setMobileSearch((v) => !v)}
            aria-label="Abrir pesquisa"
            className="grid h-10 w-10 place-items-center rounded-full border border-espresso-600/70 text-crema-200 transition-colors hover:border-ember-500/60 hover:text-ember-300 md:hidden"
          >
            {mobileSearch ? <CloseIcon className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Abrir carrinho, ${cartCount} artigos`}
            className="relative flex h-10 items-center gap-2 rounded-full bg-crema-100 px-4 text-sm font-bold text-espresso-950 transition-all hover:bg-ember-300 active:scale-95"
          >
            <BasketIcon className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-badge-bump absolute -right-1 -top-1 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-clay-500 px-1 text-[11px] font-extrabold text-crema-50 shadow-md"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* pesquisa mobile */}
      <div
        className={`overflow-hidden border-espresso-700/70 transition-all duration-300 md:hidden ${
          mobileSearch ? "max-h-20 border-t" : "max-h-0"
        }`}
      >
        <div className="relative px-4 py-3">
          <SearchIcon className="pointer-events-none absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-crema-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Pesquisar cafés, origens, notas…"
            className="w-full rounded-full border border-espresso-600/70 bg-espresso-800/80 py-2.5 pl-11 pr-4 text-sm text-crema-100 placeholder:text-crema-500 focus:border-ember-500/70 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}
