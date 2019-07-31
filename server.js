const next = require("next");
const http = require("http");
const url = require("url");
const path = require("path");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      // Parse request url to get its pathName
      const parseUrl = url.parse(req.url, true);
      const { pathName } = parseUrl;

      // If a service worker requested, serve it as a static file
      if (pathName === "/service-worker.js") {
        const filePaht = path.join(__dirname, ".next", pathName);
        app.serveStatic(req, res, filePaht);
        // Otherwise, let Next take care of it
      } else {
        handle(req, res, parseUrl);
      }
    })
    .listen(port, () => {
      console.log(`Listening on PORT ${port}`);
    });
});
