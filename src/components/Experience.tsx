import { IconContext } from "react-icons";
import { MdWorkOutline } from "react-icons/md";
import anattaLogo from "../assets/anatta-logo.jpeg";

interface ExperienceItem {
  icon: React.ReactNode | string;
  title: string;
  company?: string;
  from: string;
  until: string;
  description?: string;
  highlights?: string[];
  tech?: string[];
}

const experiences: ExperienceItem[] = [
  {
    icon: anattaLogo,
    title: "UI Developer",
    company: "Anatta",
    from: "OCT 2018",
    until: "OCT 2024",
    description:
      "Build for the frontend and backend, implement redesigns, optimize web performance, set up payment integrations and more for a diverse clientele in the e-commerce space. Collaborate with clients including AG1, Molekule, Thesis, Rothy's, Glorious Gaming and Stio. Furthermore, work closely with internally with developers, designers & project managers and lead small teams of developer to work on company-owned codebases.",
    highlights: [
      "Converted designs from Figma and Sketch into accessible, responsive, & interactive UIs",
      "Audited web performance and implemented changes to significantly improve web vitals",
      "Routinely made deployments using GitHub Actions, AWS Elastic Beanstalk and CLI tools",
      "Led teams of 3 to 4 developers to refactor a codebase and to build a new Shopify theme",
      "Wrote documentation for various codebases and processes",
    ],
    tech: [
      "Nuxt",
      "Vue",
      "Tailwind CSS",
      "Node.js",
      "Koa",
      "Shopify",
      "Liquid",
      "webpack",
      "Vite",
      "GitHub Actions",
      "AWS Elastic Beanstalk",
      "AWS Lambda",
      "NestJS",
      "Docker",
    ],
  },
  {
    icon: <MdWorkOutline />,
    title: "Freelance Web Developer",
    from: "JULY 2018",
    until: "SEPT 2018",
    description:
      "Communicate with clients to build and accelerate the development of their web app projects. Utilize different technologies based on the needs of the clients.",
    tech: ["React", "Redux", "Redux Saga", "AWS Elastic Beanstalk"],
  },
];

function Experience() {
  return (
    <div>
      <h2 className="text-garden-content-loud dark:text-forest-content-loud mb-5 flex items-center justify-between gap-x-3 font-medium">
        <span>Experience</span>
        <span className="bg-garden-content-quiet-2 dark:bg-forest-content-quiet-2 relative top-[1.5px] h-px w-full grow" />
        <span className="text-garden-content-quiet-2 dark:text-forest-content-quiet-2 shrink-0">経験</span>
      </h2>

      <div>
        {experiences.map(experience => {
          const title = `${experience.title}${experience.company ? ` at ${experience.company}` : ""}`;
          return (
            <div key={experience.title} className="group relative flex gap-x-5">
              <div className="after:bg-garden-content-quiet-2 after:dark:bg-forest-content-quiet-2 relative after:absolute after:bottom-2 after:start-3 after:top-8 after:w-px after:-translate-x-[0.5px] group-last:after:hidden">
                <div className="relative z-10 flex size-6 items-center justify-center">
                  {typeof experience.icon === "string" ? (
                    <img className="size-6 shrink-0" src={experience.icon} width="32" height="32" />
                  ) : (
                    <IconContext.Provider value={{ className: "size-6 shrink-0", size: "32" }}>
                      {experience.icon}
                    </IconContext.Provider>
                  )}
                </div>
              </div>

              <div className="grow pb-8 group-last:pb-0">
                <h3 className="text-garden-content dark:text-forest-content mb-1 text-xs">
                  {experience.from} - {experience.until}
                </h3>

                <p className="text-garden-content-loud dark:text-forest-content-loud text-sm font-semibold">{title}</p>

                {experience.description && (
                  <p className="text-garden-content-loud dark:text-forest-content-loud mt-1 text-sm">
                    {experience.description}
                  </p>
                )}

                {experience.highlights?.length && (
                  <ul className="ms-6 mt-3 list-disc space-y-1.5">
                    {experience.highlights.map(highlight => (
                      <li key={highlight} className="text-garden-content dark:text-forest-content ps-1 text-sm">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {experience.tech?.length && (
                  <ul className="mt-3">
                    {experience.tech.map(_tech => (
                      <li
                        key={_tech}
                        className="dark:text-forest-content-loud text-garden-content-loud relative inline-block pe-4 text-xs before:absolute before:end-1.5 before:top-1/2 before:size-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gray-400 last:pe-0 last-of-type:before:hidden dark:before:bg-neutral-600"
                      >
                        {_tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experience;
