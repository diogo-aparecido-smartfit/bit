"use client";

import { MdOutlineNotificationsActive } from "react-icons/md";
import Input from "./Input";
import toast, { Toaster } from "react-hot-toast";

interface SubscribeProps {}

export default function Subscribe({}: SubscribeProps) {
  const handleSubscribe = async (e: any) => {
    const notify = () =>
      toast.success("Registration successful! Thank you for your interest.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#ccccff",
          color: "#161616",
        },
      });

    e.preventDefault();
    return notify();
  };

  return (
    <div className="flex flex-col w-full max-w-fit h-fit py-7 px-6 rounded-xl border-[1px] border-zinc-800">
      <div className="flex flex-col gap-1 mb-6">
        <h3 className="font-medium">Don&apos;t Miss Out</h3>
        <p className="text-seccondaryText">
          Monthly updates, no spam. Unsubscribe any time
        </p>
      </div>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row gap-2"
      >
        <Input required={true} type="email" placeholder="diogo@amv.me" />
        <button
          className="px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:bg-primaryColor hover:border-elementsBg transition-all duration-500 ease-in-out flex flex-col items-center max-h-11 group overflow-hidden"
          type="submit"
        >
          <span className="flex flex-col gap-8 items-center group-hover:-translate-y-[50px] transition-all duration-500 ease-in-out">
            Join
            <span className="text-elementsBg">
              <MdOutlineNotificationsActive />
            </span>
          </span>
        </button>
      </form>
      <Toaster />
    </div>
  );
}
