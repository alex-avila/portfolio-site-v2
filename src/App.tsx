import Navigation from "./components/Navigation";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import { SectionsProvider, Section } from "./components/SectionsContext";

const toggleTheme = (type?: "dark" | "light") => {
  if (type === "dark") {
    document.documentElement.classList.add("dark");
  } else if (type === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.toggle("dark");
  }
};

function App() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SectionsProvider>
        <Navigation />
        <main className="mb-10 space-y-10 px-4 pt-10 sm:mb-14 sm:px-6 md:space-y-14 md:pt-16 lg:px-8">
          <Section id="about">
            <About />
          </Section>
          <Section id="skills">
            <Skills />
          </Section>
          <Section id="experience">
            <Experience />
          </Section>
        </main>
        <Footer onToggleTheme={() => toggleTheme()} />
      </SectionsProvider>
    </div>
  );
}

export default App;
