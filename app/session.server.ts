import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      secrets: [process.env.SESSION_SECRET!],
    },
  });

const createUserSession = async () => {
  const session = await getSession();

  session.set("loggedIn", "true");

  return session;
};

export { getSession, commitSession, destroySession, createUserSession };
