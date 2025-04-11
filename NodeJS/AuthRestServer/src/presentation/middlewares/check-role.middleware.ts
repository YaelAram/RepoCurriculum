import type { NextFunction, Request, Response } from "express";
import type { UserEntity } from "../../domain/entities/user.entity";

const verifyRoles = (allowedRoles: Set<string>, userRoles: Set<string>): boolean => {
  for (const requiredRole of allowedRoles) {
    if (userRoles.has(requiredRole)) return true;
  }

  return false;
};

export const checkRole = (allowedRoles: Set<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.body.userInfo as UserEntity;

    if (!userInfo) return res.status(401).json({ issue: "Not authenticated" });
    if (!userInfo.roles.length)
      return res.status(500).json({ issue: "User with no role assigned" });

    const userRoles = new Set<string>(userInfo.roles);
    const isUserAuthorized = verifyRoles(allowedRoles, userRoles);

    if (!isUserAuthorized) return res.status(403).json({ issue: "Operation not allowed" });

    next();
  };
};
