import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createQuestion } from "~/question.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const question = formData.get("question");

  await createQuestion({ name, question });

  return new Response(null);
};

const inputStyles =
  "px-4 py-2 border-2 rounded-md bg-zinc-800 focus:outline-none border-zinc-800 focus:ring-2 focus:ring-sky-300";

export default function Ask() {
  return (
    <Form method="post">
      <main className="mt-8 text-sky-100">
        <h1 className="text-2xl">Ask</h1>

        <div className="mb-2" />
        <div className="flex flex-col">
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Your Name"
            className={inputStyles}
          />
          <div className="mt-3" />
          <textarea
            id="question"
            name="question"
            required
            placeholder="Your Question"
            cols={30}
            rows={10}
            minLength={10}
            maxLength={150}
            className={inputStyles}
          />

          <div className="mt-4" />
          <button
            type="submit"
            className="flex items-center justify-center w-20 px-4 py-2 transition-all duration-300 rounded-md bg-sky-700 bg-opacity-30 hover:bg-opacity-75"
          >
            Submit
          </button>
        </div>
      </main>
    </Form>
  );
}
