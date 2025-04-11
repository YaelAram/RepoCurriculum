import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const myEnvVar = Netlify.env.get("CUSTOM_VARIABLE");

  return new Response(JSON.stringify({ message: "Environments", myEnvVar }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config: Config = {
  path: "/api/variables",
};
