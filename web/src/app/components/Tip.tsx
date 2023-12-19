"use client";
import { Tooltip } from "@material-tailwind/react";
import { useKBar } from "kbar";
import { useEffect, useState } from "react";
import { FiCommand } from "react-icons/fi";
import Kbd from "./Kbd";

export default function Tip() {
  const { query } = useKBar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userDevice = () => {
    if (mounted) {
      const isMac = /(Mac)/i.test(navigator.userAgent);
      const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

      if (isMobile) {
        return <>Click to open the menu</>;
      } else if (isMac) {
        return (
          <>
            Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the menu
          </>
        );
      } else {
        return (
          <>
            Press <Kbd>CTRL</Kbd> <Kbd>K</Kbd> to open the menu
          </>
        );
      }
    }
  };

  return (
    <Tooltip content={userDevice()}>
      <button
        onClick={query.toggle}
        className="flex  items-center justify-center p-2 sm:p-4 border-zinc-800 rounded-xl border-[1px] w-fit h-fit hover:bg-primaryColor hover:text-zinc-800 hover:border-elementsBg transition-all duration-300"
      >
        <FiCommand />
      </button>
    </Tooltip>
  );
}
