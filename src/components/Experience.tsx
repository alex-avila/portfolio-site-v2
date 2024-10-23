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
}

const experiences: ExperienceItem[] = [
  {
    icon: anattaLogo,
    title: "UI Developer",
    company: "Anatta",
    from: "OCT 2018",
    until: "OCT 2024",
    highlights: [
      "Collaborated with clients in the e-commerce space to build new features for the frontend and backend, implement redesigns, optimize web performance, set up payment integrations and more",
      "Worked with various clients which include AG1, Molekule, Thesis, Rothy’s, Glorious Gaming and Stio",
      "Planned and executed the early development stages for the refactoring of an internal Shopify theme. Included setting up CI/CD with GitHub Actions, implemented an updated webpack config, Tailwind CSS, Alpine.js, and tools to help with the development process",
      "Led the development in a team of 3 for the Shopify site of a new brand",
      "Used AWS Elastic Beanstalk, GitHub Actions for weekly deployments",
      "Implemented changes to high value pages that significantly improved web vitals (e.g. collection pages, cart drawers, bundle builders, etc.)",
    ],
  },
  {
    icon: <MdWorkOutline />,
    title: "Freelance Web Developer",
    from: "JULY 2018",
    until: "SEPT 2018",
    highlights: [
      "Built and accelerated the development of web apps for different clients",
      "Used React, Redux, AWS, fetched to various microservices & APIs, etc.",
    ],
  },
];

function Experience() {
  return (
    <div>
      <h2 className="mb-5 font-medium text-gray-800 dark:text-neutral-200">
        Experience
      </h2>

      <div>
        {experiences.map((experience) => {
          const title = `${experience.title}${experience.company ? ` at ${experience.company}` : ""}`;
          return (
            <div key={experience.title} className="group relative flex gap-x-5">
              <div className="relative after:absolute after:bottom-2 after:start-3 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 group-last:after:hidden after:dark:bg-neutral-700">
                <div className="relative z-10 flex size-6 items-center justify-center">
                  {typeof experience.icon === "string" ? (
                    <img
                      className="size-6 shrink-0"
                      src={experience.icon}
                      width="32"
                      height="32"
                    />
                  ) : (
                    <IconContext.Provider
                      value={{ className: "size-6 shrink-0", size: "32" }}
                    >
                      {experience.icon}
                    </IconContext.Provider>
                  )}
                </div>
              </div>

              <div className="grow pb-8 group-last:pb-0">
                <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                  {experience.from} - {experience.until}
                </h3>

                {/* TODO: make sure to complete the tailwind set up and add the Inter font I think */}
                <p className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                  {title}
                </p>

                {experience.description && (
                  <p className="mt-1 text-sm text-gray-800 dark:text-neutral-200">
                    {experience.description}
                  </p>
                )}

                {experience.highlights?.length && (
                  <ul className="ms-6 mt-3 list-disc space-y-1.5">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="ps-1 text-sm text-gray-600 dark:text-neutral-400"
                      >
                        {highlight}
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
