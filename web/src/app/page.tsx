import PostsList from "./components/PostsList";
import Subscribe from "./components/Subscribe";
import Tip from "./components/Tip";

export interface Post {
  id: string | number;
  title: string;
  body: string;
  tags: string[];
  author: string;
  postDate: string;
}

export default function Home() {
  return (
    <main className="flex flex-col items-start min-h-screen mx-4 my-12 lg:mx-48 lg:my-36 xl:mx-52 xl:max-w-screen-lg md:max-w-screen-sm">
      <div className="flex flex-col sm:flex-row w-full justify-between sm:items-center mb-10 gap-3 sm:gap-0">
        <h1 className="flex text-4xl font-semibold text-left lg:text-6xl lg:mb-12 xl:text-8xl">
          Digital dreams, <br />
          real impact.
        </h1>
        <Tip />
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-between w-full gap-24 xl:gap-0">
        <PostsList />
        <Subscribe />
      </div>
    </main>
  );
}
