import { MdKeyboardArrowRight } from "react-icons/md";
import { getStaticPosts } from "../services/api";
import { formatDate } from "../utils/formDate";
import { calculateReadingTime } from "../utils/calculateReadingTime";
import Link from "next/link";

export default async function PostsList() {
  const data = await getStaticPosts();

  return data ? (
    <ul className="flex flex-col gap-14">
      {data.map((post, i) => (
        <article
          id="article"
          className="flex flex-col gap-1 text-seccondaryText post-card"
          key={i}
        >
          <p className="text-sm md:text-base">
            {formatDate(post.postDate)} • {calculateReadingTime(post.body)}{" "}
            minutes
          </p>
          <h1 className="font-semibold text-zinc-100 text-base md:text-lg">
            {post.title}
          </h1>
          <div className="text-base md:text-lg">
            <div
              id="body"
              className="flex gap-1 limited-body whitespace-nowrap"
              dangerouslySetInnerHTML={{
                __html: post.body.split(" ").slice(0, 10).join("\n"),
              }}
            ></div>
            <div className="gradient-overlay"></div>
          </div>
          <Link
            href={{
              pathname: "/post",
              query: { read: post.slug },
            }}
            className="flex items-center gap-2 text-white font-semibold hover:text-primaryColor transition-all duration-300 text-base md:text-lg group w-fit"
          >
            Read More
            <span className="flex items-center group-hover:translate-x-1 transition-all duration-300">
              <MdKeyboardArrowRight />
            </span>
          </Link>
        </article>
      ))}
    </ul>
  ) : null;
}
