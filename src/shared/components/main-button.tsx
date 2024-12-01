import { HTMLAttributes, ReactNode } from "react";

interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function MainButton({ children }: MainButtonProps) {
  return (
    <button className="flex items-center justify-center min-w-[8.75rem] p-2 bg-surface-color-primary border-line-color border-2 rounded-xl transition duration-300 ease-in-out hover:bg-main-color hover:text-white hover:border-transparent">
      {children}
    </button>
  );
}

export default MainButton;
