import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./dbConfig/index.js";
import userAuth from "./middleware/authMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoute.js";

import updatePassword from "./hash/Node.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

connectDB();

// Error-handling middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});



app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(router);
app.use(userAuth);

// Apply userAuth middleware only to protected routes
app.use("/posts", userAuth, postRoutes); // Protected routes
app.use("/auth", authRoutes); // Public routes (no userAuth middleware)

app.use(errorMiddleware);

//updatePassword();
app.listen(PORT, () => {
  console.log("Server running of port " + PORT);
});