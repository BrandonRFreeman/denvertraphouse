"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import "../home.css";

type CheckoutResponse = {
  orderId: string;
  status: string;
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { data: session } = useSession();
  const [ageOk, setAgeOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CheckoutResponse | null>(null);
  const [shippingMethod, setShippingMethod] = useState<"pickup" | "shipping">("pickup");
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAgeOk(window.localStorage.getItem("dth-age-verified") === "true");
  }, []);

  const handleCheckout = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (res.ok) {
        const data = (await res.json()) as CheckoutResponse;
        setResult(data);
        clear();
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!ageOk) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Checkout</p>
            <h3>Please confirm you are 21+ to continue.</h3>
          </div>
          <p className="muted">Reload or visit the homepage to confirm age.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Checkout</p>
            <h3>Sign in to continue.</h3>
          </div>
          <button className="btn primary" onClick={() => signIn()}>
            Sign in / Sign up
          </button>
          <p className="tiny muted" style={{ marginTop: 8 }}>
            Accounts will link to Korona customers once credentials are set.
          </p>
        </div>
      </div>
    );
  }

  if (!items.length && !result) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Checkout</p>
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
          <p className="eyebrow">Checkout</p>
          <h3>Mock checkout (gateway pending).</h3>
          <p className="muted">
            This will validate pricing/stock and return a mock order. Payment gateway (NMI/Authorize.Net) will be wired
            in once credentials are provided.
          </p>
        </div>
        <div className="account-card">
          <div className="account-head">
            <div>
              <p className="muted">Items</p>
              <p className="strong">{items.length}</p>
            </div>
            <div>
              <p className="muted">Total</p>
              <p className="strong">${total.toFixed(2)}</p>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <p className="muted">Fulfillment</p>
            <div className="pill-row" style={{ marginTop: 6 }}>
              <button
                className={`pill ${shippingMethod === "pickup" ? "neon" : "soft"}`}
                type="button"
                onClick={() => setShippingMethod("pickup")}
              >
                Pickup
              </button>
              <button
                className={`pill ${shippingMethod === "shipping" ? "neon" : "soft"}`}
                type="button"
                onClick={() => setShippingMethod("shipping")}
              >
                Shipping (21+ adult signature)
              </button>
            </div>
          </div>

          {shippingMethod === "shipping" && (
            <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
              <p className="muted">Shipping address</p>
              <input
                className="input"
                placeholder="Full name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
              />
              <input
                className="input"
                placeholder="Address line"
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px", gap: 8 }}>
                <input
                  className="input"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
                <input
                  className="input"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
                <input
                  className="input"
                  placeholder="ZIP"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                />
              </div>
              <p className="tiny muted">We will enforce state restrictions and require adult signature on delivery.</p>
            </div>
          )}

          <div className="cta-row" style={{ marginTop: 12 }}>
            <button className="btn primary" onClick={handleCheckout} disabled={submitting}>
              {submitting ? "Processing..." : "Place mock order"}
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 12 }}>
              <p className="muted">Order created (mock)</p>
              <p className="strong">
                ID: {result.orderId} — Status: {result.status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
