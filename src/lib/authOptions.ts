import type { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "node:crypto";

const hasAuth0 =
  !!process.env.AUTH0_ISSUER_BASE_URL &&
  !!process.env.AUTH0_CLIENT_ID &&
  !!process.env.AUTH0_CLIENT_SECRET;

const credentialsProvider = CredentialsProvider({
  name: "Demo Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    name: { label: "Name", type: "text" },
  },
  authorize: async (credentials) => {
    const email = credentials?.email?.toString().trim();
    const name = credentials?.name?.toString().trim() || "Trap House Member";
    if (!email) return null;

    // Demo-only: generate a stable ID from email to simulate membership.
    const id = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
    return { id, email, name };
  },
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: hasAuth0
    ? [
        Auth0Provider({
          issuer: process.env.AUTH0_ISSUER_BASE_URL,
          clientId: process.env.AUTH0_CLIENT_ID!,
          clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        }),
      ]
    : [credentialsProvider],
  pages: {
    signIn: "/account",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.uid = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) {
        session.user = Object.assign({}, session.user, {
          id: token.uid as string,
          name: (token.name as string) || session.user?.name || "Member",
          email: (token.email as string) || undefined,
        });
      }
      return session;
    },
  },
};
