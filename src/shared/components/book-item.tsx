/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { useRouter } from "next/router";

import heartOutline from "@/shared/assets/icons/heart-outline.svg";
import heartFill from "@/shared/assets/icons/heart-fill.svg";

import MainButton from "./main-button";

import { Book } from "@/pages";
import { useEffect, useState } from "react";

export function BookItem({ imgurl, title, authorname, id }: Book) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isFavorited, setIsFavorited] = useState(false);

  function saveFavoriteToLocalStorage(book: any) {
    if (typeof window !== "undefined") {
      const favoritesKey = "favorites";

      // Recupera localStorage
      const storedFavorites = localStorage.getItem(favoritesKey);
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      // Atualiza favoritos no estado e no localStorage
      const updatedFavorites = [...parsedFavorites, book];
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));

      console.log("Favorito salvo com sucesso:", book);
      verifyBookOnFavorites();
    }
  }

  function removeFavoriteFromLocalStorage(bookId: string) {
    if (typeof window !== "undefined") {
      const favoritesKey = "favorites";

      // Recupera os favoritos do localStorage
      const storedFavorites = localStorage.getItem(favoritesKey);
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      // Remove o livro correspondente ao `bookId`
      const updatedFavorites = parsedFavorites.filter(
        (favorite: any) => favorite.id !== bookId
      );

      // Atualiza os favoritos no estado e no localStorage
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));

      console.log("Favorito removido com sucesso:", bookId);

      // Atualiza o estado de `isFavorited`
      verifyBookOnFavorites();
    }
  }

  function verifyBookOnFavorites() {
    if (typeof window !== "undefined") {
      // Verifica se o item está nos favoritos
      const storedFavorites = localStorage.getItem("favorites");
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      const isOnFavorites = parsedFavorites.some(
        (favorite: any) => favorite.id === id
      );
      setIsFavorited(isOnFavorites);
    }
  }

  function loadUserFromSessionStorage() {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    verifyBookOnFavorites();
  }, [id]);

  useEffect(() => {
    loadUserFromSessionStorage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between gap-4 max-w-[8.75rem]">
      <div className="rounded-md overflow-hidden w-[8.75rem] object-contain h-[160px]">
        <Image
          src={imgurl}
          alt={`Capa do Livro: ${title}`}
          width={500}
          height={500}
          style={{ width: "auto", height: "auto" }}
          loading="eager"
        />
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="min-h-[72px]">
          <h4 className="text-font-primary-color font-semibold">
            {title.length > 20 ? title.slice(0, 20) + "..." : title}
          </h4>
          <span className="text-xs">
            {authorname.length > 12
              ? authorname.slice(0, 12) + "..."
              : authorname}
          </span>
        </div>
      </div>

      {isFavorited ? (
        <div
          onClick={() => removeFavoriteFromLocalStorage(id)}
          className="flex items-start justify-start w-full cursor-pointer"
        >
          <Image src={heartFill} alt="Ícone de desfavoritar" />
        </div>
      ) : (
        <div
          onClick={() =>
            saveFavoriteToLocalStorage({ imgurl, title, authorname, id })
          }
          className="flex items-start justify-start w-full cursor-pointer"
        >
          <Image src={heartOutline} alt="Ícone de favoritar" />
        </div>
      )}

      {!isLoggedIn ? (
        <MainButton onClick={() => router.push(`/login`)}>
          Fazer login
        </MainButton>
      ) : (
        <MainButton onClick={() => router.push(`/book/${id}`)}>Ver</MainButton>
      )}
    </div>
  );
}
