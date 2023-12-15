import React from "react";

interface KbdProps {
  children: React.ReactNode;
}

export default function Kbd({ children }: KbdProps) {
  return (
    <kbd className="bg-zinc-700 py-1 px-2 rounded-md uppercase">{children}</kbd>
  );
}
