import PersonalSiteImage from "../assets/card-small.png";
import Lernprozess from "../assets/lernprozess.png";
import Project from "./Project";

interface Project {
  title: string;
  description: string;
  image: string;
  skills: string[];
  sourceCodeLink: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Lernprozess Flashcards",
    description:
      "Fullstack flashcards app with a spaced repetition system (SRS) built with Next.js, inspired by Anki & Wanikani. Custom PostgreSQL database powered by Drizzle ORM, enables users to create accounts, manage decks & flashcards, and engage in learning sessions. Cards are leveled up with increasing SRS timings for optimized review timing.",
    image: Lernprozess,
    skills: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Zod"],
    sourceCodeLink: "https://github.com/alex-avila/flashcards-srs",
    link: "https://lernprozess.vercel.app",
  },
  {
    title: "Portfolio Site V2",
    description:
      "This modern portfolio site built with best practices & a modern tech stack with React, TypeScript, Tailwind CSS, Motion (previously Framer Motion) for animations & a custom Vite config for static site generation.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    sourceCodeLink: "https://github.com/alex-avila/portfolio-site-v2",
    image: PersonalSiteImage,
  },
];

function Projects() {
  return (
    <div>
      <h2 className="mb-5 flex items-center justify-between gap-x-3 font-medium text-garden-content-loud dark:text-forest-content-loud">
        <span>Projects</span>
        <span className="relative top-[1.5px] h-px w-full grow bg-garden-content-quiet-2 dark:bg-forest-content-quiet-2" />
        <span className="shrink-0 text-garden-content-quiet-2 dark:text-forest-content-quiet-2" aria-hidden="true">
          プロジェクト
        </span>
      </h2>

      <ul className="space-y-7">
        {projects.map(project => (
          <Project key={project.title} {...project} />
        ))}
      </ul>
    </div>
  );
}

export default Projects;
