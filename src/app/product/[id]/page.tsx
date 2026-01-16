import AddToCartButton from "@/components/cart/AddToCartButton";
import { sampleProducts } from "@/lib/sampleInventory";
import "../../home.css";

type Params = {
  params: { id: string };
};

export default function ProductPage({ params }: Params) {
  const product = sampleProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="page-shell">
        <div className="container">
          <h2>Product not found</h2>
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
          <p className="eyebrow">{product.category || "Product"}</p>
          <h3>{product.name}</h3>
          <p className="muted">{product.brand || "Denver Trap House"}</p>
        </div>
        <article className="product-card">
          <div className="product-meta">
            <span className="price">${product.price.toFixed(2)}</span>
            <span className="stock">
              <span className="dot" style={{ background: "var(--lime)" }} />
              In stock
            </span>
          </div>
          <p className="muted">
            Detailed specs will come from Korona once live. For now this is placeholder copy for {product.name}.
          </p>
          <div className="cta-row" style={{ marginTop: 12 }}>
            <AddToCartButton product={product} />
          </div>
        </article>
      </div>
    </div>
  );
}
