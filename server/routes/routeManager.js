import translateRoutes from "./translate/translateRoutes.js";
import { notFound } from "../controllers/404.js";

export default function routeManager(app) {
  app.use("/translate", translateRoutes);
  app.use("*", notFound);
}
