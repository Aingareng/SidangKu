import { useState } from "react";
import Toast from "../components/molecules/Toast";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastConfig {
  type: ToastType;
  message: string;
  duration?: number;
}

export const useToast = (defaultDuration = 3000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastContent, setToastContent] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  const showToast = ({ type, message, duration }: ToastConfig) => {
    setToastContent({ type, message });
    setIsVisible(true);

    // Auto-hide after duration
    setTimeout(() => {
      setIsVisible(false);
    }, duration || defaultDuration);
  };

  // Component Toast yang bisa di-render
  const toast = () => {
    if (!isVisible || !toastContent) return null;

    const alertClass = {
      success: "alert-success",
      error: "alert-error",
      info: "alert-info",
      warning: "alert-warning",
    }[toastContent.type];

    return (
      <Toast>
        <div className={`alert ${alertClass}`}>
          <span>{toastContent.message}</span>
        </div>
      </Toast>
    );
  };

  return { Toast: toast, showToast };
};
