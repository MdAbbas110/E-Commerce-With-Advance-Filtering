import { useState } from "react";
import { useFilter } from "./Context";
import { Tally3 } from "lucide-react";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const itemPerPage = 12;

  return (
    <section className="xs:w-[20rem] p-5 sm:w-[40rem] lg:w-[55rem] xl:w-[55rem]">
      <div className="mb-5">
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="relative my-5">
            <button className="flex items-center rounded-full border px-4 py-2">
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
          {/* book cards */}
        </div>
      </div>
    </section>
  );
};

export default MainContent;
