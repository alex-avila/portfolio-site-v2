import { IconContext } from "react-icons";
import { IoMail, IoLogoLinkedin } from "react-icons/io5";
import AboutLink from "./AboutLink";

const links = [
  {
    label: "alex.avila.09@outlook.com",
    href: "mailto:alex.avila.09@outlook.com",
    icon: <IoMail />,
    iconLabel: "email",
    withCopyButton: true,
  },
  {
    label: "@alex-avilx",
    href: "https://www.linkedin.com/in/alex-avilx/",
    icon: <IoLogoLinkedin />,
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
          <IconContext.Provider value={{ className: "size-3.5 shrink-0", size: "14" }}>
            {links.map(link => (
              <AboutLink
                key={link.label}
                label={link.label}
                href={link.href}
                withCopyButton={link.withCopyButton || false}
              >
                <span className="sr-only">{link.iconLabel}</span>
                {link.icon}
              </AboutLink>
            ))}
          </IconContext.Provider>
        </ul>
      </div>
    </div>
  );
}

export default About;
