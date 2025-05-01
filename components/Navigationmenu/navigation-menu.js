"use client"
import {
  NavigationMenu as Nav,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

export function NavigationMenu({ category }) {
  return (
    <Nav>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-0 h-auto bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent">
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-gray-100 p-2 w-20 h-20 flex items-center justify-center">
                <Image
                  src={"https://res.cloudinary.com/db60uwvhk/image/upload/v1727695020/K2-design/kru5oyj1xog5eeb2wpci.jpg"}
                  alt={category.title}
                  width={50}
                  height={50}
                  className="w-16 h-16 object-contain rounded-full"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{category.title}</span>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 w-[900px] gap-2 p-4 z-50 ">
              {category.items.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{item.title}</div>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </Nav>
  )
}
