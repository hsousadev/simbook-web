import axios from "axios";
import { useState } from "react";

import MainButton from "./main-button";
import { toast } from "react-toastify";

interface AddBooks {
  onClose: () => void;
}

export function AddBook({ onClose }: AddBooks) {
  const [isLoading, setIsLoading] = useState(false);

  const [book, setBook] = useState({
    title: "",
    description: "",
    authorname: "",
    imgurl: "",
    genre: "",
  });

  async function handleAddBook() {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://simbook-node-server.onrender.com/books`,
        {
          title: book.title,
          description: book.description,
          authorname: book.authorname,
          imgurl: book.imgurl,
          genre: book.genre,
        }
      );

      if (response.status === 201) {
        toast.success("Livro adicionado criado com sucesso");
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
    onClose();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Nome do Livro</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="Ex.: Harry Potter"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Author</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="Ex.: J.K. Rownling"
            value={book.authorname}
            onChange={(e) => setBook({ ...book, authorname: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Descrição</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="Ex.: Lorem ipsum dolor sit amet..."
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Capa do livro - Link da imagem</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="https://..."
            value={book.imgurl}
            onChange={(e) => setBook({ ...book, imgurl: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Genero</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="Fantasia"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
          />
        </div>
      </div>

      <MainButton disabled={isLoading} onClick={handleAddBook}>
        {isLoading ? "Carregando..." : "Adicionar Livro"}
      </MainButton>
    </div>
  );
}

export default AddBook;
