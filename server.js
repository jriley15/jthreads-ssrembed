const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const appInsights = require("applicationinsights");
appInsights.setup("613304a1-17e4-4717-acc2-2c3908fb37ef").start();
let client = appInsights.defaultClient;

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);

    if (parsedUrl.pathname === "/") {
      const start = Date.now();
      res.once("finish", () => {
        client.trackMetric({
          name: "SSR Response Time",
          value: Date.now() - start,
        });
      });
    }

    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
