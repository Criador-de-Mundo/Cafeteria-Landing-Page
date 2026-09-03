import type { Weight } from "../data/products";
import type { Product } from "../data/products";
import { eur } from "../lib/format";
import { ArrowIcon, BasketIcon, CloseIcon, CupIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon } from "./Icons";

export interface CartLine {
  key: string;
  product: Product;
  weight: Weight;
  qty: number;
}

export const FREE_SHIPPING_AT = 30;
export const SHIPPING_COST = 3.9;

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, lines, onClose, onUpdateQty, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = lines.reduce((acc, l) => acc + l.product.price[l.weight] * l.qty, 0);
  const count = lines.reduce((acc, l) => acc + l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  const goToShop = () => {
    onClose();
    window.setTimeout(
      () => document.getElementById("coleccao")?.scrollIntoView({ behavior: "smooth" }),
      250
    );
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        aria-label="Fechar carrinho"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 w-full cursor-default bg-espresso-950/80 backdrop-blur-sm transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-espresso-600/60 bg-espresso-850 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrinho de compras"
      >
        {/* cabeçalho */}
        <div className="flex items-center justify-between border-b border-espresso-700/80 px-6 py-5">
          <h2 className="font-display flex items-center gap-3 text-xl font-semibold text-crema-50">
            <BasketIcon className="h-5 w-5 text-ember-400" />
            O teu carrinho
            {count > 0 && (
              <span className="rounded-full bg-espresso-700 px-2.5 py-0.5 text-xs font-bold text-crema-200">
                {count} {count === 1 ? "artigo" : "artigos"}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full border border-espresso-600/70 text-crema-300 transition-all hover:border-clay-500 hover:text-clay-300 active:scale-90"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <CupIcon className="h-16 w-16 text-espresso-500" />
            <h3 className="font-display mt-5 text-2xl font-semibold text-crema-100">
              O carrinho está vazio
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-crema-400">
              Ainda não há grãos a caminho da tua chávena. A colecção está a um clique — e a
              torra saiu esta semana.
            </p>
            <button
              onClick={goToShop}
              className="group mt-7 flex items-center gap-2.5 rounded-full bg-ember-500 px-6 py-3 text-sm font-bold text-espresso-950 transition-all hover:bg-ember-400 active:scale-95"
            >
              Explorar cafés
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <>
            {/* envio grátis */}
            <div className="border-b border-espresso-700/80 px-6 py-4">
              {shipping === 0 ? (
                <p className="flex items-center gap-2 text-[13px] font-bold text-sage-300">
                  <TruckIcon className="h-4.5 w-4.5" /> Tens envio grátis nesta encomenda!
                </p>
              ) : (
                <p className="flex items-center gap-2 text-[13px] font-semibold text-crema-300">
                  <TruckIcon className="h-4.5 w-4.5 text-ember-400" />
                  Faltam <strong className="text-ember-300">{eur(FREE_SHIPPING_AT - subtotal)}</strong> para envio grátis
                </p>
              )}
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-espresso-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember-600 to-ember-400 transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* linhas */}
            <ul className="flex-1 divide-y divide-espresso-700/70 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.key} className="animate-rise flex gap-4 py-5">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-20 w-16 shrink-0 rounded-lg border border-espresso-700 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-[15px] font-semibold leading-tight text-crema-50">
                          {l.product.name}
                        </h3>
                        <p className="mt-0.5 text-[12px] font-semibold text-crema-400">
                          {l.weight} · {l.product.origin}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(l.key)}
                        aria-label={`Remover ${l.product.name}`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-crema-400 transition-all hover:bg-clay-500/20 hover:text-clay-300 active:scale-90"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-espresso-600/80 bg-espresso-800/60">
                        <button
                          onClick={() => onUpdateQty(l.key, -1)}
                          aria-label="Diminuir quantidade"
                          className="grid h-8 w-8 place-items-center text-crema-200 transition-colors hover:text-ember-300"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span key={l.qty} className="animate-badge-bump w-7 text-center text-sm font-bold text-crema-50">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(l.key, 1)}
                          disabled={l.qty >= 12}
                          aria-label="Aumentar quantidade"
                          className="grid h-8 w-8 place-items-center text-crema-200 transition-colors hover:text-ember-300 disabled:opacity-30"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-[15px] font-semibold text-ember-300">
                        {eur(l.product.price[l.weight] * l.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* resumo */}
            <div className="border-t border-espresso-700/80 bg-espresso-900/70 px-6 py-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-crema-300">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold text-crema-100">{eur(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-crema-300">
                  <dt>Envio</dt>
                  <dd className={`font-semibold ${shipping === 0 ? "text-sage-300" : "text-crema-100"}`}>
                    {shipping === 0 ? "Grátis" : eur(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-espresso-700/80 pt-2.5 text-base">
                  <dt className="font-display font-semibold text-crema-50">Total</dt>
                  <dd className="font-display text-lg font-bold text-ember-300">{eur(total)}</dd>
                </div>
              </dl>
              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-ember-500 py-3.5 text-sm font-extrabold text-espresso-950 shadow-[0_10px_30px_-10px_rgba(208,126,46,0.7)] transition-all hover:bg-ember-400 active:scale-[0.98]"
              >
                Finalizar compra
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-crema-500">
                Pagamento 100% simulado · sem dados reais
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
