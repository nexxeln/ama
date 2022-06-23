import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { answerQuestion, getQuestionById } from "~/question.server";
import { getSession } from "~/session.server";

type LoaderData = Awaited<ReturnType<typeof getQuestionById>>;

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("loggedIn") !== "true") {
    return redirect("/admin");
  }

  invariant(params.id, "id is required");

  const question = await getQuestionById(params.id);

  if (question) {
    return json<LoaderData>(question);
  } else {
    // TODO: return error
  }
};

type ActionData =
  | {
      answer: string | null;
    }
  | undefined;

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const answer = formData.get("answer");

  const errors: ActionData = { answer: answer ? null : "Answer is required" };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(params.id, "id is required");
  invariant(typeof answer === "string", "question must be a string");

  await answerQuestion(params.id, answer);

  return redirect("/");
};

export default function Answer() {
  const question = useLoaderData() as LoaderData;
  const errors = useActionData() as ActionData;

  return (
    <Form
      method="post"
      className="flex flex-col items-center mt-6 text-sky-100"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-xl text-sky-400">{question?.question}</h1>
        <p className="text-lg text-sky-200">- {question?.name}</p>
      </div>
      <div className="mt-2" />

      <p className="text-red-500">{errors?.answer}</p>
      <textarea
        id="answer"
        name="answer"
        placeholder="Write your answer here"
        cols={30}
        rows={10}
        className="input"
      />

      <div className="mt-2" />
      <button
        type="submit"
        className="flex items-center justify-center w-24 px-4 py-2 transition-all duration-300 rounded-md bg-sky-700 bg-opacity-30 hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
      >
        Submit
      </button>
    </Form>
  );
}
