import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("loggedIn") !== "true") {
    return redirect("/admin");
  }

  return new Response(null);
};

export default function Answer() {
  return <div>hi</div>;
}
