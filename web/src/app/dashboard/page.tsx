"use client";

import Link from "next/link";
import { deletePost, getDynamicPosts } from "../services/api";
import { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Button from "../components/Button";
import { LuTrash } from "react-icons/lu";
import { BiEdit } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { Post } from "../page";
import { useRouter } from "next/navigation";
import { calculateReadingTime } from "../utils/calculateReadingTime";
import { formatDate } from "../utils/formDate";
import { handleLogout } from "../utils/handleLogout";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>();
  const [refreshList, setRefreshList] = useState(0);

  useEffect(() => {
    // const checkAndupdateStatus = async () => {
    //   const result = await isAuthenticated().catch();
    //   if (result === true) {
    //     setIsLogged(true);
    //   }
    // };

    const getData = async () => {
      const data = await getDynamicPosts();
      setPosts(data);
    };

    // checkAndupdateStatus();
    getData();
  }, [refreshList]);

  const handleDeletePost = async (id: string | number) => {
    try {
      const result = await deletePost(id).catch();

      setIsLoading(true);

      if (result?.sucess) {
        setRefreshList(refreshList + 1);

        const notify = () =>
          toast.success("Post successfully deleted!", {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#161616",
              color: "#fdfdfc",
            },
          });
        notify();
        setIsLoading(false);
      } else {
        const notify = () =>
          toast.error("Error deleting post. Check the console!", {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#161616",
              color: "#fdfdfc",
            },
          });
        notify();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex flex-col items-center my-40 w-full min-h-screen">
      <div className="flex flex-col gap-2 w-full items-center max-w-lg">
        <div className="flex items-center w-full justify-between">
          <Button type="button" onClick={() => handleLogout()}>
            <IoIosLogOut />
          </Button>
          <h1 className="text-3xl font-semibold mb-2">Posts List</h1>
          <Link
            className="px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:bg-primaryColor hover:border-elementsBg hover:text-elementsBg transition-all duration-500 ease-in-out flex flex-col items-center"
            href="/dashboard/posts"
          >
            <IoCreate />
          </Link>
        </div>
        {posts ? (
          <ul className="flex flex-col gap-14 mt-10 w-full">
            {posts.map((post, i) => (
              <article
                className="flex justify-between gap-1 text-seccondaryText post-card "
                key={i}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm md:text-base">
                    {formatDate(post.postDate)} •{" "}
                    {calculateReadingTime(post.body)} minutes • ID: {post.id}
                  </p>
                  <h1 className="font-semibold text-zinc-100 text-base md:text-lg">
                    {post.title}
                  </h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Link
                    className="px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:bg-primaryColor hover:border-elementsBg hover:text-elementsBg transition-all duration-500 ease-in-out flex flex-col items-center"
                    href={{
                      pathname: "/dashboard/edit",
                      query: { edit: post.slug },
                    }}
                  >
                    <BiEdit />
                  </Link>
                  <Button
                    isLoading={isLoading}
                    onClick={() => handleDeletePost(post.id!)}
                    type="button"
                  >
                    <LuTrash />
                  </Button>
                </div>
              </article>
            ))}
          </ul>
        ) : (
          <p>There are no posts to display.</p>
        )}
      </div>
      <Toaster />
    </div>
  );
}
