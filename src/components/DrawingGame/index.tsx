import { useState, useRef } from 'react';
import Canvas from '../Canvas';
import ToolBar from '../ToolBar';
import HelpTips from '../HelpTips';
import styles from './styles.module.css';
import { predictDrawing } from '../../services/api';

interface CanvasRef {
    clearCanvas: () => void;
    getCanvasElement: () => HTMLCanvasElement | null;
}

/**
 * 你画我猜游戏主组件
 */
const DrawingGame: React.FC = () => {
    const [strokeColor, setStrokeColor] = useState('#000');
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [prediction, setPrediction] = useState<string>('');
    const [isPredicting, setIsPredicting] = useState(false);
    const canvasRef = useRef<CanvasRef>(null);

    // 处理颜色变化
    const handleColorChange = (color: string) => {
        setStrokeColor(color);
    };

    // 处理画笔粗细变化
    const handleWidthChange = (width: number) => {
        setStrokeWidth(width);
    };

    // 处理清空画布
    const handleClear = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        }
    };

    const handlePredict = async () => {
        if (!canvasRef.current) return;

        try {
            setIsPredicting(true);
            setPrediction('');

            // 获取画布数据
            const canvas = canvasRef.current.getCanvasElement();
            if (!canvas) return;

            const imageData = canvas.toDataURL('image/png');
            const result = await predictDrawing(imageData);

            setPrediction(result.prediction);
        } catch (error) {
            console.error('预测失败:', error);
            setPrediction('预测失败，请重试');
        } finally {
            setIsPredicting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AI 你画我猜</h1>
            <div className={styles.gameArea}>
                <ToolBar
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                    onColorChange={handleColorChange}
                    onWidthChange={handleWidthChange}
                    onClear={handleClear}
                />
                <Canvas
                    ref={canvasRef}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                />
                <div className={styles.predictionArea}>
                    <button
                        className={styles.predictButton}
                        onClick={handlePredict}
                        disabled={isPredicting}
                    >
                        {isPredicting ? '正在预测...' : '预测'}
                    </button>
                    {prediction && (
                        <div className={styles.predictionResult}>
                            <h3>AI 预测结果：</h3>
                            <p>{prediction}</p>
                        </div>
                    )}
                </div>
                <HelpTips />
            </div>
        </div>
    );
};

export default DrawingGame;