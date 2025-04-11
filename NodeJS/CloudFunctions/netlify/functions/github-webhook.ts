import type { Config, Context } from "@netlify/functions";

import { sendDiscordMessage } from "../../src/services/discord.service";
import { createEventMessage } from "../../src/services/github.service";
import { HttpResponse } from "../../src/services/response.service";
import { checkGitHubSignature } from "../../src/validators/checkSignature";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return HttpResponse.error({ issue: "Not found" }, 404);

  const discordBotUrl = Netlify.env.get("DISCORD_BOT_URL");
  const githubSecret = Netlify.env.get("GITHUB_WEBHOOK_SECRET");

  if (!discordBotUrl || !githubSecret) {
    return HttpResponse.error({ issue: "Missing variables" }, 500);
  }

  const isValidSignature = checkGitHubSignature(req, githubSecret);
  if (isValidSignature) return HttpResponse.error({ issue: "Unauthorized" }, 401);

  const githubEvent = req.headers.get("x-github-event") ?? "unknown event";
  const body = await req.json();

  const discordMessage = createEventMessage(githubEvent, body);
  const messageSent = await sendDiscordMessage(discordBotUrl, discordMessage);

  if (messageSent) return HttpResponse.success("Accepted", 202);
  return HttpResponse.error({ issue: "Discord message not sent" }, 500);
};

export const config: Config = {
  path: "/api/webhooks/github",
};
