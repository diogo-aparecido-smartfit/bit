"use server";

import { Post } from "../page";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL || "";

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${apiUrl}/posts`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const posts = await res.json();

  return posts;
};

export const getPostBySlug = async (postSlug: string | null): Promise<Post> => {
  const res = await fetch(`${apiUrl}/posts/${postSlug}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const post = await res.json();

  return post;
};

export async function createPost(
  title: string,
  body: string,
  tags: string[],
  author: string,
  postDate: string
) {
  const token = cookies().get("jwt")?.value.toString();

  if (!token) {
    return {
      error: {
        message: `Not authenticated!`,
        status: 401,
      },
    };
  }

  const slug = "";

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, slug, tags, author, postDate }),
  };

  try {
    const response = await fetch(`${apiUrl}/posts`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Post created successfully:", data);
    return {
      sucess: true,
      status: 204,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: `Error creating post: (${error.message})`,
        status: 400,
      };
    }
  }
}

export async function deletePost(id: number | string) {
  try {
    const token = cookies().get("jwt")?.value.toString();

    if (!token) {
      return {
        error: {
          message: `Not authenticated!`,
          status: 401,
        },
      };
    }

    const response = await fetch(`${apiUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
      return {
        error: {
          message: `HTTP error! Status: ${response.status}`,
          status: 400,
        },
      };
    }

    console.log("Post successfully deleted!");
    return {
      sucess: {
        status: 204,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        error: {
          message: error.message,
          status: 400,
        },
      };
    }
  }
}

export async function editPost(
  id: number,
  title: string,
  body: string,
  tags: string[],
  author: string,
  postDate: string
) {
  const token = cookies().get("jwt")?.value.toString();

  if (!token) {
    return {
      error: {
        message: `Not authenticated!`,
        status: 401,
      },
    };
  }

  if (!postDate.endsWith("Z")) {
    postDate = `${postDate}Z`;
  }

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, body, tags, author, postDate }),
  };

  try {
    const response = await fetch(`${apiUrl}/posts/${id}`, requestOptions);

    if (response.ok) {
      console.log("Post updated successfully!");
      return {
        sucess: {
          status: response.status,
        },
      };
    } else {
      console.error("Error update post:", response.status, response.statusText);

      return {
        error: {
          status: response.status,
        },
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        error: {
          message: error.message,
          status: 400,
        },
      };
    }
    console.error("Error updating post:", error);
  }
}
