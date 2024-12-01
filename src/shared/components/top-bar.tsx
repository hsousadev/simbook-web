import { useState } from "react";

import Image from "next/image";

import logo from "@/shared/assets/logo/logo-primary.svg";

import heartOutline from "@/shared/assets/icons/heart-outline.svg";
import heartFill from "@/shared/assets/icons/heart-fill.svg";

import usersOutline from "@/shared/assets/icons/users-outline.svg";
import usersFill from "@/shared/assets/icons/users-fill.svg";

import booksOutline from "@/shared/assets/icons/books-outline.svg";
import booksFill from "@/shared/assets/icons/books-fill.svg";

import signOutOutline from "@/shared/assets/icons/sign-out-outline.svg";
import singOutFill from "@/shared/assets/icons/sign-out-fill.svg";

import arrowDownOutline from "@/shared/assets/icons/arrow-down-outline.svg";
import arrowUpOutline from "@/shared/assets/icons/arrow-up-outline.svg";

import IconButton from "./icon-button";
import UserInfo from "./user-info";

export function TopBar() {
  const [isMobileOptionsVisible, setIsMobileOptionsVisible] = useState(false);

  return (
    <div
      id="top"
      className={`${
        isMobileOptionsVisible ? "flex flex-col" : "flex flex-row"
      } flex flex-row w-full justify-between max-w-screen-xl p-6 gap-4`}
    >
      <div
        className={`${
          isMobileOptionsVisible ? "flex justify-center w-full " : "flex"
        }`}
      >
        <Image src={logo} alt="Logo Simbook" width={120} />
      </div>

      <div
        className={`${
          isMobileOptionsVisible ? "flex flex-col" : "hidden"
        } md:flex md:flex-row items-center justify-between gap-4 `}
      >
        <IconButton icon={heartOutline} iconOnHover={heartFill}>
          Seus favoritos
        </IconButton>
        <IconButton icon={usersOutline} iconOnHover={usersFill}>
          Gerenciar usuários
        </IconButton>
        <IconButton icon={booksOutline} iconOnHover={booksFill}>
          Adicionar livros
        </IconButton>
        <IconButton
          icon={signOutOutline}
          iconOnHover={singOutFill}
          color="text-red-400"
        >
          Sair
        </IconButton>

        <div className={`${isMobileOptionsVisible ? "hidden" : "flex ml-4"}`}>
          <UserInfo
            name="Henrique Sousa"
            imgurl="https://avatars.githubusercontent.com/u/54003876?v=4"
            permission="admin.main"
          />
        </div>
      </div>

      <div
        onClick={() => setIsMobileOptionsVisible(!isMobileOptionsVisible)}
        className="flex flex-row items-center justify-center md:hidden gap-2 cursor-pointer"
      >
        <Image
          src={isMobileOptionsVisible ? arrowUpOutline : arrowDownOutline}
          alt="Opções"
          width={20}
          height={20}
        />

        <div className="rounded-md overflow-hidden w-10 h-10">
          <Image
            src="https://avatars.githubusercontent.com/u/54003876?v=4"
            alt="Foto de perfil do usuário"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
