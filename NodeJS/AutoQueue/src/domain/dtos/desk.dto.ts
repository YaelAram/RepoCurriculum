type DeskDtoResult = { ok: false; issue: string } | { ok: true; desk: string };

const create = (params: { [key: string]: any }): DeskDtoResult => {
  const { desk } = params;

  if (typeof desk !== "string") {
    return { ok: false, issue: "Desk name must be a string" };
  }
  if (!desk) return { ok: false, issue: "Desk name must be a non empty string" };

  return { ok: true, desk };
};

export const DeskDto = { create };
