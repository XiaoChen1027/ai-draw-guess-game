import { Router } from "express";
import { predictDrawing } from "../controllers/prediction";

export const router = Router();

// 健康检查路由
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 画作预测路由
router.post("/predict", predictDrawing);