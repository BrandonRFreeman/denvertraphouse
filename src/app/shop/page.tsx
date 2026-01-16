import AddToCartButton from "@/components/cart/AddToCartButton";
import { sampleProducts } from "@/lib/sampleInventory";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "Shop | Denver Trap House",
  description: "Browse the Trap House lineup. Korona-powered inventory coming online soon.",
};

export default function ShopPage() {
  return (
    <div className="page-shell">
      <div className="glow-layer" />
      <div className="grid-layer" />
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Shop</p>
          <h3>Browse the lineup. Live Korona feed coming soon.</h3>
          <p className="muted">Add to cart and check out (mock payment) to test the flow.</p>
        </header>
        <div className="inventory-grid">
          {sampleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="chip">{product.category || "Featured"}</div>
              <Link href={`/product/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p className="muted">{product.brand || "Denver Trap House"}</p>
              <div className="product-meta">
                <span className="price">${product.price.toFixed(2)}</span>
                <span className="stock">
                  <span className="dot" style={{ background: "var(--lime)" }} />
                  In stock
                </span>
              </div>
              <AddToCartButton product={product} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
