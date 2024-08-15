import axios from "axios";
import React, { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=5",
        );
        console.log(response.data.results);

        const authorData: Author[] = response.data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorData);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-5 mt-5 w-[23rem] rounded border bg-white p-5">
      <h2 className="mb-5 text-xl font-bold">Top Seller</h2>

      <ul>
        {authors.map((author, index) => (
          <li key={index} className="mb-4 flex items-center justify-between">
            <section className="flex items-center justify-center">
              <img
                src={author.image}
                alt="img"
                className="size-[25%] justify-center rounded-full"
              />
              <p className="ml-4">{author.name}</p>
            </section>
            <button className="rounded-md border px-3 py-1 transition hover:bg-gray-200">
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
