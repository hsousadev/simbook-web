import { ReactNode } from "react";

interface MainButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function MainButton({ children, onClick, disabled }: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center min-w-[8.75rem] p-2 bg-surface-color-primary border-line-color border-2 rounded-xl transition duration-300 ease-in-out ${
        disabled
          ? "cursor-not-allowed"
          : "hover:bg-main-color hover:text-white hover:border-transparent"
      } `}
    >
      {children}
    </button>
  );
}

export default MainButton;
