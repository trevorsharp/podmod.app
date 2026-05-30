import router from "./router";

Bun.serve({
  port: 3000,
  fetch: router.fetch,
  idleTimeout: 120,
});

console.log("podmod.app server is up and running");
