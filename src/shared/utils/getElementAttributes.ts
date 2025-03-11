import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export const getButtonAttributes = (
  additionalProps?: ButtonHTMLAttributes<HTMLButtonElement>
): ButtonHTMLAttributes<HTMLButtonElement> => {
  return {
    ...additionalProps,
  };
};
export const getInputTextAttributes = (
  additionalProps?: InputHTMLAttributes<HTMLInputElement>
): InputHTMLAttributes<HTMLInputElement> => {
  return {
    ...additionalProps,
  };
};
