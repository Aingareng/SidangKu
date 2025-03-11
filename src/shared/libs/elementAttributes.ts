import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

export const MenuAttributes: HTMLAttributes<HTMLMenuElement> = {
  tabIndex: 0,
  className:
    "menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",
};

export const ListAttributes: HTMLAttributes<HTMLLIElement> = {};
export const DetailsAttributes: HTMLAttributes<HTMLDetailsElement> = {};
export const TableAttributes: HTMLAttributes<HTMLTableElement> = {
  className: "table",
};
export const TableHeadAttributes: HTMLAttributes<HTMLTableSectionElement> = {};
export const TableBodyAttributes: HTMLAttributes<HTMLTableSectionElement> = {};
export const ButtonAttributes: ButtonHTMLAttributes<HTMLButtonElement> = {
  className: "btn btn-active",
};
export const InputTextAttributes: InputHTMLAttributes<HTMLInputElement> = {
  className: "input input-bordered w-full max-w-xs",
};
export const FormAttributes: FormHTMLAttributes<HTMLFormElement> = {};
