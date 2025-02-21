import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../../prisma/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";



export const options = {
    session: {
        strategy: "jwt",
        maxAge: 3000
    },
    adapter: PrismaAdapter(db),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "E-mail",
                    type: "email",
                    placeholder: "digite seu email",
                },
                password: {
                    label: "your password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
 
            

            async authorize(credentials) {
              try {
                const res = await axios.post("http://localhost:8080/auth/register", {
                  email: credentials?.email,
                  password: credentials?.password,
                });
      
                const user = res.data;
      
                if (user && user.token) {
                  return { id: user.id, email: user.email, token: user.token };
                }
              } catch (error) {
                throw new Error("Credenciais inválidas");
              }
      
              return null;
            },
        }),
    ],

    callbacks: {

      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.token = user.token;
        }
        return token;
      },

      async session({ session, token }) {
        session.user.id = token.id;
        session.token = token.token;
        return session;
      },
    },
    pages : {
        signIn : "/signin"
    }
};


export const {
    auth,
    signIn,
    signOut,
  } = NextAuth(options);
