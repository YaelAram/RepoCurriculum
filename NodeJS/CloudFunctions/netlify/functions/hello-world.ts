import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(JSON.stringify({ message: "Hello, world!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config: Config = {
  path: "/api/greeting",
};
