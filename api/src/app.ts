import { ProjectRouter } from "./Project/ProjectRoutes";
import { UserRouter } from "./User/UserRoutes"
import { ServiceRouter } from "./Service/ServiceRouter"
import express, { Request, Response, NextFunction  } from "express";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

  // 👉 gérer le preflight (très important)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API principale fonctionne !' });
});

app.use("/users", UserRouter);
app.use("/projects", ProjectRouter);
app.use("/services", ServiceRouter);


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});