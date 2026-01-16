"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/lib/sampleInventory";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button className="btn primary" onClick={() => addItem(product, 1)}>
      Add to cart
    </button>
  );
}
