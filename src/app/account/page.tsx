import AccountPanel from "@/components/AccountPanel";
import "../home.css";

export default function AccountPage() {
  return (
    <div className="page-shell">
      <div className="glow-layer" />
      <div className="grid-layer" />
      <div className="container">
        <header className="nav-bar">
          <div>
            <p className="eyebrow">Membership</p>
            <h1 className="brand-title">Trap House Account</h1>
            <p className="muted">Sign in to sync with Korona and track points.</p>
          </div>
        </header>
        <main className="section">
          <AccountPanel />
        </main>
      </div>
    </div>
  );
}
