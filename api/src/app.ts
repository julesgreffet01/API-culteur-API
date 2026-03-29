import { ProjectRouter } from "./Project/ProjectRoutes";
import { UserRouter } from "./User/UserRoutes"
import { ServiceRouter } from "./Service/ServiceRouter"
import express, { Request, Response } from "express";
import {AuthRouter} from "./Auth/AuthRoutes";
import {verifyTokenMiddleware} from "./Auth/AuthMiddleware";
import {logMiddleware} from "./Logs/LogMiddleware";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

// pour  perùettre a l id  sur toute la requete
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API principale fonctionne !' });
});

app.use("/users", verifyTokenMiddleware, logMiddleware, UserRouter);
app.use("/projects",verifyTokenMiddleware, logMiddleware, ProjectRouter);
app.use("/services",verifyTokenMiddleware, logMiddleware, ServiceRouter);
app.use("/auth", logMiddleware, AuthRouter);


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});