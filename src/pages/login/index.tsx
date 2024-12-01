/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter } from "next/router";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Image from "next/image";

import logo from "@/shared/assets/logo/logo-primary.svg";
import MainButton from "@/shared/components/main-button";
import Link from "next/link";

export function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function saveUserOnSessionStorage(user: any) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  async function handleLogin() {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://simbook-node-server.onrender.com/auth-user?username=${username}&password=${password}`
      );

      if (response.status === 200) {
        const authUser = response.data;

        saveUserOnSessionStorage(authUser);
        router.push("/");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast.error("Usuário ou senha inválidos.");
        } else {
          toast.error("Erro ao autenticar. Tente novamente mais tarde.");
        }
      } else {
        console.error("Erro desconhecido:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] mt-[-48px]">
      <ToastContainer />
      <Image src={logo} alt="Logo Simbook" width={194} />

      <div className="flex flex-col items-center gap-2 mt-8 mb-12">
        <h1 className="text-3xl ">Olá, Bem-vindo de volta!</h1>
        <p className="text-sm">Insira seus dados para entrar</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-2">
          <span className="text-[12px]">Nome de usuário</span>
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
            <input
              className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
              type="text"
              maxLength={60}
              placeholder="Ex.: henriue.sousa01"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <span className="text-[12px]">Senha</span>
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-color-secondary w-full min-w-[400px] md:max-w-[400px]">
            <input
              className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
              type="password"
              maxLength={60}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-20 mt-12">
        <p className="text-sm">
          Não tem conta?{" "}
          <Link href="/register" className="text-main-color">
            Cadastre.
          </Link>
        </p>

        <MainButton disabled={isLoading} onClick={handleLogin}>
          {isLoading ? "Carregando..." : "Entrar"}
        </MainButton>
      </div>
    </div>
  );
}

export default Login;
