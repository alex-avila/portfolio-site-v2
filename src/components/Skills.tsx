import { IconContext } from "react-icons";
import {
  SiJavascript as JavaScriptIcon,
  SiTypescript as TypeScriptIcon,
  SiVuedotjs as VueIcon,
  SiNuxtdotjs as NuxtIcon,
  SiReact as ReactIcon,
  SiVite as ViteIcon,
  SiWebpack as WebpackIcon,
  SiAlpinedotjs as AlpineJsIcon,
  SiTailwindcss as TailwindCssIcon,
  SiShopify as ShopifyIcon,
  SiNodedotjs as NodeJsIcon,
  SiKoa as KoaIcon,
  SiExpress as ExpressIcon,
  SiNestjs as NestJsIcon,
  SiMongodb as MongoDbIcon,
  SiGit as GitIcon,
  SiGithubactions as GitHubActionsIcon,
  SiDocker as DockerIcon,
  SiAmazonwebservices as AwsIcon,
  SiAwslambda as AwsLambdaIcon,
} from "react-icons/si";

interface Skills {
  category: string;
  skills: Array<{ name: string; icon?: React.ReactElement }>;
}

const skills: Skills[] = [
  {
    category: "Frontend",
    skills: [
      {
        name: "JavaScript",
        icon: <JavaScriptIcon />,
      },
      {
        name: "TypeScript",
        icon: <TypeScriptIcon />,
      },
      {
        name: "Vue",
        icon: <VueIcon />,
      },
      {
        name: "React",
        icon: <ReactIcon />,
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindCssIcon />,
      },
      {
        name: "webpack",
        icon: <WebpackIcon />,
      },
      {
        name: "Vite",
        icon: <ViteIcon />,
      },
      {
        name: "Alpine.js",
        icon: <AlpineJsIcon />,
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: <NodeJsIcon />,
      },
      {
        name: "Koa",
        icon: <KoaIcon />,
      },
      {
        name: "Express",
        icon: <ExpressIcon />,
      },
      {
        name: "NestJS",
        icon: <NestJsIcon />,
      },
      {
        name: "MongoDB",
        icon: <MongoDbIcon />,
      },
    ],
  },
  {
    category: "Fullstack",
    skills: [
      { name: "Nuxt", icon: <NuxtIcon /> },
      {
        name: "Shopify Development (Liquid, Shopify APIs, etc.)",
        icon: <ShopifyIcon />,
      },
    ],
  },
  {
    category: "DevOps",
    skills: [
      {
        name: "Git",
        icon: <GitIcon />,
      },
      {
        name: "GitHub Actions",
        icon: <GitHubActionsIcon />,
      },
      {
        name: "Docker",
        icon: <DockerIcon />,
      },
      {
        name: "AWS Elastic Beanstalk",
        icon: <AwsIcon />,
      },
      {
        name: "AWS Lambda",
        icon: <AwsLambdaIcon />,
      },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Problem-solving" },
      { name: "attention to detail" },
      { name: "strong writing skills" },
      { name: "efficient communication" },
      { name: "ability to work remotely" },
    ],
  },
];

function Skills() {
  return (
    <div>
      <h2 className="mb-5 flex items-center justify-between gap-x-3 font-medium text-garden-content-loud dark:text-forest-content-loud">
        <span>Skills</span>
        <span className="relative top-[1.5px] h-px w-full grow bg-garden-content-quiet-2 dark:bg-forest-content-quiet-2" />
        <span className="shrink-0 text-garden-content-quiet-2 dark:text-forest-content-quiet-2" aria-hidden="true">
          スキル
        </span>
      </h2>

      <div className="space-y-3">
        {skills.map((_skills, i) => {
          return (
            <dl key={_skills.category + String(i)} className="flex flex-col gap-1 sm:flex-row">
              <dt className="min-w-32">
                <span className="block text-sm text-garden-content-quiet dark:text-forest-content-quiet">
                  {_skills.category}:
                </span>
              </dt>
              <dd>
                <ul className="inline-flex flex-wrap gap-y-1">
                  <IconContext.Provider value={{ className: "me-1 size-3.5 shrink-0", size: "24" }}>
                    {_skills.skills.map((skill, j) => (
                      <li
                        key={skill.name + String(j)}
                        className="me-1 inline-flex items-center text-sm text-garden-content-loud dark:text-forest-content-loud [&:not(:last-child)]:after:content-[',']"
                      >
                        {skill.icon ? skill.icon : null}
                        {skill.name}
                      </li>
                    ))}
                  </IconContext.Provider>
                </ul>
              </dd>
            </dl>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
