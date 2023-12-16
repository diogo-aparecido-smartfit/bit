interface SubscribeProps {}

export default function Subscribe({}: SubscribeProps) {
  return (
    <div className="flex flex-col w-full max-w-fit py-7 px-6 rounded-xl border-[1px] border-zinc-800">
      <div className="flex flex-col gap-1 mb-6">
        <h3 className="font-medium">Don&apos;t Miss Out</h3>
        <p className="text-seccondaryText">
          Monthly updates, no spam. Unsubscribe any time
        </p>
      </div>

      <form className="flex flex-col sm:flex-row gap-2">
        <input
          className="px-3 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 outline-none focus:border-zinc-600 transition-all duration-300 placeholder:text-seccondaryText w-full"
          type="text"
          placeholder="diogo@amv.me"
        />
        <button
          className="px-4 py-2 bg-elementsBg rounded-md border-[1px] border-zinc-800 font-medium hover:brightness-125 transition-all duration-300"
          type="submit"
        >
          Join
        </button>
      </form>
    </div>
  );
}
