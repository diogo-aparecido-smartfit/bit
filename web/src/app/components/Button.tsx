import { HTMLAttributes, ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  className?: HTMLAttributes<HTMLInputElement> | string;
  children: ReactNode;
}

export default function Button({
  type,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:bg-primaryColor hover:border-elementsBg hover:text-elementsBg transition-all duration-500 ease-in-out flex flex-col items-center`}
    >
      {children}
    </button>
  );
}
