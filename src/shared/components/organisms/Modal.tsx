import { createPortal } from "react-dom";
import { ForwardedRef, ReactNode, useCallback, useEffect } from "react";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  children: ReactNode;
  onClose?: () => void;
  [key: string]: unknown;
}

export default function Modal({ ref, children, onClose }: IProps) {
  const modalRoot = document.getElementById("modal") as HTMLDialogElement;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const dialog = ref && "current" in ref ? ref.current : null;

    if (dialog) {
      dialog.addEventListener("close", handleClose);
      return () => dialog.removeEventListener("close", handleClose);
    }
  }, [handleClose, ref]);

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
