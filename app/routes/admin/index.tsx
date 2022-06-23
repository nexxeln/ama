import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { commitSession, createUserSession, getSession } from "~/session.server";

type ActionData =
  | {
      password: string | null;
    }
  | undefined;

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("loggedIn") === "true") {
    return redirect("/admin/answer");
  }

  return new Response(null);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const password = formData.get("password");

  if (!password) {
    return json<ActionData>({ password: "Password is required" });
  } else if (password === process.env.ADMIN_PASSWORD) {
    const session = await createUserSession();

    return redirect("/admin/answer", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } else {
    return json<ActionData>({ password: "Invalid password" });
  }
};

export default function Admin() {
  const errors = useActionData() as ActionData;
  return (
    <Form method="post">
      <div className="mt-6" />
      <h1 className="text-2xl text-sky-400">Admin 😱</h1>

      <div className="mt-3" />
      <div className="flex flex-col text-sky-100">
        <p className="text-red-500">{errors?.password}</p>
        <div className="mb-1" />

        <input
          name="password"
          type="password"
          placeholder="👀"
          className="input"
        />
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
