import { IconContext, IconType } from "react-icons";
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
        icon: withIconProvider(JavaScriptIcon),
      },
      {
        name: "TypeScript",
        icon: withIconProvider(TypeScriptIcon),
      },
      {
        name: "Vue",
        icon: withIconProvider(VueIcon),
      },
      {
        name: "React",
        icon: withIconProvider(ReactIcon),
      },
      {
        name: "Tailwind CSS",
        icon: withIconProvider(TailwindCssIcon),
      },
      {
        name: "Webpack",
        icon: withIconProvider(WebpackIcon),
      },
      {
        name: "Vite",
        icon: withIconProvider(ViteIcon),
      },
      {
        name: "Alpine.js",
        icon: withIconProvider(AlpineJsIcon),
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: withIconProvider(NodeJsIcon),
      },
      {
        name: "Koa",
        icon: withIconProvider(KoaIcon),
      },
      {
        name: "Express",
        icon: withIconProvider(ExpressIcon),
      },
      {
        name: "NestJS",
        icon: withIconProvider(NestJsIcon),
      },
      {
        name: "MongoDB",
        icon: withIconProvider(MongoDbIcon),
      },
    ],
  },
  {
    category: "Fullstack",
    skills: [
      { name: "Nuxt", icon: withIconProvider(NuxtIcon) },
      {
        name: "Shopify Development (Liquid, Shopify APIs, etc.)",
        icon: withIconProvider(ShopifyIcon),
      },
    ],
  },
  {
    category: "DevOps",
    skills: [
      {
        name: "Git",
        icon: withIconProvider(GitIcon),
      },
      {
        name: "CI/CD",
      },
      {
        name: "GitHub Actions",
        icon: withIconProvider(GitHubActionsIcon),
      },
      {
        name: "Docker",
        icon: withIconProvider(DockerIcon),
      },
      {
        name: "AWS Elastic Beanstalk",
        icon: withIconProvider(AwsIcon),
      },
      {
        name: "AWS Lambda",
        icon: withIconProvider(AwsLambdaIcon),
      },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Problem-solving" },
      { name: "Attention to detail" },
      { name: "Time management" },
      { name: "Strong writing skills" },
      { name: "Efficient communication" },
      { name: "Ability to work remotely" },
    ],
  },
];

function withIconProvider(IconComponent: IconType): React.ReactElement {
  return (
    <IconContext.Provider value={{ className: "me-1 size-4 shrink-0", size: "24" }}>
      <IconComponent />
    </IconContext.Provider>
  );
}

function Skills() {
  return (
    <div>
      <h2 className="mb-5 flex items-center justify-between gap-x-3 font-medium text-gray-800 dark:text-neutral-200">
        <span>Skills</span>
        <span className="relative top-[1.5px] h-px w-full grow bg-gray-800/20 dark:bg-neutral-200/20" />
        <span className="shrink-0 text-gray-200 dark:text-neutral-700">スキル</span>
      </h2>

      <div className="space-y-3">
        {skills.map((_skills, i) => {
          return (
            <dl key={_skills.category + String(i)} className="flex flex-col gap-1 sm:flex-row">
              <dt className="min-w-32">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">{_skills.category}:</span>
              </dt>
              <dd>
                <ul className="inline-flex flex-wrap gap-y-1">
                  {_skills.skills.map((skill, j) => (
                    <li
                      key={skill.name + String(j)}
                      className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 [&:not(:last-child)]:after:content-[',']"
                    >
                      {skill.icon ? skill.icon : null}
                      {skill.name}
                    </li>
                  ))}
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
