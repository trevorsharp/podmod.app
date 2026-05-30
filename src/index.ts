import router from "./router";
import env from "./env";

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection", reason);
});

process.on("SIGTERM", () => {
  console.warn("Received SIGTERM");
});

process.on("SIGINT", () => {
  console.warn("Received SIGINT");
});

Bun.serve({
  port: env.PORT,
  fetch: router.fetch,
  idleTimeout: 120,
});

console.log("podmod.app server is up and running");
