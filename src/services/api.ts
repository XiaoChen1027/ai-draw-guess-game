/**
 * 画作预测服务
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * 发送画作数据到服务器进行预测
 * @param imageData - Base64编码的图像数据
 * @returns 预测结果
 */
export const predictDrawing = async (imageData: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData }),
    });

    if (!response.ok) {
      throw new Error("预测请求失败");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API调用失败:", error);
    throw error;
  }
};

/**
 * 检查服务器健康状态
 * @returns 服务器状态信息
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  } catch (error) {
    console.error("健康检查失败:", error);
    throw error;
  }
};