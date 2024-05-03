import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { processLicense } from "./controllers/ocr-controller.js";
import authRouter from "./routes/register.js";

const port = 9000;
const app = express();
app.use(bodyParser.json({ limit: "50mb" }), cors(), express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRouter);

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
