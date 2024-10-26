import { IconContext } from "react-icons";
import { CiCloudMoon, CiSun } from "react-icons/ci";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/alex-avila",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alex-avilx/",
  },
];

function Footer({ onToggleTheme }: { onToggleTheme: () => void }) {
  return (
    <footer className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 py-6 dark:border-neutral-700">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs text-gray-600 dark:text-neutral-400">© 2024 Alex Avila</p>
          </div>

          <ul className="flex flex-wrap items-center">
            {links.map(link => (
              <div
                key={link.label}
                className="relative inline-block pe-4 text-xs before:absolute before:end-1.5 before:top-1/2 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gray-400 last:pe-0 last-of-type:before:hidden dark:text-neutral-500 dark:before:bg-neutral-600"
              >
                <a
                  className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400"
                  href={link.href}
                  target="_blank"
                >
                  {link.label}
                </a>
              </div>
            ))}

            <li className="inline-block">
              <button
                type="button"
                className="relative flex size-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none dark:hidden dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                onClick={() => onToggleTheme()}
              >
                <span className="sr-only">Dark</span>
                <IconContext.Provider value={{ className: "size-4 shrink-0", size: "32" }}>
                  <CiCloudMoon />
                </IconContext.Provider>
              </button>
              <button
                type="button"
                className="relative hidden size-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none dark:flex dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                onClick={() => onToggleTheme()}
              >
                <span className="sr-only">Light</span>
                <IconContext.Provider value={{ className: "size-4 shrink-0", size: "32" }}>
                  <CiSun />
                </IconContext.Provider>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
