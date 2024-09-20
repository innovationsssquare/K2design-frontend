import { Manrope } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextuiProviderWrapper } from "./providers";
import { Providers } from "@/lib/providers";
import Nav from "../components/Navbarcomponents/Nav";
import Categorynav from "@/components/Navbarcomponents/Categorynav";
import Footer from "@/components/Footer/Footer";



// const inter = Manrope({ subsets: ["latin"] });

const inter = Poppins({ subsets: ["latin"] ,weight: ['100','300','400','500','700','900']});

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
          <Categorynav/>
        {children}
        <Footer/>
        </NextuiProviderWrapper>
       
      </body>
    </html>

    </Providers>
  );
}
