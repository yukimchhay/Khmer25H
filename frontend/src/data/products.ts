// client/src/data/products.ts
// Mock data. Replace with a GET /api/products call once the product API exists.

export type Glaze = {
  id: string;
  name: string;
  hex: string;
  ink: string;
  stock: number;
};
export type Size = { id: string; label: string; price: number; scale: number };

export const GLAZES: Glaze[] = [
  { id: "cobalt", name: "Cobalt", hex: "#2F5BEA", ink: "#FFFFFF", stock: 8 },
  { id: "moss", name: "Moss", hex: "#5B7B4A", ink: "#FFFFFF", stock: 12 },
  { id: "saffron", name: "Saffron", hex: "#E8B230", ink: "#1B1A12", stock: 5 },
  { id: "plum", name: "Plum", hex: "#6B2D5C", ink: "#FFFFFF", stock: 9 },
  { id: "slate", name: "Slate", hex: "#56626E", ink: "#FFFFFF", stock: 15 },
];

export const SIZES: Size[] = [
  { id: "8", label: "8 oz", price: 28, scale: 0.88 },
  { id: "12", label: "12 oz", price: 34, scale: 1 },
];

export const DEFAULT_SIZE_ID = "12";

export const getGlaze = (id: string) => GLAZES.find((g) => g.id === id)!;
export const getSize = (id: string) => SIZES.find((s) => s.id === id)!;

export const money = (amount: number) => `$${amount}`;
