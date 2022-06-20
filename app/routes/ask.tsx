export default function Ask() {
  return (
    <main className="mt-8 text-sky-100">
      <h1 className="text-2xl">Ask</h1>

      <div className="mb-2" />
      <form action="" className="flex flex-col">
        <input
          required
          type="text"
          placeholder="Your Name"
          className="px-4 py-2 border-2 rounded-md bg-zinc-800 focus:outline-none border-zinc-800 focus:ring-2 focus:ring-sky-300"
        />
        <div className="mt-3" />
        <textarea
          required
          placeholder="Your Question"
          cols={30}
          rows={10}
          minLength={10}
          maxLength={150}
          className="px-4 py-2 border-2 rounded-md bg-zinc-800 focus:outline-none border-zinc-800 focus:ring-2 focus:ring-sky-300"
        />

        <div className="mt-4" />
        <button
          type="submit"
          className="flex items-center justify-center w-20 px-4 py-2 transition-all duration-300 rounded-md bg-sky-700 bg-opacity-30 hover:bg-opacity-75"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
