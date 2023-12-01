// ref: https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects/

import { generateHonoObject } from "hono-do";

const SECONDS = 1000;

declare module "hono-do" {
  interface HonoObjectVars {
    teamId: string;
    queue: string[];
  }
}

export const Notifier = generateHonoObject(
  "/team/:teamId",
  async (app, { storage }, vars) => {
    vars.queue = [];
    vars.teamId = "";

    app.post("/", async (c) => {
      const currentAlarm = await storage.getAlarm();
      if (currentAlarm == null) {
        await storage.setAlarm(Date.now() + Math.random() * 10 * SECONDS);
      }

      vars.queue.push(await c.req.text());
      vars.teamId = c.req.param("teamId");

      return c.json({ queued: vars.queue.length });
    });
  }
);

Notifier.alarm(async (_, vars) => {
  console.log(vars.teamId, vars.queue);
  vars.queue = [];
});
