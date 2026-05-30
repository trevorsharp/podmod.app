import router from "./router";
import env from "./env";

Bun.serve({
  port: env.PORT,
  fetch: router.fetch,
  idleTimeout: 120,
});

console.log("podmod.app server is up and running");
