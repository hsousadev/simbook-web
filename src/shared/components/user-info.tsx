import Image from "next/image";

interface UserInfoProps {
  name: string;
  imgurl: string;
  permission: string;
}

export function UserInfo({ name, imgurl, permission }: UserInfoProps) {
  return (
    <div className="flex items-center justify-between gap-2 ">
      <div className="rounded-md overflow-hidden w-10 h-10">
        <Image
          src={imgurl}
          alt="Foto de perfil do usuário"
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col">
        <p>{name}</p>
        <span className="text-xs font-bold text-font-primary-color">
          {permission.includes("main")
            ? "Admin principal"
            : permission.includes("admin")
            ? "Admin"
            : "Padrão"}
        </span>
      </div>
    </div>
  );
}

export default UserInfo;
