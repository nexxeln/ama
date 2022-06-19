import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
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
    </main>
  );
}
