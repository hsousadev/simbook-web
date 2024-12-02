/* eslint-disable @typescript-eslint/no-explicit-any */
import BooksSection from "@/shared/components/books-section";
import TopBar from "@/shared/components/top-bar";
import { useEffect, useState } from "react";
import { Book } from "..";

export function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>();

  function getFavorites() {
    if (typeof window !== "undefined") {
      const favoritesKey = "favorites";

      // Recupera localStorage
      const storedFavorites = localStorage.getItem(favoritesKey);

      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      setFavorites(parsedFavorites);
    }
  }

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    console.log("favorites", favorites);
  }, [favorites]);

  return (
    <div className="flex items-center justify-center flex-col">
      <TopBar />

      <div className="flex flex-col gap-8 mb-12 md:flex md:flex-row items-center justify-between w-full px-6 max-w-screen-xl mt-12 pb-8 border-b-line-color border-b-[1px]">
        <h1 className="text-3xl">
          Esses são os todos <br />
          os livros <span className="text-main-color">favoritados</span>.
        </h1>
      </div>

      <BooksSection sectionTitle="Favoritos" books={favorites} />
    </div>
  );
}

export default Favorites;
