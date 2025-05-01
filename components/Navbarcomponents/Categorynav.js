// "use client";
// import React, { useEffect, useRef } from "react";

// import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchcategoriesbyslug } from "@/lib/ReduxSlice/CategorySlice";
// import Link from "next/link";
// import { Image } from "@nextui-org/react";

// const Categorynav = () => {
//   const menubarRef = useRef(null);
//   const dispatch = useDispatch();
//   const { categoryslug } = useSelector((state) => state.category);

//   useEffect(() => {
//     dispatch(fetchcategoriesbyslug()); // Fetch categories when component mounts
//   }, [dispatch]);


//   console.log("Menu",categoryslug)

//   const scrollLeft = () => {
//     if (menubarRef.current) {
//       menubarRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (menubarRef.current) {
//       menubarRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative w-full flex justify-center items-center text-gray bg-[#f1f2f4]">
//       <button
//         onClick={scrollLeft}
//         className="absolute left-0 z-20 p-2 bg-white shadow-md rounded-full hover:bg-Apptheme transition-colors"
//       >
//         <ChevronLeft className="h-6 w-6 text-gray-600 hover:text-white transition-colors" />
//       </button>

//       <Menubar
//         ref={menubarRef}
//         className="w-full relative flex justify-start items-center space-x-6 px-8 bg-white shadow-small mx-4 mt-2 z-10 overflow-x-auto scrollbar-hide"
//       >
//         <div className="flex space-x-6">
//           {categoryslug?.map((menuItem, index) => (
//             <MenubarMenu key={index} className="min-w-max">
//               <MenubarTrigger>
//                 <div className="flex flex-col items-center justify-center">
//                   <div className="bg-slate h-20 w-20 rounded-full flex items-center justify-center overflow-hidden">
//                     <Image
//                       src={menuItem.image} // Ensure that logo URLs are coming from the API or state
//                       alt={menuItem.mainMenu}
//                       className="object-contain h-16 rounded-full"
//                       layout="fill"
              
                      
//                     />
//                   </div>
//                   <p className="flex items-center text-center text-sm whitespace-nowrap mt-1 hover:text-Apptheme transition-colors">
//                     {menuItem.name}
//                     {menuItem.subcategories?.length > 0 && (
//                       <ChevronDown
//                         className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
//                         aria-hidden="true"
//                       />
//                     )}
//                   </p>
//                 </div>
//               </MenubarTrigger>
//               {menuItem.subcategories?.length > 0 && (
//                 <MenubarContent className="-mt-3 grid lg:grid-cols-2 grid-cols-2">
//                   {menuItem.subcategories.map((subItem, subIndex) => (
//                     <MenubarItem className="text-medium" key={subIndex} asChild>
//                       <Link
//                         href={`${subItem.slug}`}
//                         className="hover:bg-[#f0f5ff] hover:text-Apptheme duration-750 transition-all"
//                       >
//                         <p
//                           className="flex items-center justify-between py-2 ltr:pl-5 rtl:pr-5 xl:ltr:pl-7 xl:rtl:pr-7 ltr:pr-3 rtl:pl-3 xl:ltr:pr-3.5 xl:rtl:pl-3.5 hover:bg-fill-dropdown-hover hover:text-Apptheme"
//                           style={{ fontFamily: "unset" }}
//                         >
//                           {subItem.name}
//                         </p>
//                       </Link>
//                     </MenubarItem>
//                   ))}
//                 </MenubarContent>
//               )}
//             </MenubarMenu>
//           ))}
//         </div>
//       </Menubar>

//       <button
//         onClick={scrollRight}
//         className="absolute right-0 z-20 p-2 bg-white shadow-md rounded-full hover:bg-Apptheme transition-colors"
//       >
//         <ChevronRight className="h-6 w-6 text-gray-600 hover:text-white transition-colors" />
//       </button>
//     </div>
//   );
// };

// export default Categorynav;


"use client";
import React, { useEffect, useRef, useState } from "react"; // Import useState
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategoriesbyslug } from "@/lib/ReduxSlice/CategorySlice";
import Link from "next/link";
import { Image, Skeleton } from "@nextui-org/react"; // Import Skeleton

const Categorynav = () => {
  const menubarRef = useRef(null);
  const dispatch = useDispatch();
  const { categoryslug } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Set loading to true before fetching
      await dispatch(fetchcategoriesbyslug()); // Fetch categories
      setLoading(false); // Set loading to false after fetching
    };

    fetchCategories();
  }, [dispatch]);

  console.log("Menu", categoryslug);

  const scrollLeft = () => {
    if (menubarRef.current) {
      menubarRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menubarRef.current) {
      menubarRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center text-gray bg-[#f1f2f4]">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-20 p-2 bg-white shadow-md rounded-full hover:bg-Apptheme transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 hover:text-white transition-colors" />
      </button>

      <Menubar
        ref={menubarRef}
        className="w-full relative flex justify-start items-center space-x-6 px-8 bg-white shadow-small mx-4 mt-2 z-10 overflow-x-auto scrollbar-hide"
      >
        <div className="flex space-x-6">
          {loading ? ( // Show Skeleton while loading
            Array.from({ length: 15 }).map((_, index) => ( // Adjust the length as needed
              <Skeleton key={index} className="h-24 w-24 rounded-full" />
            ))
          ) : (
            categoryslug?.map((menuItem, index) => (
              <MenubarMenu key={index} className="min-w-max">
                <MenubarTrigger>
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-slate h-20 w-20 rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        src={menuItem.image} // Ensure that logo URLs are coming from the API or state
                        alt={menuItem.mainMenu}
                        className="object-contain h-16 rounded-full"
                        layout="fill"
                      />
                    </div>
                    <p className="flex items-center text-center text-sm whitespace-nowrap mt-1 hover:text-Apptheme transition-colors">
                      {menuItem.name}
                      {menuItem.products?.length > 0 && (
                        <ChevronDown
                          className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </p>
                  </div>
                </MenubarTrigger>
                {menuItem.products?.length > 0 && (
                  <MenubarContent className="-mt-3 grid lg:grid-cols-2 grid-cols-2 w-96">
                    {menuItem.products.map((subItem, subIndex) => (
                      <MenubarItem className="text-medium" key={subIndex} asChild>
                        <Link
                          href={`/categories/${menuItem.slug}/subcategories/${subItem.slug}`}
                          className="hover:bg-[#f0f5ff] hover:text-Apptheme duration-750 transition-all"
                        >
                          <p
                            className="flex text-xs items-center justify-between py-2 ltr:pl-5 rtl:pr-5 xl:ltr:pl-7 xl:rtl:pr-7 ltr:pr-3 rtl:pl-3 xl:ltr:pr-3.5 xl:rtl:pl-3.5 hover:bg-fill-dropdown-hover hover:text-Apptheme"
                            style={{ fontFamily: "unset" }}
                          >
                            {subItem.name}
                          </p>
                        </Link>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                )}
              </MenubarMenu>
            ))
          )}
        </div>
      </Menubar>

      <button
        onClick={scrollRight}
        className="absolute right-0 z-20 p-2 bg-white shadow-md rounded-full hover:bg-Apptheme transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-gray-600 hover:text-white transition-colors" />
      </button>
    </div>
  );
};

export default Categorynav;
