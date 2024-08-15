import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCards = ({ id, title, image, price }: CardProps) => {
  return (
    <div className="rounded border p-4">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="mb-2 h-32 w-full object-cover"
        />
        <h2 className="font-bold">{title}</h2>
        <p className="text-right">{price}</p>
      </Link>
    </div>
  );
};

export default BookCards;
