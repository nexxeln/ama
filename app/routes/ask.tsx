import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createQuestion } from "~/question.server";

type ActionData =
  | {
      name: string | null;
      question: string | null;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const question = formData.get("question");

  const errors: ActionData = {
    name: name ? null : "Name is required",
    question: question ? null : "Question is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof name === "string", "name must be a string");
  invariant(typeof question === "string", "question must be a string");

  await createQuestion({ name, question });

  return redirect("/");
};

export default function Ask() {
  const errors = useActionData() as ActionData;

  const transition = useTransition();
  const loading = Boolean(transition.submission);

  return (
    <Form method="post">
      <main className="mt-8 text-sky-100">
        <h1 className="text-2xl">Ask</h1>

        <div className="mb-2" />
        <div className="flex flex-col">
          {errors?.name ? (
            <span className="text-sm text-red-500">{errors.name}</span>
          ) : null}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className="input"
          />
          <div className="mt-3" />
          {errors?.question ? (
            <span className="text-sm text-red-500">{errors.question}</span>
          ) : null}
          <textarea
            id="question"
            name="question"
            placeholder="Your Question"
            cols={30}
            rows={10}
            minLength={10}
            maxLength={150}
            className="input"
          />

          <div className="mt-4" />
          <button
            type="submit"
            className="flex items-center justify-center w-24 px-4 py-2 transition-all duration-300 rounded-md bg-sky-700 bg-opacity-30 hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Ask"}
          </button>
        </div>
      </main>
    </Form>
  );
}
