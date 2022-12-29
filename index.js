import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8800;
app.use(cors({ origin: process.env.HOST, credentials: true }));
dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to Db");
    })
    .catch((err) => console.log(err));
};
app.use(cookieParser());
app.use(express.json()); //to use json data from outside
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong !";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("client/build"));
// }
app.listen(PORT, () => {
  connect();
  console.log("connected");
});
