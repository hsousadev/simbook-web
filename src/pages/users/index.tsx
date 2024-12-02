/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { User } from "..";

import Footer from "@/shared/components/footer";
import MainButton from "@/shared/components/main-button";
import TopBar from "@/shared/components/top-bar";
import UserInfo from "@/shared/components/user-info";
import IconButton from "@/shared/components/icon-button";

import trashOutline from "@/shared/assets/icons/trash-outline.svg";
import trashFill from "@/shared/assets/icons/trash-fill.svg";

import pencilOutline from "@/shared/assets/icons/pencil-outline.svg";
import pencilFill from "@/shared/assets/icons/pencil-fill.svg";

import EditUser from "./components/edit-user";
import AddUser from "./components/add-user";

import Modal from "@/shared/components/modal";
import { toast, ToastContainer } from "react-toastify";

// SSR
export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      "https://simbook-node-server.onrender.com/users"
    );
    const users = res.data;

    return {
      props: {
        users: users,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);

    return {
      props: {
        users: [],
      },
    };
  }
};

export function Users({ users }: { users: User[] }) {
  const router = useRouter();

  const [user, setUser] = useState<User>();

  const [isLoading, setIsLoading] = useState(false);

  const [initialUsers, setInitialUsers] = useState(users);
  const [id, setId] = useState("");

  const [userToEdit, setUserToEdit] = useState<User>();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  function openDeleteModal(userId: string) {
    setId(userId);
    setIsOpenDeleteModal(true);
  }

  function openEditModal(user: User) {
    setUserToEdit(user);
    setIsOpenEditModal(true);
  }

  function openAddModal() {
    setIsOpenAddModal(true);
  }

  async function handleDeleteUser() {
    setIsLoading(true);

    // deletar usuário com try catch
    try {
      const res = await axios.delete(
        `https://simbook-node-server.onrender.com/users/${id}`
      );
      console.log("Usuário deletado com sucesso:", res.data);
      // atualizar lista de usuários
      const updatedUsers = users.filter((user) => user.id !== id);

      console.log("updatedUsers", updatedUsers);

      setInitialUsers(updatedUsers);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }

    setIsLoading(false);
    setIsOpenDeleteModal(false);
  }

  async function updateUsers() {
    setIsOpenEditModal(false);
    setIsOpenAddModal(false);
    setIsLoading(true);

    const res = await axios.get(
      "https://simbook-node-server.onrender.com/users"
    );
    const users = res.data;

    setInitialUsers(users);
    setIsLoading(false);
  }

  function loadUserFromSessionStorage() {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }

  function isAuthorizedUser(user: User | undefined) {
    if (!user) {
      router.push("/");
      return;
    }

    if (user && !user?.permission.includes("admin")) {
      toast.warning("Sem autorização para essa rota");
      router.push("/");
      return;
    }
  }

  useEffect(() => {
    loadUserFromSessionStorage();
  }, []);

  useEffect(() => {
    console.log("user", user);

    isAuthorizedUser(user);
  }, [user]);

  return (
    <div className="flex items-center justify-center flex-col">
      {user?.permission.includes("admin") && (
        <>
          <ToastContainer />
          <TopBar />
          <div className="flex flex-col gap-8 md:flex md:flex-row items-center justify-between w-full px-6 max-w-screen-xl mt-12 pb-8 border-b-line-color border-b-[1px]">
            <h1 className="text-3xl">
              Esses são todos <br />
              os <span className="text-main-color">usuários</span> disponíveis
            </h1>

            <MainButton onClick={openAddModal}>
              Adicionar novo usuário
            </MainButton>
          </div>

          <div className="flex flex-col justify-center items-center min-h-[40vh] w-full md:flex md:flex-row md:items-start md:justify-start p-6 gap-12 max-w-screen-xl">
            {initialUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-4 w-full max-w-[180px]"
              >
                <UserInfo {...user} />
                <div className="flex flex-col items-start justify-start gap-4 border-t-line-color border-t-[1px] pt-4">
                  <IconButton
                    icon={pencilOutline}
                    iconOnHover={pencilFill}
                    onClick={() => openEditModal(user)}
                  >
                    Editar usuário
                  </IconButton>
                  <IconButton
                    icon={trashOutline}
                    iconOnHover={trashFill}
                    color="text-red-400"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    Deletar usuário
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          {isOpenAddModal && (
            <Modal
              onClose={() => setIsOpenAddModal(false)}
              isOpen={isOpenAddModal}
            >
              <AddUser onClose={updateUsers} />
            </Modal>
          )}

          {isOpenEditModal && (
            <Modal
              onClose={() => setIsOpenEditModal(false)}
              isOpen={isOpenEditModal}
            >
              <EditUser user={userToEdit} onClose={updateUsers} />
            </Modal>
          )}

          {isOpenDeleteModal && (
            <Modal
              onClose={() => setIsOpenDeleteModal(false)}
              isOpen={isOpenDeleteModal}
            >
              <div className="flex flex-col gap-16 items-start justify-start">
                <h2>Tem Certeza? Essa ação não poderá ser desfeita</h2>
                <div className="w-full flex justify-end">
                  <MainButton disabled={isLoading} onClick={handleDeleteUser}>
                    {isLoading ? "Carregando..." : "Sim, deletar usuário"}
                  </MainButton>
                </div>
              </div>
            </Modal>
          )}

          <Footer />
        </>
      )}
    </div>
  );
}

export default Users;
