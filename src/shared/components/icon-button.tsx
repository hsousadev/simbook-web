import { ReactNode, useState } from "react";
import Image from "next/image";

interface IconButtonsProps {
  children: ReactNode;
  icon: string;
  iconOnHover: string;
  color?: string;
  onClick?: () => void;
}

export function IconButton({
  children,
  icon,
  iconOnHover,
  color,
  onClick,
}: IconButtonsProps) {
  const [currentIcon, setCurrentIcon] = useState(icon);

  return (
    <button
      className="flex gap-2 items-center justify-center"
      onMouseEnter={() => setCurrentIcon(iconOnHover)}
      onMouseLeave={() => setCurrentIcon(icon)}
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={currentIcon}
          width={24}
          height={24}
          alt="ícone do botão"
          className="transition-opacity duration-300 ease-in-out"
        />
      </div>
      <p
        className={`text-sm text-center ${
          color ? color : "text-text-secondary-color hover:text-main-color "
        } transition duration-300 ease-in-out`}
      >
        {children}
      </p>
    </button>
  );
}

export default IconButton;
