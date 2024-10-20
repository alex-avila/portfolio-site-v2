// based on: https://github.com/vitejs/vite-plugin-react/blob/main/playground/ssr-react/prerender.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// run build:client & build:server to get these files in dist
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

const appHtml = render();
const html = template.replace(`<!--app-html-->`, appHtml);

const filePath = `dist/static/index.html`;
fs.writeFileSync(toAbsolute(filePath), html);
console.log("pre-rendered:", filePath);
