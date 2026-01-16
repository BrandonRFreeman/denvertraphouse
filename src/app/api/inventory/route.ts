import { NextResponse } from "next/server";
import { sampleProducts, type Product } from "@/lib/sampleInventory";

type MaybeNumber = number | string | undefined;

type KoronaProduct = {
  id?: string;
  number?: string;
  productId?: string;
  name?: string;
  title?: string;
  description?: string;
  brand?: string | { name?: string };
  manufacturer?: string;
  category?: string | { name?: string };
  group?: string;
  price?: { value?: MaybeNumber; gross?: MaybeNumber } | MaybeNumber;
  salesPrice?: { value?: MaybeNumber };
  salesPrices?: { value?: MaybeNumber }[];
  stock?: { quantity?: MaybeNumber; amount?: MaybeNumber };
  inventory?: MaybeNumber;
  quantity?: MaybeNumber;
  tags?: string[];
  labels?: string[];
};

const isKoronaArray = (value: unknown): value is KoronaProduct[] =>
  Array.isArray(value);

const toNumber = (value: MaybeNumber): number => {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const parseProducts = (payload: unknown): KoronaProduct[] => {
  if (isKoronaArray(payload)) return payload;

  if (typeof payload === "object" && payload !== null) {
    const obj = payload as Record<string, unknown>;
    const keys = ["results", "items", "elements", "data"];
    for (const key of keys) {
      const candidate = obj[key];
      if (isKoronaArray(candidate)) {
        return candidate;
      }
    }
  }

  return [];
};

const normalizeProduct = (item: KoronaProduct, index: number): Product => {
  const priceField = item.price;
  const salesPrice = item.salesPrice?.value ?? item.salesPrices?.[0]?.value;
  const rawPrice =
    (typeof priceField === "object" && priceField !== null
      ? (priceField as { value?: MaybeNumber; gross?: MaybeNumber }).value ??
        (priceField as { gross?: MaybeNumber }).gross
      : priceField) ?? salesPrice ?? 0;

  const category =
    typeof item.category === "string"
      ? item.category
      : item.category?.name ?? item.group;

  const brand =
    typeof item.brand === "string" ? item.brand : item.brand?.name ?? item.manufacturer;

  const stock =
    item.stock?.quantity ??
    item.stock?.amount ??
    item.inventory ??
    item.quantity;

  return {
    id: item.id ?? item.number ?? item.productId ?? `korona-${index}`,
    name: item.name ?? item.title ?? item.description ?? "Product",
    brand,
    category,
    price: toNumber(rawPrice),
    stock: toNumber(stock ?? 0) || undefined,
    tags: item.tags ?? item.labels ?? undefined,
  };
};

export async function GET() {
  const baseUrl = process.env.KORONA_API_BASE || "https://api.korona.cloud/v3";
  const organizationId = process.env.KORONA_ORG_ID;
  const token = process.env.KORONA_API_TOKEN;
  const username = process.env.KORONA_API_USERNAME;
  const password = process.env.KORONA_API_PASSWORD;

  if (organizationId && (token || (username && password))) {
    try {
      const authHeader = token
        ? `Bearer ${token}`
        : `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
      const url = `${baseUrl}/organizations/${organizationId}/products?active=true&sort=name&max=50`;
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: authHeader,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Korona API responded with ${res.status}`);
      }

      const data = await res.json();
      const normalized = parseProducts(data).map(normalizeProduct);

      if (normalized.length > 0) {
        return NextResponse.json({
          source: "korona",
          products: normalized,
        });
      }
    } catch (error) {
      console.error("Korona inventory fetch failed, falling back to sample set:", error);
    }
  }

  return NextResponse.json({
    source: "mock",
    products: sampleProducts,
  });
}
