"use client";

import "react-quill/dist/quill.bubble.css";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import ReactQuill from "react-quill";
import { IoIosLogOut } from "react-icons/io";
import { createPost } from "../../services/api";
import { IoChevronBackOutline, IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { handleLogout } from "@/app/utils/handleLogout";
import { useRouter } from "next/navigation";
import { CgMaximizeAlt } from "react-icons/cg";

export default function Posts() {
  const { push } = useRouter();
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([""]);
  const [author, setAuthor] = useState("");
  const [postDate, setPostDate] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  document.querySelector(".ql-editor")?.addEventListener("focus", function () {
    document.querySelector(".quill")?.classList.add("border-primaryColor");
    document.querySelector(".quill")?.classList.remove("border-zinc-800");
  });

  document.querySelector(".ql-editor")?.addEventListener("blur", function () {
    document.querySelector(".quill")?.classList.remove("border-primaryColor");
    document.querySelector(".quill")?.classList.add("border-zinc-800");
  });

  const handleMaximizeEditor = () => {
    setIsMaximized(!isMaximized);

    if (isMaximized) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCreatePost = async () => {
    if (!body || !title || !author) {
      const notify = () =>
        toast.error(`There are empty fields!`, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#161616",
            color: "#fdfdfc",
          },
        });
      notify();
      return;
    }

    setIsLoading(true);

    setPostDate(new Date().toISOString());
    const result = await createPost(title, body, tags, author, postDate).catch(
      () => {
        const notify = () =>
          toast.error(`Error: ${result?.message}`, {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#161616",
              color: "#fdfdfc",
            },
          });
        notify();
      }
    );

    if (result?.sucess) {
      const notify = () =>
        toast.success("Post created successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#161616",
            color: "#fdfdfc",
          },
        });
      notify();
      push("/dashboard");
    } else {
      const notify = () =>
        toast.error(`Error: ${result?.message}`, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#161616",
            color: "#fdfdfc",
          },
        });
      notify();
      console.log(result?.status);
      console.log(result?.message);
      console.log(result?.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <>
        {isMaximized && (
          <>
            <div className="flex flex-col absolute justify-center w-full h-full p-10">
              <ReactQuill
                modules={modules}
                placeholder="Here you can edit the post content. Select the entered text for more options."
                className="bg-elementsBg rounded-md border-[1px] border-zinc-800 transition-all duration-300 h-full z-10"
                theme="bubble"
                value={body}
                onChange={setBody}
              />
              <div className="flex relative">
                <Button
                  className="absolute py-4 bottom-0 right-0 mr-2 mb-2 z-20"
                  type="button"
                  onClick={() => handleMaximizeEditor()}
                >
                  <IoClose />
                </Button>
              </div>
            </div>
            <div
              onClick={() => handleMaximizeEditor()}
              className="absolute w-screen h-full bg-black/70"
            ></div>
          </>
        )}
        <div className="flex flex-col gap-2 w-full max-w-lg p-4 sm:p-0">
          <div className="flex w-full items-center justify-between mb-10">
            <Button type="button" onClick={() => handleLogout()}>
              <IoIosLogOut />
            </Button>
            <h1 className="text-3xl font-semibold mb-2">Create post</h1>
            <Link
              className="px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:bg-primaryColor hover:border-elementsBg hover:text-elementsBg transition-all duration-500 ease-in-out flex flex-col items-center justify-center"
              href="/dashboard"
            >
              <IoChevronBackOutline />
            </Link>
          </div>
          <Input
            value={title}
            onChange={(e: any) =>
              setTitle((e.target as HTMLInputElement).value)
            }
            placeholder="Post title"
            type="text"
            required
          />
          <div className="flex flex-col">
            <ReactQuill
              modules={modules}
              placeholder="Here you can edit the post content. Select the entered text for more options."
              className="bg-elementsBg rounded-md border-[1px] border-zinc-800 transition-all duration-300 h-72 max-h-72"
              theme="bubble"
              value={body}
              onChange={setBody}
            />
            <div className="flex relative">
              <Button
                className="absolute bottom-0 right-0 mr-2 mb-2"
                type="button"
                onClick={() => handleMaximizeEditor()}
              >
                <CgMaximizeAlt />
              </Button>
            </div>
          </div>
          <Input
            value={tags.join(",")}
            onChange={(e) => setTags(e.target.value.split(","))}
            placeholder={`Post tags (Please separate the tags by "," without spaces.)`}
            type="text"
            required
          />
          <Input
            value={author}
            onChange={(e: any) =>
              setAuthor((e.target as HTMLInputElement).value)
            }
            placeholder="Post author"
            type="text"
            required
          />

          <Button
            isLoading={isLoading}
            type="button"
            onClick={() => handleCreatePost()}
            className="mt-10"
          >
            Create Post
          </Button>
        </div>
      </>
      <Toaster />
    </div>
  );
}
