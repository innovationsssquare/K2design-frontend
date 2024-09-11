import { Manrope } from "next/font/google";
import "./globals.css";
import { NextuiProviderWrapper } from "./providers";
import { Providers } from "@/lib/providers";
import Nav from "../components/Navbarcomponents/Nav";



const inter = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "K2-DESIGN",
  description: "K2-DESIGN",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
      <body className={inter.className}>
      
        <NextuiProviderWrapper>
        {children}
        </NextuiProviderWrapper>
       
      </body>
    </html>

    </Providers>
  );
}
