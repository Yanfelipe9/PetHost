import { Prompt } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const prompt = Prompt({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <AuthProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
