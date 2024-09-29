'use client'

import Nav from '@/components/Navbarcomponents/Nav';
import {NextUIProvider} from '@nextui-org/react'
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function NextuiProviderWrapper({children}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
      if (pathname === '/Signin') {
        router.push('/');
      }
    } else {
      setIsAuthenticated(false);
      if (pathname !== '/Signin') {
        router.push('/Signin');
      }
    }
  }, [pathname, router]);

  //  useEffect(() => {
  //   const fetchData = async () => {
  //     if (isAuthenticated) {
  //       try {
  //         const result = await Getbranch();
  //         if (result.status) {
  //           dispatch(setBranches(result.data));
  //         } else {
  //           dispatch(setBranchError(result.message || "An error occurred"));
  //         }
  //       } catch (error) {
  //         dispatch(setBranchError(error.message || "An error occurred"));
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [isAuthenticated, dispatch]);

  if (isAuthenticated && pathname === '/Signin') {
    // Render nothing or a loading state while redirecting
    return <div className="flex justify-center flex-col gap-4 text-[#9c1dac] items-center h-screen "><span className="loader"></span>Loading...</div>;
  }

  if (!isAuthenticated && pathname !== '/Signin') {
    // Render nothing or a loading state while redirecting
    return <div className="flex justify-center flex-col gap-4 text-[#9c1dac] items-center h-screen "><span className="loader"></span>Loading...</div>;
  }





  return (
    <NextUIProvider>
     <div className="flex flex-col w-full ">
        {pathname !== '/Signin' && (<Nav/>)}
           
          {children}
        </div>
    </NextUIProvider>
  )
}