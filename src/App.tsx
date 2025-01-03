import Navigation from "./components/Navigation";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { SectionsProvider, Section } from "./components/SectionsContext";

function App() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SectionsProvider>
        <Navigation sections={sections.map(({ id, name }) => ({ id, name }))} onToggleTheme={() => toggleTheme()} />
        <main className="mb-10 space-y-10 px-4 pt-10 sm:mb-14 sm:px-6 md:space-y-14 md:pt-16 lg:px-8">
          {sections.map((section, index) => (
            <Section key={section.id} id={section.id} withMotion={index !== 0} delay={0.1}>
              {section.component}
            </Section>
          ))}
        </main>
        <Footer onToggleTheme={() => toggleTheme()} />
      </SectionsProvider>
    </div>
  );
}

const sections = [
  {
    id: "about",
    name: "About",
    component: <About />,
  },
  {
    id: "skills",
    name: "Skills",
    component: <Skills />,
  },
  {
    id: "experience",
    name: "Experience",
    component: <Experience />,
  },
  {
    id: "projects",
    name: "Projects",
    component: <Projects />,
  },
];

const toggleTheme = (type?: "dark" | "light") => {
  if (type === "dark") {
    document.documentElement.classList.add("dark");
  } else if (type === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.toggle("dark");
  }

  const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  localStorage?.setItem("theme", theme);
};

const initializeTheme = () => {
  if (typeof localStorage === "undefined") return;

  const theme = localStorage?.getItem("theme") || "dark";
  toggleTheme(theme === "light" ? theme : "dark");
};

initializeTheme();

export default App;
