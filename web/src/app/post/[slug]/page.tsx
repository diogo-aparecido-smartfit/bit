"use client";
import { pid } from "process";
import { useEffect, useState } from "react";

import { Post } from "../../page";
import { getPostById } from "@/app/services/api";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

export default function Post() {
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

  useEffect(() => {
    getPostById(pid)
      .then((post) => {
        setPost(post);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [pid]);

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
}
