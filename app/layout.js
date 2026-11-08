import "./globals.css";
import { NextuiProviderWrapper } from "./providers";
import { Providers } from "@/lib/providers";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "K2-DESIGN",
  description: "K2-DESIGN Web-to-Print Store",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className="font-sans antialiased text-gray-900 bg-[#f1f2f4]">
          <NextuiProviderWrapper>
            {children}
          </NextuiProviderWrapper>
        </body>
      </html>
    </Providers>
  );
}
