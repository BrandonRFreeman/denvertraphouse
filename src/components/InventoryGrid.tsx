"use client";

import { useEffect, useState } from "react";
import { sampleProducts, type Product } from "@/lib/sampleInventory";

type InventoryResponse = {
  products?: Product[];
  source?: string;
};

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export default function InventoryGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("/api/inventory");
        if (!res.ok) throw new Error("Failed to load inventory");

        const data: InventoryResponse = await res.json();
        setProducts(data.products?.length ? data.products : sampleProducts);
      } catch (err) {
        console.error(err);
        setError("Showing featured picks while we sync live inventory.");
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="inventory-grid">
        {Array.from({ length: 6 }).map((_, idx) => (
          <article className="product-card skeleton-card" key={idx}>
            <div className="skeleton-bar" />
            <div className="skeleton-bar" style={{ width: "40%" }} />
            <div className="skeleton-meta">
              <div className="skeleton-bar" />
              <div className="skeleton-bar" style={{ width: "30%" }} />
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="inventory-grid">
      {error && (
        <div className="product-card" style={{ gridColumn: "1 / -1" }}>
          <p className="muted">{error}</p>
        </div>
      )}
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="chip">{product.category || "Featured"}</div>
          <h3>{product.name}</h3>
          <p className="muted">{product.brand || "Denver Trap House"}</p>
          <div className="product-meta">
            <span className="price">{formatPrice(product.price)}</span>
            <span className="stock">
              <span className="dot" style={{ background: "var(--lime)" }} />
              {typeof product.stock === "number"
                ? `${product.stock} in stock`
                : "In store"}
            </span>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="chips" style={{ marginTop: 6 }}>
              {product.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
