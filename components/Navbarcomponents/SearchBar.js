import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { categoriesWithProducts } from "./searchdata";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  CreditCard,
  Mail,
  Receipt,
  BookOpen,
  Book,
  ImageIcon,
  Stamp,
  Send,
  Tag,
  Calendar,
  Folder,
  ShoppingBag,
  Heart,
  Printer,
  Flag,
  Film,
  Glasses,
  Square,
  Type,
  Lightbulb,
  Award,
  ChevronRight,
  Search,
  Layers,
  Scissors,
  Monitor,
  Frame,
  Sticker,
  PanelTop,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { Spinner } from "@nextui-org/react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const lowerValue = value.toLowerCase();
    const results = [];

    categoriesWithProducts.forEach(
      ({ category, slug: categorySlug, products }) => {
        // Match category
        if (category.toLowerCase().includes(lowerValue)) {
          results.push({
            type: "category",
            name: category,
            slug: categorySlug,
          });
        }

        // Match products
        products.forEach(({ name, slug }) => {
          if (name.toLowerCase().includes(lowerValue)) {
            results.push({
              type: "product",
              name,
              slug,
              category,
              categorySlug,
            });
          }
        });
      }
    );

    setSuggestions(results);
  };

  const handleSelect = (item) => {
    setQuery("");
    setSuggestions([]);
    setLoading(true);

    const path =
      item.type === "category"
        ? `/categories/${item.slug}`
        : `/categories/${item.categorySlug}/subcategories/${item.slug}`;

    if (path === pathname) {
      router.refresh(); // Force re-render if same route
      setTimeout(() => setLoading(false), 1000); // Graceful delay
    } else {
      router.push(path);
    }
  };

  const getIcon = (item) => {
    // Category icons
    if (item.type === "category") {
      if (item.name.includes("Paper Printing"))
        return <Printer className="h-4 w-4" />;
      if (item.name.includes("Flex")) return <Flag className="h-4 w-4" />;
      if (item.name.includes("Media Printing"))
        return <Film className="h-4 w-4" />;
      if (item.name.includes("Glass")) return <Glasses className="h-4 w-4" />;
      if (item.name.includes("Rigid Sign"))
        return <Square className="h-4 w-4" />;
      if (item.name.includes("Vinyl Letters"))
        return <Type className="h-4 w-4" />;
      if (item.name.includes("ACP & Acrylic"))
        return <Layers className="h-4 w-4" />;
      if (item.name.includes("Light Board") || item.name.includes("LED"))
        return <Lightbulb className="h-4 w-4" />;
      if (item.name.includes("Modular") || item.name.includes("Premium"))
        return <Award className="h-4 w-4" />;
      return <FileText className="h-4 w-4" />;
    }
    // Product icons
    else {
      if (item.name.includes("Visiting Card"))
        return <CreditCard className="h-4 w-4" />;
      if (item.name.includes("Letterhead"))
        return <FileText className="h-4 w-4" />;
      if (item.name.includes("Envelope")) return <Mail className="h-4 w-4" />;
      if (item.name.includes("Bill")) return <Receipt className="h-4 w-4" />;
      if (item.name.includes("Brochure"))
        return <BookOpen className="h-4 w-4" />;
      if (item.name.includes("Booklet") || item.name.includes("Book"))
        return <Book className="h-4 w-4" />;
      if (item.name.includes("Digital Print") || item.name.includes("Poster"))
        return <ImageIcon className="h-4 w-4" />;
      if (item.name.includes("Stamp")) return <Stamp className="h-4 w-4" />;
      if (
        item.name.includes("Pamphlet") ||
        item.name.includes("Flyer") ||
        item.name.includes("Leaflet")
      )
        return <Send className="h-4 w-4" />;
      if (item.name.includes("Invitation")) return <Mail className="h-4 w-4" />;
      if (item.name.includes("Sticker") || item.name.includes("Label"))
        return <Sticker className="h-4 w-4" />;
      if (item.name.includes("Tag")) return <Tag className="h-4 w-4" />;
      if (item.name.includes("Calendar"))
        return <Calendar className="h-4 w-4" />;
      if (item.name.includes("File") || item.name.includes("Folder"))
        return <Folder className="h-4 w-4" />;
      if (item.name.includes("Bag")) return <ShoppingBag className="h-4 w-4" />;
      if (item.name.includes("Wedding")) return <Heart className="h-4 w-4" />;
      if (item.name.includes("Flex") || item.name.includes("Banner"))
        return <Flag className="h-4 w-4" />;
      if (item.name.includes("Frame")) return <Frame className="h-4 w-4" />;
      if (item.name.includes("Vinyl")) return <Scissors className="h-4 w-4" />;
      if (item.name.includes("Print")) return <Printer className="h-4 w-4" />;
      if (item.name.includes("Glass")) return <Glasses className="h-4 w-4" />;
      if (item.name.includes("Plate")) return <Square className="h-4 w-4" />;
      if (item.name.includes("LED") || item.name.includes("Light"))
        return <Lightbulb className="h-4 w-4" />;
      if (item.name.includes("Acrylic")) return <Layers className="h-4 w-4" />;
      if (item.name.includes("Sign")) return <PanelTop className="h-4 w-4" />;
      if (item.name.includes("Table")) return <Monitor className="h-4 w-4" />;
      return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        disabled={loading}
        className="text-heading outline-none w-full h-[52px] pl-5 pr-14 bg-[#f8f9fb] text-sm text-brand-dark rounded-md border border-[#e5e7eb] placeholder:text-brand-dark/50 focus:border-secondary focus:ring-0"
        placeholder="Search products and categories..."
        value={query}
        onChange={handleChange}
      />
      {loading ? (
        <Spinner size="sm" className="absolute right-4 top-1/2 -translate-y-1/2  text-gray-400" />
      ) : (
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a4a4a4]" />
      )}
      <i className="pi pi-search absolute inset-y-0 right-4 flex items-center text-[#a4a4a4] pointer-events-none text-opacity-40" />

      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-md mt-2 w-full shadow-lg">
          <ScrollArea className="h-60 rounded-md border-none ">
            <ul className="py-1">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
                  onClick={() => handleSelect(item)}
                >
                  <div className="flex items-center gap-3">
                    {getIcon(item)}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.categorySlug && (
                        <span className="text-xs text-gray-500">
                          in {item.categorySlug}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.type === "category"
                          ? "bg-gray-100 text-secondary-400"
                          : "bg-Apptheme/10 text-Apptheme"
                      }`}
                    >
                      {item.type}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
