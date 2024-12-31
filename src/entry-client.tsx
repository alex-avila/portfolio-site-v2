import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./fonts.css";
import "./index.css";

hydrateRoot(
  document.querySelector("#app") as HTMLElement,
  <StrictMode>
    <App />
  </StrictMode>,
);
