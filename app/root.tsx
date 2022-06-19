import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "nexxel • ama",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex flex-col items-center justify-center">
          <div className="mt-4" />
          <h1 className="text-sky-300 text-2xl text-center">nexxel • ama</h1>

          <div className="mt-6" />
          <nav>
            <ul className="flex gap-6 justify-center text-sky-200">
              <li>
                <Link
                  to="/"
                  className="hover:text-sky-100 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ask"
                  className="hover:text-sky-100 transition-colors duration-300"
                >
                  Ask
                </Link>
              </li>
            </ul>
          </nav>

          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
