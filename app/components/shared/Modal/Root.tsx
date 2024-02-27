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
          <div className="min-w-fit bg-white rounded shadow-xl shadow-gray-600">
            <div className="p-2 px-4 flex justify-between items-center gap-12">
              <Typography.Subtitle>{title}</Typography.Subtitle>
              <button className="p-2 text-gray-400" onClick={closeModal}>
                <BsXCircle size={18} />
              </button>
            </div>
            <hr />
            {children}
          </div>
        </div>
      }
    </>
  )
}