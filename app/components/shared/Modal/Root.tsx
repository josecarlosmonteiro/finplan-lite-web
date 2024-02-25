import { ReactNode } from "react";
import { BsXCircle } from 'react-icons/bs';
import { Typography } from "../Typography";

type Props = {
  title?: string;
  children?: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

export function Root({ title, children, isOpen, closeModal }: Props) {
  return (
    <>
      {
        isOpen &&
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-md shadow-black">
            <div className="p-4 flex justify-between items-center">
              <Typography.Subtitle>{title}</Typography.Subtitle>
              <button className="p-2 text-gray-400" onClick={closeModal}>
                <BsXCircle size={18} />
              </button>
            </div>
            {children}
          </div>
        </div>
      }
    </>
  )
}