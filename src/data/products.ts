export type Weight = "250g" | "1kg";

export type CategoryId = "single-origin" | "blend" | "descafeinado";

export interface Product {
  id: string;
  name: string;
  origin: string;
  category: CategoryId;
  price: Record<Weight, number>;
  notes: string[];
  roast: 1 | 2 | 3 | 4 | 5;
  altitude: string;
  process: string;
  variety: string;
  description: string;
  image: string;
  accent: string;
  badge?: string;
}

export const WEIGHTS: Weight[] = ["250g", "1kg"];

export const CATEGORIES: { id: CategoryId | "todos"; label: string }[] = [
  { id: "todos", label: "Todos os cafés" },
  { id: "single-origin", label: "Origens únicas" },
  { id: "blend", label: "Blends de autor" },
  { id: "descafeinado", label: "Descafeinado" },
];

export const categoryLabel = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const roastLabel = (n: number): string =>
  ["", "Muito clara", "Clara", "Média", "Média-escura", "Escura"][n] ?? "";

export const products: Product[] = [
  {
    id: "yirgacheffe",
    name: "Etiópia Yirgacheffe",
    origin: "Gedeo · Etiópia",
    category: "single-origin",
    price: { "250g": 16.5, "1kg": 59 },
    notes: ["Bergamota", "Jasmim", "Pêssego"],
    roast: 2,
    altitude: "1.900 – 2.200 m",
    process: "Lavado",
    variety: "Heirloom",
    description:
      "Um clássico das terras altas de Gedeo, colhido por pequenos produtores e fermentado com precisão. Na chávena é luminoso e floral — bergamota e jasmim abrem, o pêssego fecha com doçura de chá preto. Torra clara pensada para V60 e Chemex.",
    image: "/cafes/yirgacheffe.png",
    accent: "#e39a4a",
    badge: "Torra da semana",
  },
  {
    id: "cerrado",
    name: "Brasil Cerrado",
    origin: "Minas Gerais · Brasil",
    category: "single-origin",
    price: { "250g": 13.9, "1kg": 49.5 },
    notes: ["Chocolate", "Avelã", "Rapadura"],
    roast: 3,
    altitude: "1.100 – 1.300 m",
    process: "Natural",
    variety: "Mundo Novo",
    description:
      "Do planalto do Cerrado mineiro, um natural seco ao sol que enche a chávena: corpo redondo, chocolate de leite, avelã tostada e um final longo de rapadura. Confortável em espresso, irresistível em moka e prensa francesa.",
    image: "/cafes/cerrado.png",
    accent: "#b9803f",
  },
  {
    id: "huila",
    name: "Colômbia Huila",
    origin: "San Agustín · Colômbia",
    category: "single-origin",
    price: { "250g": 15.2, "1kg": 54 },
    notes: ["Caramelo", "Frutos vermelhos", "Laranja"],
    roast: 3,
    altitude: "1.600 – 1.800 m",
    process: "Lavado",
    variety: "Caturra & Castillo",
    description:
      "Cultivado à sombra das montanhas de San Agustín, este lavado colombiano equilibra doçura de caramelo com a acidez viva de laranja sanguinela e frutos vermelhos. Um café versátil que brilha em qualquer método de filtro.",
    image: "/cafes/huila.png",
    accent: "#c96f4a",
  },
  {
    id: "alvorada",
    name: "Blend Alvorada",
    origin: "Brasil & Colômbia",
    category: "blend",
    price: { "250g": 12.8, "1kg": 45 },
    notes: ["Cacau", "Açúcar mascavado", "Noz"],
    roast: 4,
    altitude: "Blend de altitude",
    process: "Lavado & Natural",
    variety: "Composição de autor",
    description:
      "O blend da casa para começar o dia: 70% Brasil natural para o corpo e a doçura de mascavado, 30% Colômbia lavada para o brilho de cacau e noz. Desenhado para espresso com leite — corta o leite sem perder delicadeza.",
    image: "/cafes/alvorada.png",
    accent: "#d07e2e",
    badge: "Mais vendido",
  },
  {
    id: "meia-noite",
    name: "Blend Meia-Noite",
    origin: "Brasil · Índia · Uganda",
    category: "blend",
    price: { "250g": 12.4, "1kg": 44 },
    notes: ["Chocolate 70%", "Especiarias", "Figo"],
    roast: 5,
    altitude: "Blend de altitude",
    process: "Natural & Robusta lavado",
    variety: "Composição de autor",
    description:
      "Escuro, denso e sem medo: um blend de torra escura com chocolate amargo, especiarias doces e figo maduro. Um toque de robusta lavado ugandês dá-lhe crema espessa e cafeína a sério. Para quem gosta do café a falar alto.",
    image: "/cafes/meia-noite.png",
    accent: "#8c5a3c",
  },
  {
    id: "peru-decaf",
    name: "Peru Descafeinado",
    origin: "Cajamarca · Peru",
    category: "descafeinado",
    price: { "250g": 14.6, "1kg": 52 },
    notes: ["Mel", "Amêndoa", "Maçã cozida"],
    roast: 3,
    altitude: "1.500 – 1.700 m",
    process: "Lavado · EA cana-de-açúcar",
    variety: "Typica",
    description:
      "Descafeinado a sério, sem químicas agressivas: a cafeína é extraída com acetato de etilo de cana-de-açúcar peruana, preservando a doçura de mel, amêndoa e maçã cozida. O café das onze da noite que sabe a sobremesa.",
    image: "/cafes/peru-decaf.png",
    accent: "#a3b18a",
    badge: "Novo lote",
  },
];
