/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";

import MainButton from "@/shared/components/main-button";
// import { User } from "@/pages";

interface EditaUserProps {
  user: any;
  onClose: () => void;
}

export function EditUser({ user, onClose }: EditaUserProps) {
  const [editedUser, setEditedUser] = useState(user);

  const [isLoading, setIsLoading] = useState(false);

  async function handleEditUser() {
    setIsLoading(true);

    try {
      const parsedUser = userSchema.parse(editedUser);

      const response = await axios.put(
        `https://simbook-node-server.onrender.com/users/${user.id}`,
        {
          name: parsedUser.name,
          username: parsedUser.username,
          password: parsedUser.password,
          imgurl: parsedUser.imgurl,
          permission: parsedUser.permission,
        }
      );

      if (response.status === 201) {
        toast.success("Usuário alterado com sucesso");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => toast.error(error.message));
      } else {
        console.error("Erro ao editar:", err);
        toast.error("Erro ao editar usuário");
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  const userSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório").max(60, "Nome muito longo"),
    username: z
      .string()
      .min(1, "Username é obrigatório")
      .max(30, "Username muito longo")
      .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Username só pode conter letras, números, pontos, traços e underlines"
      ),
    imgurl: z
      .string()
      .url("O link da imagem deve ser uma URL válida")
      .optional(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    permission: z.string().optional(),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Nome</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="Ex.: Henrique Sousa"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
          />
        </div>
        {!userSchema.shape.name.safeParse(editedUser.name).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.name.safeParse(editedUser.name).error?.errors[0]
                ?.message
            }
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">
          Nome de usuário único (username / nickname)
        </span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="Ex.: henriue.sousa01"
            value={editedUser.username}
            onChange={(e) =>
              setEditedUser({ ...editedUser, username: e.target.value })
            }
          />
        </div>
        {!userSchema.shape.username.safeParse(editedUser.username).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.username.safeParse(editedUser.username).error
                ?.errors[0]?.message
            }
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Link da imagem de peril (Url)</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            placeholder="https://..."
            value={editedUser.imgurl}
            onChange={(e) =>
              setEditedUser({ ...editedUser, imgurl: e.target.value })
            }
          />
        </div>
        {!userSchema.shape.imgurl.safeParse(editedUser.imgurl).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.imgurl.safeParse(editedUser.imgurl).error
                ?.errors[0]?.message
            }
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Senha</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="password"
            maxLength={60}
            value={editedUser.password}
            onChange={(e) =>
              setEditedUser({ ...editedUser, password: e.target.value })
            }
          />
        </div>
        {!userSchema.shape.password.safeParse(editedUser.password).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.password.safeParse(editedUser.password).error
                ?.errors[0]?.message
            }
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="text-[12px]">Permissão</span>
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
          <input
            className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
            type="text"
            maxLength={60}
            value={editedUser.permission}
            onChange={(e) =>
              setEditedUser({ ...editedUser, permission: e.target.value })
            }
          />
        </div>
        {!userSchema.shape.permission.safeParse(editedUser.permission)
          .success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.permission.safeParse(editedUser.permission).error
                ?.errors[0]?.message
            }
          </span>
        )}
      </div>

      <MainButton disabled={isLoading} onClick={handleEditUser}>
        Salvar alterações
      </MainButton>
    </div>
  );
}

export default EditUser;
