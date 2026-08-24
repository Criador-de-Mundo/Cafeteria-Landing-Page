import { useEffect, useMemo, useState } from "react";
import CartDrawer, {
  FREE_SHIPPING_AT,
  SHIPPING_COST,
  type CartLine,
} from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IntroBand from "./components/IntroBand";
import ProductModal from "./components/ProductModal";
import Reveal from "./components/Reveal";
import ShopSection, { type SortId } from "./components/ShopSection";
import Ticker from "./components/Ticker";
import Toasts, { type Toast } from "./components/Toasts";
import {
  categoryLabel,
  products,
  type CategoryId,
  type Product,
  type Weight,
} from "./data/products";

interface StoredItem {
  productId: string;
  weight: Weight;
  qty: number;
}

const CART_KEY = "brasa-cart-v1";

const loadCart = (): StoredItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredItem[];
    return parsed.filter(
      (i) =>
        products.some((p) => p.id === i.productId) &&
        (i.weight === "250g" || i.weight === "1kg") &&
        i.qty > 0
    );
  } catch {
    return [];
  }
};

function RitualStrip() {
  const steps = [
    [
      "Moer na hora",
      "Quinze gramas por cada 250 ml, moídos grossos como sal marinho. O aroma que sobe do moinho é metade do café.",
    ],
    [
      "Água a 93 °C",
      "Nunca a ferver — queima a doçura. Se não tens termómetro, espera 40 segundos depois de o fervedor desligar.",
    ],
    [
      "Paciência de 3 minutos",
      "Verte em círculos, deixa a crosta descer, prova sem pressa. O café bom recompensa quem espera.",
    ],
  ];
  return (
    <section className="border-t border-espresso-700/70 bg-espresso-950/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-ember-400">
              <span className="h-px w-10 bg-ember-500/70" />
              O ritual da casa
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-crema-50 sm:text-[2.5rem]">
              Três gestos,
              <br />
              uma chávena <em className="font-light italic text-ember-300">memorável</em>.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-crema-300">
              Não precisas de balança de laboratório nem de cronómetro suíço. Precisas de grão
              fresco, água honesta e dois dedos de atenção. A receita completa segue em cada
              encomenda.
            </p>
          </div>
        </Reveal>
        <div>
          {steps.map(([title, text], i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="group flex gap-6 border-b border-espresso-700/80 py-7 first:border-t sm:gap-10">
                <span className="font-display text-4xl font-light italic text-ember-500/60 transition-colors duration-300 group-hover:text-ember-400 sm:text-5xl">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-crema-50 sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-crema-300">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "todos">("todos");
  const [sort, setSort] = useState<SortId>("destaque");
  const [cart, setCart] = useState<StoredItem[]>(loadCart);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* armazenamento indisponível */
    }
  }, [cart]);

  const notify = (title: string, sub?: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, title, sub }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  };

  const addToCart = (p: Product, weight: Weight = "250g", qty = 1) => {
    const key = `${p.id}:${weight}`;
    setCart((c) => {
      const existing = c.find((i) => `${i.productId}:${i.weight}` === key);
      if (existing)
        return c.map((i) =>
          `${i.productId}:${i.weight}` === key ? { ...i, qty: Math.min(12, i.qty + qty) } : i
        );
      return [...c, { productId: p.id, weight, qty }];
    });
    notify(`${p.name} no carrinho`, `${weight} · torra desta semana`);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((c) =>
      c
        .map((i) =>
          `${i.productId}:${i.weight}` === key ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeLine = (key: string) =>
    setCart((c) => c.filter((i) => `${i.productId}:${i.weight}` !== key));

  const lines: CartLine[] = useMemo(
    () =>
      cart
        .map((i) => {
          const product = products.find((p) => p.id === i.productId);
          return product ? { key: `${i.productId}:${i.weight}`, product, weight: i.weight, qty: i.qty } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [cart]
  );

  const cartCount = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.product.price[l.weight] * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (category === "todos" || p.category === category) &&
        (q === "" ||
          [p.name, p.origin, categoryLabel(p.category), ...p.notes, p.process]
            .join(" ")
            .toLowerCase()
            .includes(q))
    );
    switch (sort) {
      case "preco-asc":
        list = [...list].sort((a, b) => a.price["250g"] - b.price["250g"]);
        break;
      case "preco-desc":
        list = [...list].sort((a, b) => b.price["250g"] - a.price["250g"]);
        break;
      case "nome":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, "pt"));
        break;
    }
    return list;
  }, [query, category, sort]);

  const featured = products.find((p) => p.badge === "Torra da semana") ?? products[0];

  const clearFilters = () => {
    setQuery("");
    setCategory("todos");
    setSort("destaque");
  };

  return (
    <div className="relative min-h-screen font-body text-crema-100">
      {/* fundo ambiente */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1a120d_0%,#211712_45%,#150e0a_100%)]" />
        <div className="orb-a absolute -left-[12%] -top-[14%] h-[58vw] w-[58vw] rounded-full bg-[radial-gradient(circle,rgba(208,126,46,0.16),transparent_65%)] blur-2xl" />
        <div className="orb-b absolute -bottom-[18%] -right-[10%] h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(circle,rgba(176,83,44,0.14),transparent_65%)] blur-2xl" />
        <div className="absolute left-1/2 top-[38%] h-[36vw] w-[36vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(163,177,138,0.06),transparent_65%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_55%,rgba(10,6,4,0.5))]" />
      </div>
      {/* grão de filme */}
      <div className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.05]" aria-hidden />

      <Header
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <Ticker />
      <main>
        <IntroBand
          product={featured}
          onOpenProduct={setActiveProduct}
          onQuickAdd={(p) => addToCart(p)}
        />
        <ShopSection
          all={products}
          filtered={filtered}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
          query={query.trim()}
          onClearFilters={clearFilters}
          onOpenProduct={setActiveProduct}
          onAdd={(p) => addToCart(p)}
        />
        <RitualStrip />
      </main>
      <Footer notify={notify} />

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAdd={(p, w, q) => addToCart(p, w, q)}
      />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => {
          setCart([]);
          setCheckoutOpen(false);
          notify("Obrigado pela encomenda", "Sai na próxima torra — avisamos quando embarcar.");
        }}
      />
      <Toasts toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </div>
  );
}
