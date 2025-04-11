import { strictObject } from "valibot";
import { numericQueryParam } from "./common/numeric-query-param.schema";

export const paginationSchema = strictObject({
  limit: numericQueryParam("Limit", "10"),
  offset: numericQueryParam("Offset", "0"),
});
