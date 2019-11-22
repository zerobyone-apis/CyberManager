import Express, { Application } from "express";
import morgan from "morgan";

let cors = require("cors");
//Routes
import pedido from "./routes/pedido.routes";
import routes from "./routes/user.routes";
export class App {
  private app: Application;

  constructor(private port: number | string) {
    this.app = Express();
    this.app.use(cors());
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
    this.app.use(pedido);
    this.app.use("/user", routes);
  }

  //Functions
  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`Server on port ${this.app.get("port")}`);
  }
}
