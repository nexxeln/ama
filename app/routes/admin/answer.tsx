import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUnansweredQuestions } from "~/question.server";
import { getSession } from "~/session.server";

type LoaderData = Awaited<ReturnType<typeof getUnansweredQuestions>>;

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("loggedIn") !== "true") {
    return redirect("/admin");
  }

  const questions = await getUnansweredQuestions();

  return json<LoaderData>(questions);
};

export default function Answer() {
  const questions = useLoaderData() as LoaderData;
  return (
    <div className="flex flex-col gap-2">
      {questions.map((question, index) => {
        return (
          <div key={index} className="flex flex-col">
            <h2 className="text-sky-400">{question.question}</h2>
            <p className="text-sky-200">- {question.name}</p>
          </div>
        );
      })}
    </div>
  );
}
