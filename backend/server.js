import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routers/route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api", router);

app.listen(port, () => {
  console.log(`The backend is listening on ${port}`);
});
