import { ReactNode } from "react";

import IconButton from "./icon-button";

import xOutline from "@/shared/assets/icons/x-outline.svg";
import xFill from "@/shared/assets/icons/x-fill.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-fit shadow-lg">
        <div className="flex w-full">
          <IconButton icon={xOutline} iconOnHover={xFill} onClick={onClose}>
            Fechar
          </IconButton>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
