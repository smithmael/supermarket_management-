import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import backendApp from "../server/config/app"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const PORT = 3000;
  const clientPath = path.resolve(__dirname, "client");

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      root: clientPath, // Look inside the /client folder
      server: { middlewareMode: true },
      appType: "spa",
    });

    // 1. Use Vite's middleware for assets (main.tsx, css, etc.)
    backendApp.use(vite.middlewares);

    // 2. MANUALLY SERVE index.html for the root route "/"
    backendApp.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Read the index.html from your /client folder
        let template = fs.readFileSync(path.resolve(clientPath, "index.html"), "utf-8");
        
        // Transform the HTML (injects Vite's HMR client)
        template = await vite.transformIndexHtml(url, template);
        
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    console.log("🛠️  Vite middleware & HTML handler active");
  } else {
    // Production settings
    backendApp.use(express.static(path.join(__dirname, "dist")));
    backendApp.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
  }

  backendApp.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 MarketPro: http://localhost:${PORT}`);
  });
}

startServer();