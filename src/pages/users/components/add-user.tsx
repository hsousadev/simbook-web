/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { z } from "zod";

import MainButton from "@/shared/components/main-button";

interface AddUserProps {
  onClose: () => void;
}

export function AddUser({ onClose }: AddUserProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UserRegister>({
    name: "",
    username: "",
    password: "",
    imgurl: "",
    permission: "default",
  });

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

  type UserRegister = z.infer<typeof userSchema>;

  async function handleRegister() {
    setIsLoading(true);

    try {
      const parsedUser = userSchema.parse(user);

      const response = await axios.post(
        `https://simbook-node-server.onrender.com/users`,
        {
          name: parsedUser.name,
          username: parsedUser.username,
          password: parsedUser.password,
          imgurl: parsedUser.imgurl,
          permission: parsedUser.permission,
        }
      );

      if (response.status === 201) {
        toast.success("Usuário criado com sucesso");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => toast.error(error.message));
      } else {
        console.error("Erro ao registrar:", err);
        toast.error("Erro ao registrar usuário");
      }
    } finally {
      setIsLoading(false);
    }

    onClose();
  }

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
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        {!userSchema.shape.name.safeParse(user.name).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.name.safeParse(user.name).error?.errors[0]
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
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        {!userSchema.shape.username.safeParse(user.username).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.username.safeParse(user.username).error
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
            value={user.imgurl}
            onChange={(e) => setUser({ ...user, imgurl: e.target.value })}
          />
        </div>
        {!userSchema.shape.imgurl.safeParse(user.imgurl).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.imgurl.safeParse(user.imgurl).error?.errors[0]
                ?.message
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
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {!userSchema.shape.password.safeParse(user.password).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.password.safeParse(user.password).error
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
            value={user.permission}
            onChange={(e) => setUser({ ...user, permission: e.target.value })}
          />
        </div>
        {!userSchema.shape.permission.safeParse(user.permission).success && (
          <span className="text-red-400 text-xs">
            {
              userSchema.shape.permission.safeParse(user.permission).error
                ?.errors[0]?.message
            }
          </span>
        )}
      </div>

      <MainButton disabled={isLoading} onClick={handleRegister}>
        {isLoading ? "Carregando..." : "Registrar usuário"}
      </MainButton>
    </div>
  );
}

export default AddUser;
