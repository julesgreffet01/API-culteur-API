import { UserRoutes } from "./User/UserRoutes"
import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API principale fonctionne !' });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});