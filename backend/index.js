import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const MONGO_URI =
  "mongodb+srv://admin:admin@cluster0.jzgm4vu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

mongoose
  // .connect(process.env.MONGO_URI)
  .connect(MONGO_URI)
  .then(() => console.log("Coneected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
