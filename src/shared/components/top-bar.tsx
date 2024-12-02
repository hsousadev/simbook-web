import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { User } from "@/pages";

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

import homeOutline from "@/shared/assets/icons/home-outline.svg";
import homeFill from "@/shared/assets/icons/home-fill.svg";

import IconButton from "./icon-button";
import UserInfo from "./user-info";
import MainButton from "./main-button";
import Modal from "./modal";
import AddBook from "./add-book";

export function TopBar() {
  const router = useRouter();

  const isHome = router.pathname === "/";

  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    name: "",
    imgurl: "",
    permission: "",
  });

  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const [isMobileOptionsVisible, setIsMobileOptionsVisible] = useState(false);

  function loadUserFromSessionStorage() {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }

  function clearUserOnSessionStorage() {
    sessionStorage.removeItem("user");
    window.location.reload();
  }

  function handleLogout() {
    clearUserOnSessionStorage();
    router.push("/");
    console.log("aqui");
  }

  useEffect(() => {
    loadUserFromSessionStorage();
  }, []);

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

      {user.username && (
        <div
          className={`${
            isMobileOptionsVisible ? "flex flex-col" : "hidden"
          } md:flex md:flex-row items-center justify-between gap-4 `}
        >
          {!isHome && (
            <IconButton
              onClick={() => router.push("/")}
              icon={homeOutline}
              iconOnHover={homeFill}
            >
              Página inicial
            </IconButton>
          )}
          <IconButton
            onClick={() => router.push("/favorites")}
            icon={heartOutline}
            iconOnHover={heartFill}
          >
            Seus favoritos
          </IconButton>
          {user.permission.includes("main") && (
            <>
              <IconButton
                onClick={() => router.push("/users")}
                icon={usersOutline}
                iconOnHover={usersFill}
              >
                Gerenciar usuários
              </IconButton>

              <IconButton
                onClick={() => setIsAddBookModalOpen(true)}
                icon={booksOutline}
                iconOnHover={booksFill}
              >
                Adicionar livros
              </IconButton>
            </>
          )}

          <IconButton
            icon={signOutOutline}
            iconOnHover={singOutFill}
            color="text-red-400"
            onClick={handleLogout}
          >
            Sair
          </IconButton>

          <div className={`${isMobileOptionsVisible ? "hidden" : "flex ml-4"}`}>
            <UserInfo
              name={user.name}
              imgurl={user.imgurl}
              permission={user.permission}
            />
          </div>
        </div>
      )}

      {!user.username && (
        <div className="flex items-center justify-between gap-6">
          <p className="text-xs">Já tem uma conta?</p>
          <MainButton onClick={() => router.push("/login")}>
            Fazer Login
          </MainButton>
        </div>
      )}

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
            src={user.imgurl || ""}
            alt="Foto de perfil do usuário"
            width={40}
            height={40}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      {isAddBookModalOpen && (
        <Modal
          onClose={() => setIsAddBookModalOpen(false)}
          isOpen={isAddBookModalOpen}
        >
          <AddBook onClose={() => setIsAddBookModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default TopBar;
