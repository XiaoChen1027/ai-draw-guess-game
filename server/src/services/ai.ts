import axios from "axios";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/vision";

export const predictImage = async (imageData: string) => {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        image: imageData,
        model: "deepseek-vision",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to get prediction from AI service");
  }
};