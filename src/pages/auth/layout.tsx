import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IProps) {
  return (
    <div className=" bg-[#568aff] flex items-center justify-center h-[100vh] ">
      {children}
    </div>
  );
}
