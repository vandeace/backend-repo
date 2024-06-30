import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  User,
  getAdditionalUserInfo,
} from "firebase/auth";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";
import { FirebaseError } from "firebase/app";

export class AuthController {
  public auth = getAuth();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        res.status(500).json({ message: "success create user" });
      })
      .catch(() => {
        next(new HttpException(500, "Fail create user"));
      });
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    signInWithEmailAndPassword(this.auth, email, password)
      .then(async (signIn) => {
        const idToken = await signIn.user.getIdToken();
        res.send({
          message: "success",
          token: idToken,
        });
      })
      .catch(() => {
        next(new HttpException(401, "Wrong authentication token"));
      });
  };
}
