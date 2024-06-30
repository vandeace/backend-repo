import express from "express";
import config from "../config/envConfig";
import cors from "cors";
import { ApiRoutes } from "../routes";
import { ErrorMiddleware } from "../middlewares/error.middleware";
import cookieParser from "cookie-parser";
export class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = config.port || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`Server is live ${config.hostUrl}`),
        console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(
      express.json({
        limit: "10mb",
      })
    );
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes() {
    this.app.use("/api", new ApiRoutes().router);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
