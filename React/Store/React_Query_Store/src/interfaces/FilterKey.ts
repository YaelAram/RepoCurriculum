export const FilterKey = {
  MEN: "men's clothing",
  WOMEN: "women's clothing",
} as const;

export type FilterKeyType = (typeof FilterKey)[keyof typeof FilterKey];
