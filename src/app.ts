import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ShippingRoutes from "./routes/ShippingRoutes";
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import CartRoutes from "./routes/CartRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import ProductRoutes from "./routes/ProductRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", AuthRoutes);
app.use("/api", CartRoutes);
app.use("/api", OrderRoutes);
app.use("/api", PaymentRoutes);
app.use("/api", ProductRoutes);
app.use("/api", ShippingRoutes);
app.use("/api", UserRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));

export default app;
