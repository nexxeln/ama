import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getQuestionById } from "~/question.server";
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

export default function Answer() {
  const question = useLoaderData() as LoaderData;

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
      <textarea
        id="answer"
        name="answer"
        placeholder="Write your answer here"
        cols={30}
        rows={10}
        minLength={10}
        maxLength={150}
        className="input"
      />
    </Form>
  );
}
