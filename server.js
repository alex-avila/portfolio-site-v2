import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Koa from "koa";
import koaConnect from "koa-connect";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  // TODO: maybe use something like h3 or nitro or some of those new ones i've heard about
  const app = new Koa();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(koaConnect(vite.middlewares));

  app.use(async (ctx, next) => {
    const url = ctx.request.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8",
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server");

      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      ctx.body = html;
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        // TODO: test this
        ctx.throw(400, e.message);
      }

      console.log("server error", e);
    } finally {
      next();
    }
  });

  app.listen(5173);
}

createServer();
