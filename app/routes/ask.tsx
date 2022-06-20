export default function Ask() {
  return (
    <main className="mt-8 text-sky-100">
      <h1 className="text-2xl">Ask</h1>

      <div className="mb-1" />
      <form action="" className="flex flex-col">
        <input
          type="text"
          placeholder="Your Name"
          className="px-4 py-2 border-2 rounded-md bg-zinc-800 focus:outline-none border-zinc-800 focus:ring-2 focus:ring-sky-300"
        />
        <div className="mt-4" />
        <textarea
          placeholder="Your Question"
          cols={30}
          rows={10}
          minLength={10}
          maxLength={150}
          className="px-4 py-2 border-2 rounded-md bg-zinc-800 focus:outline-none border-zinc-800 focus:ring-2 focus:ring-sky-300"
        />
      </form>
    </main>
  );
}
