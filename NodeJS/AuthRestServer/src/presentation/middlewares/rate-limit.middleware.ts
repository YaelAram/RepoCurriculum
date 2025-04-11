import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1_000,
  limit: 10,
  standardHeaders: false,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});
