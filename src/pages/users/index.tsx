import Footer from "@/shared/components/footer";
import MainButton from "@/shared/components/main-button";
import TopBar from "@/shared/components/top-bar";
import UserInfo from "@/shared/components/user-info";
import IconButton from "@/shared/components/icon-button";

import trashOutline from "@/shared/assets/icons/trash-outline.svg";
import trashFill from "@/shared/assets/icons/trash-fill.svg";

export function Users() {
  return (
    <div className="flex items-center justify-center flex-col">
      <TopBar />
      <div className="flex flex-col gap-8 md:flex md:flex-row items-center justify-between w-full px-6 max-w-screen-xl mt-12 pb-8 border-b-line-color border-b-[1px]">
        <h1 className="text-3xl">
          Esses são todos <br />
          os <span className="text-main-color">usuários</span> disponíveis
        </h1>

        <MainButton>Adicionar novo usuário</MainButton>
      </div>

      <div className="flex flex-col justify-center items-center min-h-[40vh] w-full md:flex md:flex-row md:items-start md:justify-start p-6 gap-12 max-w-screen-xl">
        <div className="flex flex-col gap-4">
          <UserInfo
            name="Henrique Sousa"
            imgurl="https://avatars.githubusercontent.com/u/54003876?v=4"
            permission="admin.main"
          />

          <div className="border-t-line-color border-t-[1px] pt-4">
            <IconButton
              icon={trashOutline}
              iconOnHover={trashFill}
              color="text-red-400"
            >
              Deletar usuário
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <UserInfo
            name="Henrique Sousa"
            imgurl="https://avatars.githubusercontent.com/u/54003876?v=4"
            permission="admin.main"
          />

          <div className="border-t-line-color border-t-[1px] pt-4">
            <IconButton
              icon={trashOutline}
              iconOnHover={trashFill}
              color="text-red-400"
            >
              Deletar usuário
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <UserInfo
            name="Henrique Sousa"
            imgurl="https://avatars.githubusercontent.com/u/54003876?v=4"
            permission="admin.main"
          />

          <div className="border-t-line-color border-t-[1px] pt-4">
            <IconButton
              icon={trashOutline}
              iconOnHover={trashFill}
              color="text-red-400"
            >
              Deletar usuário
            </IconButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Users;
