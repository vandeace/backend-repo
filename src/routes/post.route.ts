import { Router } from "express";
import { Routes } from "../model/routes.interface";
import { PostController } from "../controllers/user-collection.controller";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

export class PostRoute implements Routes {
  public router = Router();
  public post = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(ValidationMiddleware);
    this.router.get("/", this.post.fetchPost);
    this.router.post("/", this.post.createPost);
    this.router.delete(`/:id`, this.post.deleteProduct);
    this.router.patch(`/:id`, this.post.updateProduct);
  }
}
