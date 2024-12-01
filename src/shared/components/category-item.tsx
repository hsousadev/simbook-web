import Image, { StaticImageData } from "next/image";
import { HTMLAttributes } from "react";

interface CategoryItemProps extends HTMLAttributes<HTMLDivElement> {
  img: StaticImageData;
  name: string;
  amount: number;
}

export function CategoryItem({ img, name, amount }: CategoryItemProps) {
  return (
    <div className="group flex flex-col items-center justify-center cursor-pointer rounded-xl p-2 transition duration-300 ease-in-out border-x-2 border-y-2 border-transparent hover:border-main-color hover:bg-surface-color-secondary">
      <div className="size-16 md:size-full">
        <Image src={img} alt={name} />
      </div>
      <p className="text-md font-semibold transition duration-300 ease-in-out group-hover:text-main-color">
        {name}
      </p>
      <span className="text-xs">
        {amount > 0 ? `${amount} Livros` : `${amount} Livro`} Livros
      </span>
    </div>
  );
}

export default CategoryItem;
