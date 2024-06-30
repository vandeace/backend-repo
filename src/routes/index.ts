import { Router } from "express";
import { PostRoute } from "./post.route";
import { AuthRoute } from "./auth.route";

export class ApiRoutes {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/posts", new PostRoute().router);
    this.router.use("/auth", new AuthRoute().router);
  }
}
