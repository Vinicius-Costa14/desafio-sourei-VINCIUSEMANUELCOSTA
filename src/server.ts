import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import router from "./infra/http/routes/routes";
import { specs, swaggerUi } from "./infra/swagger/swagger";
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rota de redirecionamento para a documentação
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Rotas da API
app.use(router);

const port = process.env.PORT || 3005;
try {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger UI disponível em: http://localhost:${port}/api-docs`);
  });
} catch (err) {
  console.error("Erro ao iniciar o servidor:", err);
}
