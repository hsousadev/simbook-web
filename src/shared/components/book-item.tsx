import Image from "next/image";

import { useRouter } from "next/router";

import heartOutline from "@/shared/assets/icons/heart-outline.svg";
import MainButton from "./main-button";

import { Book } from "@/pages";

export function BookItem({ imgurl, title, authorname, id }: Book) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between gap-4 max-w-[8.75rem]">
      <div className="rounded-md overflow-hidden w-[8.75rem] object-contain h-[160px]">
        <Image
          src={imgurl}
          alt={`Capa do Livro: ${title}`}
          width={500}
          height={500}
          style={{ width: "auto", height: "auto" }}
          loading="eager"
        />
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="min-h-[72px]">
          <h4 className="text-font-primary-color font-semibold">
            {title.length > 20 ? title.slice(0, 20) + "..." : title}
          </h4>
          <span className="text-xs">
            {authorname.length > 12
              ? authorname.slice(0, 12) + "..."
              : authorname}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-start w-full">
        <Image src={heartOutline} alt="Icone de favoritar" />
      </div>

      <MainButton onClick={() => router.push(`/book/${id}`)}>Ver</MainButton>
    </div>
  );
}
