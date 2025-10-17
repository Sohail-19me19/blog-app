import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@src/db";
import { createUser, getUserByEmail } from "@src/db/controllers";
import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    Credentials({
      name: "Sign In",
      id: "sign-in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "any_@any.com",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUserByEmail({ email });
        if (!user) throw new CredentialsSignin("Invalid Email and Password!");
        const isPasswordValid = await bcrypt.compare(password, user.password!);
        if (!isPasswordValid)
          throw new CredentialsSignin("Invalid Email and Password!");

        return user;
      },
    }),
    Credentials({
      name: "Sign Up",
      id: "sign-up",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "any_@any.com",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
          required: true,
        },
      },
      async authorize(credentials) {
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ email, name, password: hashPassword });
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, trigger, session }) => {
      if (account && ["sign-in", "sign-up"].includes(account.provider)) {
        token = {
          ...token,
          userId: user.id as string,
          role: "user",
          image: user.image as string,
          name: user.name as string,
          email: user.email as string,
        };
      }

      if (trigger === "update" && session?.user) {
        token.image = session.user.image ?? token.image;
        token.name = session.user.name ?? token.name;
        token.email = session.user.email ?? token.email;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.userId,
        role: token.role,
        image: token.image,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },
  session: { strategy: "jwt" },
});
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      image: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: string;
    image: string;
    name: string;
    email: string;
  }
}
