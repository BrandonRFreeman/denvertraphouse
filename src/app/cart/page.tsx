"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import "../home.css";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clear } = useCart();

  if (!items.length) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Cart</p>
            <h3>Your cart is empty.</h3>
          </div>
          <Link className="btn primary" href="/shop">
            Go to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="glow-layer" />
      <div className="grid-layer" />
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Cart</p>
          <h3>Review your items.</h3>
        </div>
        <div className="inventory-grid">
          {items.map((item) => (
            <article className="product-card" key={item.id}>
              <div className="chip">{item.category || "Item"}</div>
              <h3>{item.name}</h3>
              <div className="product-meta">
                <span className="price">${item.price.toFixed(2)}</span>
                <span className="muted">Qty</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                  style={{ width: 64 }}
                />
              </div>
              <div className="cta-row">
                <button className="btn ghost" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="account-card" style={{ marginTop: 16 }}>
          <div className="account-head">
            <h3>Total: ${total.toFixed(2)}</h3>
            <div className="cta-row">
              <Link className="btn primary" href="/checkout">
                Checkout
              </Link>
              <button className="btn ghost" onClick={clear}>
                Clear
              </button>
            </div>
          </div>
          <p className="tiny muted" style={{ marginTop: 6 }}>
            Pricing/stock will validate at checkout. Payment is mocked until gateway is configured.
          </p>
        </div>
      </div>
    </div>
  );
}
