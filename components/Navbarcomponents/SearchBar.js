import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoriesWithProducts } from "./searchdata";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const lowerValue = value.toLowerCase();
    const results = [];

    categoriesWithProducts.forEach(({ category, slug: categorySlug, products }) => {
      // Match category
      if (category.toLowerCase().includes(lowerValue)) {
        results.push({ type: "category", name: category, slug: categorySlug });
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
    });

    setSuggestions(results);
  };

  const handleSelect = (item) => {
    setQuery("");
    setSuggestions([]);

    const path =
      item.type === "category"
        ? `/categories/${item.slug}`
        : `/categories/${item.categorySlug}/subcategories/${item.slug}`;

    router.push(path);
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        className="text-heading outline-none w-full h-[52px] pl-5 pr-14 bg-[#f8f9fb] text-sm text-brand-dark rounded-md border border-[#e5e7eb] placeholder:text-brand-dark/50 focus:border-secondary focus:ring-0"
        placeholder="What are you looking..."
        value={query}
        onChange={handleChange}
      />
      <i className="pi pi-search absolute inset-y-0 right-4 flex items-center text-[#a4a4a4] pointer-events-none text-opacity-40" />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-2 w-full max-h-60 overflow-auto shadow-lg">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
              onClick={() => handleSelect(item)}
            >
              <span className="text-sm">{item.name}</span>
              <span className="text-xs text-gray-500">{item.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
