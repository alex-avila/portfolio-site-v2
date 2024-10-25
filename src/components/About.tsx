import { IconContext } from "react-icons";
import { CiMail, CiLinkedin } from "react-icons/ci";

const links = [
  {
    label: "alex.avila.09@outlook.com",
    href: "mailto:alex.avila.09@outlook.com",
    icon: <CiMail />,
    iconLabel: "email",
  },
  {
    label: "@alex-avilx",
    href: "https://www.linkedin.com/in/alex-avilx/",
    icon: <CiLinkedin />,
    iconLabel: "LinkedIn",
  },
];

function About() {
  return (
    <div>
      <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
        Alex Avila
      </h1>
      <p className="text-sm text-gray-600 dark:text-neutral-400">
        Web Developer
      </p>
      {/* TODO: rewrite this to be better */}
      <div className="mt-8">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          I'm a web developer with 6+ years of experience in building for the
          web. Specializing in frontend development and passionate about
          building beautiful, functional, accessible user interfaces.
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
          My expertise includes implementing changes on the backend, setting up
          deployment processes, creating pixel-perfect user interfaces and web
          performance optimization. Helping clients bring their visions to life.
        </p>

        <ul className="mt-5 flex flex-col gap-y-3">
          {links.map((link) => (
            <li key={link.href} className="flex items-center gap-x-2.5">
              {/* TODO: add a 'copy' button so visitors can copy the email address instead */}
              <span className="sr-only">{link.iconLabel}</span>
              <IconContext.Provider
                value={{ className: "size-3.5 shrink-0", size: "24" }}
              >
                {link.icon}
              </IconContext.Provider>
              <a
                className="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400"
                href={link.href}
                target="_blank"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;
