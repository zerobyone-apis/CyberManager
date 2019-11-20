import Express, { Application } from "express";
import morgan from "morgan";

//Routes
import IndexRoutes from "./routes/routes";
import routes from "./routes/user.routes";
export class App {
  private app: Application;

  constructor(private port: number | string) {
    this.app = Express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  //Settings and Middlewares
  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }
  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(Express.json());
  }

  routes() {
    this.app.use(IndexRoutes);
    this.app.use("/post", routes);
  }

  //Functions
  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`Server on port ${this.app.get("port")}`);
  }
}
