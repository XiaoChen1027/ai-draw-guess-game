import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { router as apiRouter } from "./routes";

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(morgan("dev")); // 日志记录
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json()); // JSON 解析

// 路由配置
app.use("/api", apiRouter);

// 错误处理中间件
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});