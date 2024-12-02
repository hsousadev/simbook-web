import Image from "next/image";

import logo from "@/shared/assets/logo/logo-primary.svg";
import codeOutline from "@/shared/assets/icons/code-outline.svg";

export function Footer() {
  return (
    <div className="max-w-screen-xl w-full mb-12 p-4">
      <div className="flex flex-col items-center justify-center border-b-line-color border-t-[1px] border-b-[1px] mb-10 mt-20 w-full h-[16.25rem]">
        <div className="flex justify-between w-full">
          <Image src={logo} alt="Logo Simbook" width={120} />

          <span className="flex items-center justify-center gap-2">
            Aplicação de gerenciamento de Livros.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full md:flex md:flex-row md:justify-between">
        <span>©2024 · Para estudos e testes. </span>
        <a
          href="https://henriquesousadev.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 cursor-pointer transition duration-300 ease-in-out hover:text-main-color "
        >
          <Image src={codeOutline} alt="Logo Simbook" width={24} height={24} />{" "}
          Desenvolvido por Henrique Sousa
        </a>
      </div>
    </div>
  );
}

export default Footer;
