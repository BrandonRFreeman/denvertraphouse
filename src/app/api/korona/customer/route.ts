import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

type KoronaCustomer = {
  id: string;
  number?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bonusPoints?: number;
};

const hasKoronaCreds =
  !!process.env.KORONA_ORG_ID &&
  !!(
    process.env.KORONA_API_TOKEN ||
    (process.env.KORONA_API_USERNAME && process.env.KORONA_API_PASSWORD)
  );

const mockCustomer = (email?: string): KoronaCustomer => {
  const id =
    email && email.trim()
      ? crypto.createHash("md5").update(email.toLowerCase()).digest("hex")
      : "mock-customer";
  return {
    id,
    number: `TRAP-${id.slice(0, 6).toUpperCase()}`,
    firstName: "Trap",
    lastName: "Member",
    email,
    bonusPoints: 420,
  };
};

const buildAuthHeader = (): Record<string, string> => {
  if (process.env.KORONA_API_TOKEN) {
    return { Authorization: `Bearer ${process.env.KORONA_API_TOKEN}` };
  }
  if (process.env.KORONA_API_USERNAME && process.env.KORONA_API_PASSWORD) {
    const basic = Buffer.from(
      `${process.env.KORONA_API_USERNAME}:${process.env.KORONA_API_PASSWORD}`,
    ).toString("base64");
    return { Authorization: `Basic ${basic}` };
  }
  return {};
};

const fetchKoronaCustomer = async (email?: string): Promise<KoronaCustomer | null> => {
  if (!hasKoronaCreds) return null;
  if (!process.env.KORONA_ORG_ID) return null;

  try {
    const headers = {
      Accept: "application/json",
      ...buildAuthHeader(),
    };

    // Try to find by email
    if (email) {
      const searchUrl = `${
        process.env.KORONA_API_BASE || "https://api.korona.cloud/v3"
      }/organizations/${process.env.KORONA_ORG_ID}/customers?email=${encodeURIComponent(email)}`;
      const res = await fetch(searchUrl, { headers, cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const results = Array.isArray(data?.results) ? data.results : [];
        if (results.length > 0) {
          const c = results[0];
          return {
            id: c.id || c.number || c.customerId,
            number: c.number,
            firstName: c.firstName,
            lastName: c.lastName,
            email: c.email,
            phone: c.phone,
            bonusPoints: c?.bonusPoints ?? c?.bonus?.points,
          };
        }
      }
    }

    // If not found, create a customer
    const createUrl = `${
      process.env.KORONA_API_BASE || "https://api.korona.cloud/v3"
    }/organizations/${process.env.KORONA_ORG_ID}/customers`;
    const newCustomerPayload = {
      firstName: "Trap",
      lastName: "Member",
      email,
      number: email ? `WEB-${email.slice(0, 6).toUpperCase()}` : undefined,
      active: true,
    };
    const createRes = await fetch(createUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(newCustomerPayload),
    });
    if (createRes.ok) {
      const created = await createRes.json();
      return {
        id: created.id || created.number,
        number: created.number,
        firstName: created.firstName,
        lastName: created.lastName,
        email: created.email,
        phone: created.phone,
        bonusPoints: created?.bonusPoints ?? created?.bonus?.points,
      };
    }
  } catch (error) {
    console.error("Korona customer sync failed:", error);
  }

  return null;
};

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || undefined;

  const koronaCustomer = await fetchKoronaCustomer(email);
  if (koronaCustomer) {
    return NextResponse.json({ source: "korona", customer: koronaCustomer });
  }

  return NextResponse.json({ source: "mock", customer: mockCustomer(email) });
}
