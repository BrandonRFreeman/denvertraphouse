export type Product = {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  stock?: number;
  tags?: string[];
  image?: string;
};

export const sampleProducts: Product[] = [
  {
    id: "trap-01",
    name: "Electric Slime Rig",
    brand: "RiNo Glass Lab",
    category: "Glass Art",
    price: 189.99,
    stock: 4,
    tags: ["Artist drop", "UV-reactive"],
  },
  {
    id: "trap-02",
    name: "Neon Chill Gummy (25ct)",
    brand: "Mile High Botanicals",
    category: "CBD",
    price: 39.5,
    stock: 18,
    tags: ["Calm", "Mixed fruit"],
  },
  {
    id: "trap-03",
    name: "Skyline Disposable",
    brand: "Altitude Labs",
    category: "Vape",
    price: 32.0,
    stock: 27,
    tags: ["Live resin", "Hybrid"],
  },
  {
    id: "trap-04",
    name: "Glow Torch Mini",
    brand: "Trap Tools",
    category: "Accessories",
    price: 26.99,
    stock: 9,
    tags: ["Micro size", "Refillable"],
  },
  {
    id: "trap-05",
    name: "Scoop Ash Catcher",
    brand: "Local Glass",
    category: "Glass",
    price: 54.0,
    stock: 7,
    tags: ["14mm", "45° joint"],
  },
  {
    id: "trap-06",
    name: "Cloud Control Spray",
    brand: "Neutralize",
    category: "Lifestyle",
    price: 14.5,
    stock: 20,
    tags: ["Odor control"],
  },
];
