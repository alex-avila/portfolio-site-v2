import { IconContext } from "react-icons";
import { CiCloudMoon, CiSun } from "react-icons/ci";
import {
  SiTypescript as TypescriptIcon,
  SiReact as ReactIcon,
  SiTailwindcss as TailwindIcon,
  SiVite as ViteIcon,
} from "react-icons/si";
import Link from "./Link";

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
      <div className="border-t border-garden-content-quiet-2 py-6 dark:border-forest-content-quiet-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs text-garden-content dark:text-forest-content">© 2024 Alex Avila</p>
          </div>

          <ul className="flex flex-wrap items-center">
            {links.map(link => (
              <div
                key={link.label}
                className="relative inline-block pe-4 text-xs before:absolute before:end-1.5 before:top-[calc(50%+1px)] before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gray-400 last:pe-0 last-of-type:before:hidden dark:text-forest-content-quiet dark:before:bg-neutral-600"
              >
                <Link href={link.href} isExternal>
                  {link.label}
                </Link>
              </div>
            ))}

            <li className="inline-block">
              <button
                type="button"
                className="relative flex size-7 items-center justify-center rounded-full border border-garden-content-quiet-2 text-garden-content-quiet transition-colors hover:bg-garden-content-quiet-2 focus:bg-garden-content-quiet-2 focus:outline-none dark:hidden dark:border-forest-content-quiet-2 dark:text-forest-content dark:hover:bg-forest-content-quiet-2 dark:focus:bg-forest-content-quiet-2"
                onClick={() => onToggleTheme()}
              >
                <span className="sr-only">Dark</span>
                <IconContext.Provider value={{ className: "size-4 shrink-0", size: "32" }}>
                  <CiCloudMoon />
                </IconContext.Provider>
              </button>
              <button
                type="button"
                className="relative hidden size-7 items-center justify-center rounded-full border border-garden-content-quiet-2 text-garden-content-quiet transition-colors hover:bg-garden-content-quiet-2 focus:bg-garden-content-quiet-2 focus:outline-none dark:flex dark:border-forest-content-quiet-2 dark:text-forest-content dark:hover:bg-forest-content-quiet-2 dark:focus:bg-forest-content-quiet-2"
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

        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-1 text-right text-xs text-garden-content-quiet dark:text-forest-content-quiet">
          <IconContext.Provider value={{ className: "inline-block size-2.5", size: "10" }}>
            Built with <ReactIcon /> React, <TailwindIcon /> Tailwind CSS, <TypescriptIcon /> TypeScript & <ViteIcon />{" "}
            Vite
          </IconContext.Provider>
          <span>
            (
            <Link href="https://github.com/alex-avila/portfolio-site-v2" isExternal>
              source code
            </Link>
            )
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
