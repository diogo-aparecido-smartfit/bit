"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { editPost, getPostById } from "@/app/services/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { IoChevronBackOutline, IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Post } from "@/app/page";
import { isAuthenticated } from "@/app/services/auth";
import { handleLogout } from "@/app/utils/handleLogout";
import { CgMaximizeAlt } from "react-icons/cg";

export default function Post() {
  const { push } = useRouter();
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useParams();
  const pid = router.slug.toString();
  const [post, setPost] = useState<Post>({
    id: Number(pid),
    title: "",
    body: "",
    author: "",
    postDate: "",
    tags: [],
  });

  document.querySelector(".ql-editor")?.addEventListener("focus", function () {
    document.querySelector(".quill")?.classList.add("border-primaryColor");
    document.querySelector(".quill")?.classList.remove("border-zinc-800");
  });

  document.querySelector(".ql-editor")?.addEventListener("blur", function () {
    document.querySelector(".quill")?.classList.remove("border-primaryColor");
    document.querySelector(".quill")?.classList.add("border-zinc-800");
  });

  useEffect(() => {
    const checkAndupdateStatus = async () => {
      const result = await isAuthenticated().catch();
      if (result === true) {
        setIsLogged(true);
      }
    };

    checkAndupdateStatus();
  }, []);

  useEffect(() => {
    getPostById(pid)
      .then((post) => {
        setPost(post);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [pid]);

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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const tagsArray = e.target.value.split(",");
      setPost((prevPost) => ({
        ...prevPost,
        tags: tagsArray,
      }));
    } else {
      setPost((prevPost) => ({ ...prevPost, [name]: value }));
    }
  };

  const handleQuillChange = (value: string) => {
    setPost((prevPost) => ({
      ...prevPost,
      body: value,
    }));
  };

  const handleMaximizeEditor = () => {
    setIsMaximized(!isMaximized);

    if (isMaximized) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    setPost((prevPost) => ({
      ...prevPost,
      postDate: new Date().toISOString(),
    }));
    console.log(post);
    const result = await editPost(
      Number(pid),
      post.title,
      post.body,
      post.tags,
      post.author,
      post.postDate
    ).catch();

    if (result?.sucess) {
      const notify = () =>
        toast.success("Post updated successfully!", {
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
        toast.error("Error editing post!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#161616",
            color: "#fdfdfc",
          },
        });
      notify();
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {isLogged ? (
        <>
          {isMaximized && (
            <>
              <div className="flex flex-col absolute justify-center w-full h-full p-10">
                <ReactQuill
                  modules={modules}
                  placeholder="Here you can edit the post content. Select the entered text for more options."
                  className="bg-elementsBg rounded-md border-[1px] border-zinc-800 transition-all duration-300 h-full z-10"
                  theme="bubble"
                  value={post.body}
                  onChange={handleQuillChange}
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
              <h1 className="text-3xl font-semibold mb-2">Edit post</h1>
              <Link
                className="px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:bg-primaryColor hover:border-elementsBg hover:text-elementsBg transition-all duration-500 ease-in-out flex flex-col items-center justify-center"
                href="/dashboard"
              >
                <IoChevronBackOutline />
              </Link>
            </div>
            <Input
              value={post.title}
              onChange={handleInputChange}
              name="title"
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
                value={post.body}
                onChange={handleQuillChange}
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
              value={post.tags.join(",")}
              onChange={handleInputChange}
              placeholder={`Post tags (Please separate the tags by "," without spaces.)`}
              type="text"
              name="tags"
              required
            />
            <Input
              value={post.author}
              onChange={handleInputChange}
              placeholder="Post author"
              type="text"
              name="author"
              required
            />

            <Button
              isLoading={isLoading}
              onClick={() => handleSave()}
              type="button"
              className="mt-10"
            >
              Save Post
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <p className="text-seccondaryText text-center">
            Only administrators are allowed to visit this page.
          </p>
          <Link
            className="mt-4 font-medium hover:text-primaryColor transition-all duration-500 ease-in-out flex flex-col items-center"
            href="/"
          >
            Back to home
          </Link>
        </div>
      )}
      <Toaster />
    </div>
  );
}
