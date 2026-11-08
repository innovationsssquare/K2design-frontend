'use client'

import Nav from '@/components/Navbarcomponents/Nav';
import Categorynav from '@/components/Navbarcomponents/Categorynav';
import Footer from '@/components/Footer/Footer';
import { NextUIProvider } from '@nextui-org/react'
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";

export function NextuiProviderWrapper({children}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  const isStudio = pathname?.startsWith('/studio');
  const showChrome = !isStudio;

  return (
    <NextUIProvider>
      <PrimeReactProvider>
        <div className="flex flex-col w-full min-h-screen">
          {showChrome && <Nav/>}
          {showChrome && <Categorynav />}
          {children}
          {showChrome && <Footer />}
        </div>
      </PrimeReactProvider>
    </NextUIProvider>
  );
}
