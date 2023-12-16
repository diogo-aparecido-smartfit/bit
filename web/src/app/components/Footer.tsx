"use client";

import { useState, useEffect } from "react";
import { MdKeyboardCommandKey } from "react-icons/md";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const brazilTimeZone = "America/Sao_Paulo"; // Fuso horário do Brasil
      const brazilTime = new Date().toLocaleString("en-US", {
        timeZone: brazilTimeZone,
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      setCurrentTime(brazilTime);
    };

    // Atualizar a cada segundo
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="flex text-seccondaryText">
      <div className="flex w-full h-fit border-t-[1px] border-zinc-800 p-4 justify-around items-center ">
        <div>
          <p className="hidden sm:flex">{currentTime?.toLocaleString()}</p>
        </div>

        <h3 className="absolute justify-center">bit technologies</h3>
        <div className="flex items-center gap-3">
          <button className="text-lg rounded-xl border-[1px] border-zinc-800 p-2 hover:brightness-150 transition-all duration-300">
            <MdKeyboardCommandKey />
          </button>
        </div>
      </div>
    </footer>
  );
}
