// import {   useRef } from "react";
import { createPortal } from "react-dom";

import { ForwardedRef, ReactNode } from "react";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  children: ReactNode;
}

export default function Modal({ ref, children }: IProps) {
  const modalRoot = document.getElementById("modal") as HTMLDialogElement;

  const defaultContent = (
    <>
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">Press ESC key or click on ✕ button to close</p>
    </>
  );
  return createPortal(
    <dialog ref={ref} className="modal">
      <div className="modal-box sm:modal-middle">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {children ? children : defaultContent}
      </div>
    </dialog>,
    modalRoot
  );
}
