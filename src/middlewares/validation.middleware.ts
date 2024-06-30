import { NextFunction, Request, Response } from "express";
import { adminFirebase } from "../config/firebaseConfig";
// import { HttpException } from "../exceptions/httpException";

interface TValidationMiddleware {
  req: Request;
  res: Response;
  next: NextFunction;
}

const getAuthorization = (res: Response) => {
  const token = res?.req.header("Authorization");
  if (token) {
    return token.split("Bearer ")[1];
  } else {
    return null;
  }
};

export const ValidationMiddleware = async ({
  req,
  res,
  next,
}: TValidationMiddleware) => {
  try {
    const Authorization = getAuthorization(res);
    if (!Authorization) {
      return res.status(403).json({ error: "No token provided" });
    }
    const decodedToken = await adminFirebase
      .auth()
      .verifyIdToken(Authorization);
    if (decodedToken) {
      res.req.body.userId = decodedToken.user_id;
      next();
    } else {
      return res.status(401).json({ error: "No Token Provided" });
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};
