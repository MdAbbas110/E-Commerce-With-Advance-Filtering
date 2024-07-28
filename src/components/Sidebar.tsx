import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummy.json.com/prducts");
        const data: FetchResponse = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>sidebar</h1>
    </div>
  );
};

export default Sidebar;
