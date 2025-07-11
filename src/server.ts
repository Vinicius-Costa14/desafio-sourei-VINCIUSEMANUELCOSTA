import express from "express";
import dotenv from "dotenv";
import router from "./infra/http/routes/routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3005;
try {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (err) {
  console.error("Erro ao iniciar o servidor:", err);
}
