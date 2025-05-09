import { Request, Response } from "express";
import { predictImage } from "../services/ai";

export const predictDrawing = async (req: Request, res: Response) => {
  try {
    const { imageData } = req.body;
    if (!imageData) {
      return res.status(400).json({
        status: "error",
        message: "No image data provided",
      });
    }

    const prediction = await predictImage(imageData);
    res.json({
      status: "success",
      prediction,
    });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to process prediction",
    });
  }
};