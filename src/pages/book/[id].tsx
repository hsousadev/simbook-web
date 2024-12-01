import Image from "next/image";

import TopBar from "@/shared/components/top-bar";
import IconButton from "@/shared/components/icon-button";

import heartOutline from "@/shared/assets/icons/heart-outline.svg";
import heartFill from "@/shared/assets/icons/heart-fill.svg";

import googleOutline from "@/shared/assets/icons/google-outline.svg";
import googleFill from "@/shared/assets/icons/google-fill.svg";

import pencilOutline from "@/shared/assets/icons/pencil-outline.svg";
import pencilFill from "@/shared/assets/icons/pencil-fill.svg";

import trashOutline from "@/shared/assets/icons/trash-outline.svg";
import trashFill from "@/shared/assets/icons/trash-fill.svg";

import Footer from "@/shared/components/footer";

export function Book() {
  return (
    <div className="flex items-center justify-center flex-col">
      <TopBar />

      <div className="flex flex-col items-center justify-center md:flex md:flex-row gap-16 pt-4 pb-8 px-6 mt-4 mb-10 border-b-line-color border-b-[1px] w-full max-w-screen-xl">
        <div className="rounded-md overflow-hidden w-[18.125rem]">
          <Image
            src="https://cdn.europosters.eu/image/1300/art-photo/harry-potter-order-of-the-phoenix-book-cover-i214931.jpg"
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
                Harry Potter and The Order Of The Phoenix
              </h3>

              <h3 className="text-[1rem]">
                <strong className="text-font-primary-color text-[1rem]">
                  Autor:
                </strong>{" "}
                J. K. Rowling
              </h3>
            </div>

            <h3 className="text-[1rem]">
              <strong className="text-font-primary-color text-[1rem]">
                Sumário do livro:
              </strong>{" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </h3>
          </div>

          <div className="flex flex-col items-center justify-start md:flex md:flex-row md:items-center md:justify-start gap-4 w-full">
            <IconButton icon={heartOutline} iconOnHover={heartFill}>
              Favoritar
            </IconButton>
            <IconButton icon={googleOutline} iconOnHover={googleFill}>
              Pesquisa no Google
            </IconButton>
            <IconButton icon={pencilOutline} iconOnHover={pencilFill}>
              Editar Informações
            </IconButton>
            <IconButton
              icon={trashOutline}
              iconOnHover={trashFill}
              color="text-red-400"
            >
              Deletar livro
            </IconButton>
          </div>
        </div>
      </div>

      {/* <BooksSection sectionTitle="Adicionados recentemente" /> */}

      <Footer />
    </div>
  );
}

export default Book;
