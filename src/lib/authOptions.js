import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyPassword } from "@/lib/password";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // Generic failure response (no info leak)
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log(credentials.email, credentials.password);

        await connectDB();

        const admin = await Admin.findOne({
          email: credentials.email.toLowerCase(),
        });

        console.log(admin)

        // 🔐 Always verify password (timing-safe)
        const isValid = await verifyPassword(
          credentials.password,
          admin?.passwordHash,
        );

        // Generic rejection
        if (!admin || !isValid || admin.role !== "admin") {
          return null;
        }

        // Minimal safe user object
        return {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login", // generic error page
  },

  secret: process.env.AUTH_SECRET,
};

// 🔴 REQUIRED for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
