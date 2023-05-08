import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/AuthRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import UserRoutes from "./routes/UserRoutes";

import mongoose from "mongoose";
import { config } from "dotenv";

const app = express();

config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", AuthRoutes);
app.use("/api", OrderRoutes);
app.use("/api", ProductRoutes);
app.use("/api", UserRoutes);

const dbPassword = process.env.MONGODB_PASSWORD;
const dbUser = process.env.MONGODB_USER;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.djvav8j.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

export default app;
