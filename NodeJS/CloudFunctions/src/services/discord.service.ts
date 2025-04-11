export const sendDiscordMessage = async (
  discordBotUrl: string,
  message: string,
): Promise<boolean> => {
  try {
    const resp = await fetch(discordBotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    return resp.ok;
  } catch (error: any) {
    console.error(`Error sending Discord message: ${error.message}`);
    return false;
  }
};
