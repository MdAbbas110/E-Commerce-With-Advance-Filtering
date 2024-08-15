import { useEffect, useState } from "react";
import { useFilter } from "./Context";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCards from "./BookCards";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const itemPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage - 1) * itemPerPage}`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.error("error fetching the data", error));
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);

      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);

      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);

      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // pagination logic
  const getPagination = () => {
    const buttons: number[] = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  return (
    <section className="xs:w-[20rem] p-5 sm:w-[40rem] lg:w-[55rem] xl:w-[55rem]">
      <div className="mb-5">
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="relative my-5">
            <button
              onClick={() => setDropDownOpen(!dropdownOpen)}
              className="flex items-center rounded-full border px-4 py-2"
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-full rounded border border-gray-300 bg-white sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Low to High
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  High to Low
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <BookCards
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-col items-center justify-between sm:flex-row">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="mx-2 rounded-full border px-4 py-2"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPagination().map((page) => (
              <button
                className={`mx-1 rounded-full border px-4 py-2 ${page === currentPage && "bg-black text-white"}`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="mx-2 rounded-full border px-4 py-2"
          >
            Next
          </button>
        </div>

        {/* previous button 
          1,2,3,4,5,6,7,8
          next button */}
      </div>
    </section>
  );
};

export default MainContent;
