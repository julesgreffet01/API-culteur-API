import { ProjectRouter } from "./Project/ProjectRoutes";
import { UserRouter } from "./User/UserRoutes"
import { ServiceRouter } from "./Service/ServiceRouter"
import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API principale fonctionne !' });
});

app.use("/users", UserRouter);
app.use("/projects", ProjectRouter);
app.use("/services", ServiceRouter);


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});