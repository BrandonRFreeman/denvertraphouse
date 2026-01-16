"use client";

import { useEffect, useState } from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

type Customer = {
  id: string;
  number?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  bonusPoints?: number;
};

export default function AccountPanel() {
  return (
    <SessionProvider>
      <InnerAccountPanel />
    </SessionProvider>
  );
}

function InnerAccountPanel() {
  const { data: session, status } = useSession();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCustomer = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/korona/customer?email=${encodeURIComponent(session.user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomer(data.customer);
        setSource(data.source);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  if (status === "loading") {
    return (
      <div className="account-card">
        <p className="eyebrow">Account</p>
        <p className="muted">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="account-card">
        <p className="eyebrow">Membership</p>
        <h3>Sign in to sync your Korona membership.</h3>
        <p className="muted">We’ll tie your account to a Korona customer and track points.</p>
        <div className="cta-row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={() => signIn()}>
            Sign in / Sign up
          </button>
        </div>
        <p className="tiny muted">Until Korona is live, membership data is mocked.</p>
      </div>
    );
  }

  return (
    <div className="account-card">
      <div className="account-head">
        <div>
          <p className="eyebrow">Signed in</p>
          <h3>{session.user?.name || "Member"}</h3>
          <p className="muted">{session.user?.email}</p>
        </div>
        <button className="btn ghost" onClick={() => signOut()}>
          Sign out
        </button>
      </div>

      <div className="account-meta">
        <div>
          <p className="muted">Membership ID</p>
          <p className="strong">{customer?.number || "Pending"}</p>
        </div>
        <div>
          <p className="muted">Points</p>
          <p className="strong">{customer?.bonusPoints ?? 0}</p>
        </div>
        <div>
          <p className="muted">Source</p>
          <p className="strong">{source || "mock"}</p>
        </div>
      </div>

      <div className="cta-row" style={{ marginTop: 10 }}>
        <button className="btn" onClick={loadCustomer} disabled={loading}>
          {loading ? "Syncing..." : "Resync membership"}
        </button>
      </div>
      <p className="tiny muted" style={{ marginTop: 8 }}>
        When Korona credentials go live, this will create/update a Korona customer and pull loyalty points.
      </p>
    </div>
  );
}
