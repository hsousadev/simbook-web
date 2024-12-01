import Image from "next/image";

import heartOutline from "@/shared/assets/icons/heart-outline.svg";
import MainButton from "./main-button";

interface BookItemProps {
  imgurl: string;
  title: string;
  authorname: string;
}

export function BookItem({ imgurl, title, authorname }: BookItemProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="rounded-md overflow-hidden w-[8.75rem] h-[10.5rem]">
        <Image
          src={imgurl}
          alt={`Capa do Livro: ${title}`}
          width={140}
          height={160}
        />
      </div>

      <div className="flex items-start justify-between w-full">
        <div>
          <h4>{title}</h4>
          <span>{authorname}</span>
        </div>

        <div>
          <Image src={heartOutline} alt="Icone de favoritar" />
        </div>
      </div>

      <MainButton>Ver</MainButton>
    </div>
  );
}
