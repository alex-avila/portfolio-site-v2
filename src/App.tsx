function App() {
  if (import.meta.env.SSR) {
    // ... server only logic
    console.log("ssr test");
  }

  return <h1 className="text-3xl font-bold italic">hello world :3</h1>;
}

export default App;
