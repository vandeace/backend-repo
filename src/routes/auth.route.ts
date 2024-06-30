import { Router } from "express";
import { Routes } from "../model/routes.interface";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoute implements Routes {
  public router = Router();
  public user = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/register", this.user.register);
    this.router.post("/login", this.user.login);
  }
}
