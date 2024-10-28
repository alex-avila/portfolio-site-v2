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
      <h1 className="text-lg font-bold tracking-wide text-garden-content-loud dark:text-forest-content-loud">
        Alex Avila
      </h1>
      <p className="text-sm text-garden-content dark:text-forest-content">Frontend Engineer</p>
      <div className="mt-8 space-y-3">
        <p className="text-sm text-garden-content dark:text-forest-content">
          I'm a developer based in Denver, CO with 6+ years of experience in building for the web.
        </p>
        <p className="text-sm text-garden-content dark:text-forest-content">
          I specialize in frontend development and aim to build beautiful, functional, & accessible user interfaces. My
          expertise includes implementing changes on the backend, setting up deployment processes, creating
          pixel-perfect user interfaces & web performance optimization.
        </p>

        <ul className="mt-5 flex flex-col gap-y-3">
          {links.map(link => (
            <li key={link.href} className="flex items-center gap-x-2.5">
              {/* TODO: add a 'copy' button so visitors can copy the email address instead */}
              <span className="sr-only">{link.iconLabel}</span>
              <IconContext.Provider value={{ className: "size-3.5 shrink-0", size: "24" }}>
                {link.icon}
              </IconContext.Provider>
              <a
                className="text-[13px] text-garden-content-quiet underline transition-[color,text-decoration-thickness] hover:text-garden-accent-2 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-forest-content-quiet dark:hover:text-forest-accent"
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
