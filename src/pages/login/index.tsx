import Image from "next/image";

import logo from "@/shared/assets/logo/logo-primary.svg";
import MainButton from "@/shared/components/main-button";

export function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] mt-[-48px]">
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
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-20 mt-12">
        <p className="text-sm">
          Não tem conta?{" "}
          <a className="text-main-color" href="">
            Cadastre.
          </a>
        </p>

        <MainButton>Entrar</MainButton>
      </div>
    </div>
  );
}

export default Login;
