import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();
const { NODE_ENV, PORT = 3000 } = process.env;

// routes
import authRoutes from "./src/routes/auth.routes.js";
import customerRoutes from "./src/routes/customer.routes.js";

// utils
import { connect } from "./src/utils/db.utils.js";

const app = express();

if (NODE_ENV === "development") {
  morgan("tiny");
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/ping", (req, res) => {
  return res.json({
    message: "👍🏼 We are ready.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

// starting point
app.listen(PORT, async () => {
  console.log(`Server running successfully on PORT ${PORT}`.bold.green);
  await connect();
});
