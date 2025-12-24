import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routers/main.router.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4028",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

app.use("/api", router);

app.listen(port, () => {
  console.log(`The backend is listening on ${port}`);
});
