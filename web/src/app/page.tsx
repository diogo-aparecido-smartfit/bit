import Subscribe from "./components/Subscribe";

export default function Home() {
  return (
    <main className="flex flex-col items-center lg:items-start h-full mx-4 my-12 lg:mx-48 lg:my-36 mb-auto">
      <h1 className="flex text-center text-2xl font-semibold mb-4 lg:text-left lg:text-6xl lg:mb-12 xl:text-8xl">
        Digital dreams, <br />
        real impact.
      </h1>
      <Subscribe />
    </main>
  );
}
