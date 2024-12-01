/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import Footer from "@/shared/components/footer";
import TopBar from "@/shared/components/top-bar";
import SearchBar from "@/shared/components/search-bar";
import Categories from "@/shared/components/categories";
import IconButton from "@/shared/components/icon-button";
import BooksSection from "@/shared/components/books-section";

import xOutline from "@/shared/assets/icons/x-outline.svg";
import xFill from "@/shared/assets/icons/x-fill.svg";

export interface Book {
  id: string;
  description: string;
  authorname: string;
  title: string;
  imgurl: string;
  genre: string;
}

// SSR
export const getServerSideProps = async () => {
  try {
    const response = await axios.get(
      "https://simbook-node-server.onrender.com/books"
    );

    const books = response.data;

    return {
      props: {
        books: books,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);

    return {
      props: {
        books: [],
      },
    };
  }
};

export function Home({ books }: { books: Book[] }) {
  const [booksSearched, setBooksSearched] = useState([]);

  const [searchText, setSearchText] = useState("");

  const recentBooks = books.slice(0, 7);
  const exploreBooks = books.slice(7);

  async function handleSearch(searchText: string) {
    setSearchText(searchText);

    try {
      const response = await axios.get(
        `https://simbook-node-server.onrender.com/books?search=${searchText}`
      );

      if (response.data.length === 0) {
        toast.error("Não foi possível encontrar resultados.");
        return;
      }

      setBooksSearched(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <ToastContainer />
      <TopBar />

      <div className="flex flex-col gap-8 md:flex md:flex-row items-center justify-between w-full px-6 max-w-screen-xl mt-12 pb-8 border-b-line-color border-b-[1px]">
        <h1 className="text-3xl">
          Olá, <span className="text-main-color">Henrique</span>
          <br /> Bem-vindo de volta!
        </h1>

        <div className="flex justify-end gap-6 w-[50%]">
          <SearchBar
            handleFunction={handleSearch}
            placeholder="Pesquise por livros"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12 items-center justify-center max-w-[76.875rem]">
        {booksSearched.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-end max-w-[76.875rem]">
              {booksSearched.length > 0 && (
                <IconButton
                  icon={xOutline}
                  iconOnHover={xFill}
                  onClick={() => setBooksSearched([])}
                >
                  Limpar busca
                </IconButton>
              )}
            </div>

            <BooksSection
              sectionTitle={`Resultados para sua busca: ${searchText}`}
              books={booksSearched}
            />
          </div>
        )}

        <Categories />
        <BooksSection
          sectionTitle="Adicionados recentemente"
          books={recentBooks}
        />
        <BooksSection
          sectionTitle="Explore outros títulos"
          books={exploreBooks}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
