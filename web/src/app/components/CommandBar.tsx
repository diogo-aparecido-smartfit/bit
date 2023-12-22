"use client";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import { ReactNode } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import Kbd from "./Kbd";

interface CommandBarProps {
  children: ReactNode;
}

export default function CommandBar({ children }: CommandBarProps) {
  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home início",
      section: "GENERAL",
      perform: () => (window.location.pathname = "/"),
      icon: <HiOutlineHome />,
    },
    {
      id: "login",
      name: "Login",
      shortcut: ["c"],
      keywords: "login auth admin",
      section: "GENERAL",
      perform: () => (window.location.pathname = "/login"),
      icon: <IoLogInOutline />,
    },
    {
      id: "subscribe",
      name: "Subscribe",
      shortcut: ["S"],
      keywords: "subscriber subscribe",
      section: "GENERAL",
      perform: () => (window.location.pathname = "/"),
      icon: <IoMdNotificationsOutline />,
    },
    {
      id: "github",
      name: "GitHub",
      shortcut: ["g"],
      keywords: "github",
      section: "SOCIAL",
      perform: () => (window.location.pathname = "/"),
      icon: <FiGithub />,
    },
    {
      id: "linkedin",
      name: "Linkedin",
      shortcut: ["l"],
      keywords: "linkedin",
      section: "SOCIAL",
      perform: () => (window.location.pathname = "/"),
      icon: <FaLinkedinIn />,
    },
  ];

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="fixed flex items-start justify-center w-full inset-0 pt-[14vh] px-4 pb-4 bg-black/90">
            <KBarAnimator className="bg-transparent backdrop-blur-md w-full max-w-[600px] rounded-lg overflow-hidden">
              <KBarSearch className="py-3 px-4 text-base w-full outline-none border-none m-0 bg-elementsBg/60 placeholder:text-zinc-600" />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>

        {children}
      </KBarProvider>
    </>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="py-2 px-4 text-[10px] uppercase tracking-widest bg-elementsBg/60">
            {item}
          </div>
        ) : (
          <div
            className={`${
              active
                ? "bg-zinc-800 text-white"
                : "bg-elementsBg/60 text-zinc-600"
            } flex items-center gap-2 p-2 cursor-pointer`}
          >
            <span className="text-white text-xl">{item.icon}</span>
            <p className="flex w-full items-center justify-between">
              {item.name}
              {item.shortcut?.map((shortcut, i) => (
                <Kbd key={i}>{shortcut}</Kbd>
              ))}
            </p>
          </div>
        )
      }
    />
  );
}
