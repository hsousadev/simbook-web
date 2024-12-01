/* eslint-disable @typescript-eslint/no-explicit-any */
import MainButton from "@/shared/components/main-button";
import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";

interface AddBooks {
  onClose: () => void;
  book: any;
}

export function EditBook({ onClose, book }: AddBooks) {
  const [isLoading, setIsLoading] = useState(false);

  const [editedBook, setEditedBook] = useState(book);

  async function handleAddBook() {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `https://simbook-node-server.onrender.com/books/${editedBook?.id}`,
        {
          title: editedBook?.title,
          description: editedBook?.description,
          authorname: editedBook?.authorname,
          imgurl: editedBook?.imgurl,
          genre: editedBook?.genre,
        }
      );

      if (response.status === 201) {
        toast.success("Livro editado com sucesso");
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
            value={editedBook?.title}
            onChange={(e) =>
              setEditedBook({ ...editedBook, title: e.target.value })
            }
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
            value={editedBook?.authorname}
            onChange={(e) =>
              setEditedBook({ ...editedBook, authorname: e.target.value })
            }
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
            value={editedBook?.description}
            onChange={(e) =>
              setEditedBook({ ...editedBook, description: e.target.value })
            }
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
            value={editedBook?.imgurl}
            onChange={(e) =>
              setEditedBook({ ...editedBook, imgurl: e.target.value })
            }
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
            value={editedBook?.genre}
            onChange={(e) =>
              setEditedBook({ ...editedBook, genre: e.target.value })
            }
          />
        </div>
      </div>

      <MainButton disabled={isLoading} onClick={handleAddBook}>
        {isLoading ? "Carregando..." : "Editar Livro"}
      </MainButton>
    </div>
  );
}

export default EditBook;
