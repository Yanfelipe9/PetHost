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
                    const { email, password } = credentials;

                    const foundUser = await db.user.findFirst({
                        where: { email: email },
                    });

                    if (foundUser) {
                        const passwordMatch = await bcrypt.compare(password, foundUser.password); // Corrección aquí

                        if (passwordMatch) {
                            console.log("dados corretos");
                            delete foundUser.password; // Para no enviar la 
                            delete foundUser.image
                            return foundUser; //esse return found user, vai ser o valor que vai ser aarmazenado na session
                        }
                    }
                } catch (error) {
                    console.log("Erro ao fazer validação de credentials ->", error);
                }

                // Si no se puede validar las credenciales, devuelve null    
                return null;
            },
        }),
    ],

    callbacks: {

        async jwt({token,user}){
            if(user){
                token.avatar = user.avatar
            }
            return token;
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.id = parseInt(token.sub);
                session.user.avatar = token.avatar
                // session.user.role = user.role; // Adiciona o role ao objeto de sessão
            }
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
