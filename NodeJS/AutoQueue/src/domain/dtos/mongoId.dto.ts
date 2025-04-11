type MongoIdDtoResult = { ok: false; issue: string } | { ok: true; id: string };

const create = (params: { [key: string]: any }): MongoIdDtoResult => {
  const { id } = params;

  if (typeof id !== "string") {
    return { ok: false, issue: "Ticket ID must be a string" };
  }
  if (!id) return { ok: false, issue: "Ticket ID must be a non empty string" };
  if (id.length !== 24) return { ok: false, issue: "Not valid ticket ID" };

  return { ok: true, id };
};

export const MongoIdDto = { create };
