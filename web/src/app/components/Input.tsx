import {
  HTMLInputTypeAttribute,
  HTMLAttributes,
  ChangeEventHandler,
} from "react";

interface InputProps {
  type: HTMLInputTypeAttribute | undefined;
  placeholder: string | undefined;
  className?: HTMLAttributes<HTMLInputElement> | string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  name?: string | undefined;
}

export default function Input({
  className,
  placeholder,
  type,
  value,
  onChange,
  required,
  name,
}: InputProps) {
  return (
    <input
      name={name}
      required={required}
      className={`${className} px-3 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 outline-none focus:border-primaryColor transition-all duration-300 placeholder:text-seccondaryText w-full`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
