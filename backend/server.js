import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routers/main.router.js";
import cookieParser from "cookie-parser";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Authorization"],
  }),
);
app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "storage")),
);
app.use("/api", router);

app.listen(port, () => {
  console.log(`The server is listenin on ${port}`)
});
