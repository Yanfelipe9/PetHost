import { Prompt } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css"; // Importação correta para Ant Design 5+

import AuthProvider from "@/components/AuthProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthContextProvider } from "./context/AuthContext";
import Head from "next/head";

const prompt = Prompt({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <AuthContextProvider>
          <AuthProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </AuthProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
