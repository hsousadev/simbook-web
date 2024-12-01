import { useState } from "react";

import Image from "next/image";

import searchOutline from "@/shared/assets/icons/search-outline.svg";

interface SearchBarProps {
  handleFunction: (search: string) => void;
  placeholder: string;
}

export function SearchBar({ handleFunction, placeholder }: SearchBarProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-color-secondary w-full md:max-w-[400px]">
      <input
        className="text-xs bg-transparent outline-none appearance-none w-full focus:outline-none"
        type="search"
        maxLength={60}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => handleFunction(search)}>
        <Image
          src={searchOutline}
          alt="Botão de pesquisa"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}

export default SearchBar;
