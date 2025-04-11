const error = (payload: any, status: number): Response => {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);

  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

const success = (message: string, status: number): Response => {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
};

export const HttpResponse = { success, error };
