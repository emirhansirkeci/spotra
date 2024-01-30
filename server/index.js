import express from "express";
import cors from "cors";
import routeManager from "./routes/routeManager.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});

routeManager(app);
