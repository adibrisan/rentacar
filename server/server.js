import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { processLicense } from "./controllers/ocr-controller.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import carRouter from "./routes/car.js";

const port = 9000;
const app = express();
app.use(
  bodyParser.json({ limit: "50mb" }),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json()
);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", carRouter);

app.post("/process-image", processLicense);

mongoose
  .connect(`${process.env.MONGO_CONNECTION_URL}`)
  .then(() => {
    app.listen({ port }, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
