import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getQuestions } from "~/question.server";

type LoaderData = Awaited<ReturnType<typeof getQuestions>>;

export const loader: LoaderFunction = async () => {
  const questions = await getQuestions({ getAnswered: true });

  return json<LoaderData>(questions);
};

export default function Index() {
  const questions = useLoaderData() as LoaderData;

  console.log(questions);

  return (
    <main className="w-3/4 mx-auto mt-8 md:w-2/5 text-sky-100">
      {questions.map((question, index) => (
        <div key={index}>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl text-sky-500">{question.question}</p>
            <p className="text-sm text-sky-200">{`- ${question.name}`}</p>
          </div>
          <p>{question.answer}</p>
          <div className="mb-4" />
        </div>
      ))}
    </main>
  );
}
