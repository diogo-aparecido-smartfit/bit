"use client";

import { Tooltip } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { FiGithub } from "react-icons/fi";

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

    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="flex text-seccondaryText">
      <div className="flex w-full h-fit border-t-[1px] border-zinc-800 p-4 justify-between sm:justify-around items-center">
        <div>
          <p className="hidden sm:flex">
            {currentTime
              ? currentTime?.toLocaleString()
              : "00/00/0000, 0:00 AM"}
          </p>
        </div>

        <h3 className="absolute justify-center">bit technologies</h3>
        <div className="flex items-center gap-3">
          <Tooltip content="Open GitHub Repository">
            <a
              href="https://github.com/DiogoAMV/bit"
              target="_blank"
              className="text-lg rounded-xl border-[1px] border-zinc-800 p-2 hover:bg-primaryColor hover:text-zinc-800 hover:border-elementsBg transition-all duration-300"
            >
              <FiGithub />
            </a>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
}
