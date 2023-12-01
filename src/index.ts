import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    NOTIFIER: DurableObjectNamespace;
  };
}>();

app.all("team/:teamId/*", (c) => {
  const teamId = c.req.param("teamId");
  const id = c.env.NOTIFIER.idFromName(teamId);
  const obj = c.env.NOTIFIER.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./notifier";
