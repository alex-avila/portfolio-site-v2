import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";

function App() {
  // if (import.meta.env.SSR) {
  //   // ... server only logic
  //   console.log("ssr test");
  // }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Header />
      <main className="space-y-10 px-4 pt-10 sm:px-6 md:space-y-14 md:pt-16 lg:px-8">
        <About />
        <Skills />
      </main>
    </div>
  );
}

export default App;
