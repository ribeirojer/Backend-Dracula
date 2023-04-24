import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
}

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const token = authorization.replace("Bearer", "").trim();
  const secret = process.env.JWT_SECRET as Secret;
  try {
    const data = jwt.verify(token, secret);
    const { id } = data as TokenPayload;
    return next(id);
  } catch {
    return response.status(401).json({ error: "Unauthorized" });
  }
}

export { authMiddleware };
