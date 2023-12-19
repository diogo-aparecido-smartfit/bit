import { MdKeyboardArrowRight } from "react-icons/md";
import { getPosts } from "../services/api";

export default async function PostsList() {
  const data = await getPosts();

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  function calculateReadingTime(body: string) {
    const wordsPerMinute = 200;
    const wordCount = body.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return readingTimeMinutes;
  }

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
              className="flex gap-1 limited-body"
              dangerouslySetInnerHTML={{
                __html: post.body.split(" ").slice(0, 10).join("\n"),
              }}
            ></div>
            <div className="gradient-overlay"></div>
          </div>
          <button className="flex items-center gap-2 text-white font-semibold hover:text-primaryColor transition-all duration-300 text-base md:text-lg group w-fit">
            Read More
            <span className="flex items-center group-hover:translate-x-1 transition-all duration-300">
              <MdKeyboardArrowRight />
            </span>
          </button>
        </article>
      ))}
    </ul>
  ) : null;
}
