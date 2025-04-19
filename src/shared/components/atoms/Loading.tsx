import { createPortal } from "react-dom";

interface IProps {
  loadingType?:
    | "loading-ball"
    | "loading-bars"
    | "loading-ring"
    | "loading-dots"
    | "loading-spinner"
    | "loading-infinity";
  loadingSize?: "loading-xs" | "loading-sm" | "loading-md" | "loading-lg";
}

export default function Loading({
  loadingType = "loading-ball",
  loadingSize = "loading-lg",
}: IProps) {
  return createPortal(
    <span
      className={`absolute top-[50%] left-[50%] loading ${loadingType} ${loadingSize}`}
    ></span>,
    document.getElementById("loading") as HTMLSpanElement
  );
}
