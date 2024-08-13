import React, { useEffect, useState } from "react";
import { useFilter } from "./Context";

interface Product {
  categories: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const {
    searchQuery,
    setSearchQuery,

    selectedCategory,
    setSelectedCategory,

    minPrice,
    setMinPrice,

    maxPrice,
    setMaxPrice,

    keyword,
    setKeyword,
  } = useFilter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category)),
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("error while fetching" + error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    console.log(searchQuery, selectedCategory, keyword, minPrice, maxPrice);
    setSearchQuery("");
    setSelectedCategory("");
    setKeyword("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <div className="h-screen w-64 border p-5">
      <h1 className="mb-10 mt-4 text-2xl font-bold">React Store</h1>
      <section>
        <input
          type="text"
          className="rounded-md border px-2.5 py-1 sm:mb-8"
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex items-center justify-center">
          <input
            type="number"
            className="mb-3 mr-2 w-full rounded border-2 px-5 py-3"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPrice}
          />
          <input
            type="number"
            className="mb-3 mr-2 w-full rounded border-2 px-5 py-3"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPrice}
          />
        </div>
        <div className="mb-5">
          <h2 className="mb-3 text-xl font-semibold">Categories </h2>
        </div>

        <div>
          {categories.map((category, index) => {
            return (
              <label key={index} className="mb-2 block">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="mr-2 size-4"
                  onChange={() => handleRadioChangeCategory(category)}
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            );
          })}
        </div>

        <div className="mb-5 mt-3">
          <h2 className="mb-3 text-xl font-semibold">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="mb-2 block w-full rounded border px-4 py-2 text-left hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilters}
          className="mb-[4em] mt-5 w-full rounded-lg bg-black py-2 text-white transition hover:bg-black/85"
        >
          Reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
