/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Footer from "@/shared/components/footer";
import TopBar from "@/shared/components/top-bar";
import SearchBar from "@/shared/components/search-bar";
import Categories from "@/shared/components/categories";
import IconButton from "@/shared/components/icon-button";
import BooksSection from "@/shared/components/books-section";

import xOutline from "@/shared/assets/icons/x-outline.svg";
import xFill from "@/shared/assets/icons/x-fill.svg";
import MainButton from "@/shared/components/main-button";

export interface Book {
  id: string;
  description: string;
  authorname: string;
  title: string;
  imgurl: string;
  genre: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  imgurl: string;
  permission: string;
}

// SSR
// export const getServerSideProps = async () => {
//   try {
//     const respBooks = await axios.get(
//       `https://simbook-node-server.onrender.com/books`
//     );
//     const books = respBooks.data;

//     const respUsers = await axios.get(
//       "https://simbook-node-server.onrender.com/users"
//     );
//     const users = respUsers.data;

//     return {
//       props: {
//         books: books,
//         users: users,
//       },
//     };
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error);

//     return {
//       props: {
//         books: [],
//         users: [],
//       },
//     };
//   }
// };

export function Home({ books }: { books: Book[] }) {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    name: "",
    imgurl: "",
    permission: "",
  });

  const [booksSearched, setBooksSearched] = useState([]);

  const [searchText, setSearchText] = useState("");

  // const recentBooks = books.slice(0, 7);
  // const exploreBooks = books.slice(7);

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
      toast.error("Erro ao buscar dados");
      console.error("Erro ao buscar dados:", err);
    }
  }

  function loadUserFromSessionStorage() {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }

  useEffect(() => {
    loadUserFromSessionStorage();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <ToastContainer />
      <TopBar />

      <div className="flex flex-col gap-8 md:flex md:flex-row items-center justify-between w-full px-6 max-w-screen-xl mt-12 pb-8 border-b-line-color border-b-[1px]">
        {user.name !== "" ? (
          <h1 className="text-3xl">
            Olá, <span className="text-main-color">{user.name}</span>
            <br /> Bem-vindo de volta!
          </h1>
        ) : (
          <div className="flex items-end justify-start gap-6">
            <h1 className="text-3xl">
              Olá, <span className="text-main-color">você!</span>
              <br /> É novo por aqui?
            </h1>
            <MainButton onClick={() => router.push("/register")}>
              Criar conta
            </MainButton>
          </div>
        )}

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
        {/* <BooksSection
          sectionTitle="Adicionados recentemente"
          books={recentBooks}
        />
        <BooksSection
          sectionTitle="Explore outros títulos"
          books={exploreBooks}
        /> */}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
