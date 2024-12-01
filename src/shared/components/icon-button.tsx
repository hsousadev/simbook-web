import { ReactNode, useState } from "react";
import Image from "next/image";

interface IconButtonsProps {
  children: ReactNode;
  icon: string;
  iconOnHover: string;
  color?: string;
}

export function IconButton({
  children,
  icon,
  iconOnHover,
  color,
}: IconButtonsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="flex gap-2 items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-6 h-6">
        <Image
          src={icon}
          width={24}
          height={24}
          alt="ícone do botão"
          className={`absolute transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={iconOnHover}
          width={24}
          height={24}
          alt="ícone ao passar o mouse"
          className={`absolute transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <p
        className={`text-sm text-center ${
          color ? color : "text-text-secondary-color hover:text-main-color "
        } mt-1 transition duration-300 ease-in-out`}
      >
        {children}
      </p>
    </button>
  );
}

export default IconButton;
