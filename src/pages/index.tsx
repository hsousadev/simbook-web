/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/index.js
// import axios from "axios";

import TopBar from "@/shared/components/top-bar";
import SearchBar from "@/shared/components/search-bar";
import Categories from "@/shared/components/categories";

import BooksSection from "@/shared/components/books-section";
import Footer from "@/shared/components/footer";

// SSR
// export const getServerSideProps = async () => {
//   try {
//     const response = await axios.get(
//       "https://simbook-node-server.onrender.com/books"
//     );

//     return {
//       props: {
//         data: response.data,
//       },
//     };
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error);

//     return {
//       props: {
//         data: [],
//       },
//     };
//   }
// };

// export function Home({ data }: any) {
export function Home() {
  function handleSearch(searchText: string) {
    // Implementar a lógica para pesquisar os livros

    console.log("searchText", searchText);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <TopBar />

      <div className="flex flex-col gap-8 md:flex md:flex-row items-center justify-between w-full px-6 max-w-screen-xl mt-12 pb-8 border-b-line-color border-b-[1px]">
        <h1 className="text-3xl">
          Olá, <span className="text-main-color">Henrique</span>
          <br /> Bem-vindo de volta!
        </h1>

        <SearchBar
          handleFunction={handleSearch}
          placeholder="Pesquise por livros"
        />
      </div>

      <div className="flex flex-col gap-12 items-center justify-center">
        <Categories />
        <BooksSection sectionTitle="Adicionados recentemente" />
        <BooksSection sectionTitle="Explore diferentes títulos" />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
