import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "../components/Navbarcomponents/Nav";

const inter = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "K2-DESIGN",
  description: "K2-DESIGN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Nav/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
