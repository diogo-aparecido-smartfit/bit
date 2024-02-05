"use client";
import { pid } from "process";
import { useEffect, useState } from "react";

import { Post } from "../page";
import { getPostBySlug } from "@/app/services/api";
import { useSearchParams } from "next/navigation";
import { formatDate } from "../utils/formDate";
import { calculateReadingTime } from "../utils/calculateReadingTime";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Post() {
  const searchParams = useSearchParams();
  const search = searchParams.get("read");

  const [post, setPost] = useState<Post>({
    id: Number(pid),
    title: "",
    slug: "",
    body: "",
    author: "",
    postDate: "",
    tags: [],
  });

  useEffect(() => {
    getPostBySlug(search)
      .then((post) => {
        setPost(post);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [search]);

  return (
    <div className="flex flex-col p-6 lg:p-0 items-start min-h-screen mx-4 my-12 lg:mx-48 lg:my-36 xl:mx-52 xl:max-w-screen-lg md:max-w-screen-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-white font-semibold hover:text-primaryColor transition-all duration-300 text-base md:text-lg group w-fit mb-8"
      >
        <span className="flex items-center group-hover:-translate-x-1 transition-all duration-300">
          <MdKeyboardArrowLeft />
        </span>
        Back to home
      </Link>
      <div className="flex flex-col gap-2 mb-14">
        <h1 className="text-2xl sm:text-4xl font-bold">{post.title}</h1>
        <p className="text-lg font-semibold">- {post.author}</p>
        <span className="text-seccondaryText text-lg">
          <p className="text-sm md:text-base">
            {formatDate(post.postDate)} • {calculateReadingTime(post.body)}{" "}
            minutes
          </p>
        </span>
      </div>
      <div
        className="flex flex-col gap-2 text-base sm:text-xl post"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </div>
  );
}
