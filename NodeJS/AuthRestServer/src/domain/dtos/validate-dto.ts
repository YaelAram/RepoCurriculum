import { type ObjectSchema, type StrictObjectSchema, safeParse } from "valibot";
import type { Issue } from "../../interfaces/types";

type DtoResult<T> = { ok: false; issues: Issue[] } | { ok: true; result: T };

export const validateDto = <T>(
  object: { [key: string]: any },
  schema: StrictObjectSchema<any, any> | ObjectSchema<any, any>,
): DtoResult<T> => {
  const dto = safeParse(schema, object, { abortPipeEarly: true });

  if (dto.success) return { ok: true, result: dto.output as T };
  const issues = dto.issues.map(({ message, received, expected, path }) => {
    return { message, field: `${path?.at(0)?.key}`, expected, received };
  });

  return { ok: false, issues };
};
