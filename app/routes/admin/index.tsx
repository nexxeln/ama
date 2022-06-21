import { Form } from "@remix-run/react";

export default function Admin() {
  return (
    <Form method="post">
      <div className="mt-6" />
      <h1 className="text-2xl text-sky-400">Admin 😱</h1>

      <div className="mt-3" />
      <div className="flex flex-col text-sky-100">
        <p>Enter password</p>
        <div className="mb-1" />

        <input type="text" placeholder="👀" className="input" />
        <div className="mb-3" />

        <button
          type="submit"
          className="flex items-center justify-center w-20 px-4 py-2 text-sm transition-all duration-300 rounded-md bg-sky-700 bg-opacity-30 hover:bg-opacity-75"
        >
          Submit
        </button>
      </div>
    </Form>
  );
}
