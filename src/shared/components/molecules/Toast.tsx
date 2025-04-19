import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
}
export default function Toast({ children }: IProps) {
  const defaultChildren = (
    <div className="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  );

  return createPortal(
    <div className="toast toast-top toast-end z-50">
      {children ? children : defaultChildren}
    </div>,
    document.getElementById("toast")!
  );
}
