/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Image from "next/image";

import TopBar from "@/shared/components/top-bar";
import IconButton from "@/shared/components/icon-button";

import heartOutline from "@/shared/assets/icons/heart-outline.svg";
import heartFill from "@/shared/assets/icons/heart-fill.svg";

import pencilOutline from "@/shared/assets/icons/pencil-outline.svg";
import pencilFill from "@/shared/assets/icons/pencil-fill.svg";

import trashOutline from "@/shared/assets/icons/trash-outline.svg";
import trashFill from "@/shared/assets/icons/trash-fill.svg";

import Footer from "@/shared/components/footer";
import BooksSection from "@/shared/components/books-section";
import EditBook from "./components/edit-book";
import Modal from "@/shared/components/modal";
import MainButton from "@/shared/components/main-button";

interface Book {
  id: string;
  description: string;
  authorname: string;
  title: string;
  imgurl: string;
  genre: string;
}

export const getServerSideProps = async (context: any) => {
  try {
    const { id } = context.params;

    const respBooks = await axios.get(
      `https://simbook-node-server.onrender.com/books`
    );
    const books = respBooks.data;

    const book = books.find((book: any) => book.id === id);

    return {
      props: {
        book: book,
        books: books,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);

    return {
      props: {
        book: {},
        books: [],
      },
    };
  }
};

export function Book(data: any) {
  const router = useRouter();
  const { id } = router.query;

  const [initialBook, setInitialBook] = useState(data.book);

  const [isLoading, setIsLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const recentBooks = data.books.slice(0, 7);

  async function updateBook() {
    setIsEditModalOpen(false);
    setIsLoading(true);

    const res = await axios.get(
      "https://simbook-node-server.onrender.com/books"
    );

    const books = res.data;

    const book = books.find((book: any) => book.id === id);

    setInitialBook(book);
    setIsLoading(false);
  }

  async function handleDeleteBook() {
    setIsLoading(true);

    // deletar usuário com try catch
    try {
      await axios.delete(
        `https://simbook-node-server.onrender.com/books/${id}`
      );

      toast.success("Livro deletado com sucesso!");

      router.push("/");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }

    setIsLoading(false);
    setIsOpenDeleteModal(false);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <ToastContainer />
      <TopBar />

      <div className="flex flex-col items-center justify-center md:flex md:flex-row gap-16 pt-4 pb-8 px-6 mt-4 mb-10 border-b-line-color border-b-[1px] w-full max-w-screen-xl">
        <div className="rounded-md overflow-hidden w-[18.125rem]">
          <Image
            src={initialBook.imgurl}
            alt="Capa do Livro"
            width={290}
            height={432}
          />
        </div>

        <div className="flex flex-col gap-4 justify-between md:h-[432px] w-[70%]">
          <div className="flex flex-col gap-4 ">
            <h2 className="text-2xl text-font-primary-color">
              Detalhes do livro
            </h2>

            <div>
              <h3 className="text-[1rem]">
                <strong className="text-font-primary-color text-[1rem]">
                  Nome do livro:
                </strong>{" "}
                {isLoading ? "Carregando..." : initialBook.title}
              </h3>

              <h3 className="text-[1rem]">
                <strong className="text-font-primary-color text-[1rem]">
                  Genero:
                </strong>{" "}
                {isLoading ? "Carregando..." : initialBook.genre}
              </h3>

              <h3 className="text-[1rem]">
                <strong className="text-font-primary-color text-[1rem]">
                  Autor:
                </strong>{" "}
                {isLoading ? "Carregando..." : initialBook.authorname}
              </h3>
            </div>

            <h3 className="text-[1rem]">
              <strong className="text-font-primary-color text-[1rem]">
                Sumário do livro:
              </strong>{" "}
              {isLoading ? "Carregando..." : initialBook.description}
            </h3>
          </div>

          <div className="flex flex-col items-center justify-start md:flex md:flex-row md:items-center md:justify-start gap-4 w-full">
            <IconButton icon={heartOutline} iconOnHover={heartFill}>
              Favoritar
            </IconButton>
            <IconButton
              onClick={() => setIsEditModalOpen(true)}
              icon={pencilOutline}
              iconOnHover={pencilFill}
            >
              Editar Informações
            </IconButton>
            <IconButton
              icon={trashOutline}
              iconOnHover={trashFill}
              color="text-red-400"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              Deletar livro
            </IconButton>
          </div>
        </div>
      </div>

      <BooksSection
        sectionTitle="Adicionados recentemente"
        books={recentBooks}
      />

      {isOpenDeleteModal && (
        <Modal
          onClose={() => setIsOpenDeleteModal(false)}
          isOpen={isOpenDeleteModal}
        >
          <div className="flex flex-col gap-16 items-start justify-start">
            <h2 className="text-center">
              Tem Certeza? <br /> Essa ação não poderá ser desfeita
            </h2>
            <div className="w-full flex justify-end">
              <MainButton disabled={isLoading} onClick={handleDeleteBook}>
                {isLoading ? "Carregando..." : "Sim, deletar livro"}
              </MainButton>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditBook onClose={() => updateBook()} book={initialBook} />
        </Modal>
      )}

      <Footer />
    </div>
  );
}

export default Book;
