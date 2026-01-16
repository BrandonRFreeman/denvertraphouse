import { NextResponse } from "next/server";
import { sampleProducts } from "@/lib/sampleInventory";
import type { CartItem } from "@/components/cart/CartProvider";

export async function POST(request: Request) {
  const body = await request.json();
  const items = Array.isArray(body?.items) ? (body.items as CartItem[]) : [];

  const validated = items
    .map((item: CartItem) => {
      const product = sampleProducts.find((p) => p.id === item.id);
      if (!product) return null;
      const qty = Math.max(1, Number(item.quantity) || 1);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        category: product.category,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const total = validated.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return NextResponse.json({
    source: "mock",
    items: validated,
    total,
  });
}
