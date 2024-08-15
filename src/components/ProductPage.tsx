import axios from "axios";
import { Circle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  if (!product) {
    return (
      <Circle className="absolute left-[50%] top-[50%] size-10 rotate-3 text-sky-800 transition-all" />
    );
  }

  return (
    <div className="relative w-[60%] p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 rounded-full bg-black px-4 py-2 text-white"
      >
        Back
      </button>
      <img
        src={product.images[0]}
        alt="image"
        className="mb-5 h-auto w-[50%]"
      />
      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <p className="mb-4 w-[70%] text-gray-400">{product.description}</p>

      <div className="flex">
        <p>Price: {product.price}</p>
        <p className="ml-10 flex gap-x-2">
          <Star className="text-yellow-400" /> {product.rating}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
