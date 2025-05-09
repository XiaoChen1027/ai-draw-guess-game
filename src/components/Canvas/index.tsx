import { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import styles from './styles.module.css';

interface CanvasProps {
    width?: number;
    height?: number;
    strokeColor?: string;
    strokeWidth?: number;
}

interface CanvasRef {
    clearCanvas: () => void;
    getCanvasElement: () => HTMLCanvasElement | null;
}

/**
 * 画布组件
 * @param width - 画布宽度
 * @param height - 画布高度
 * @param strokeColor - 画笔颜色
 * @param strokeWidth - 画笔粗细
 */
const Canvas = forwardRef<CanvasRef, CanvasProps>((
    {
        width = 800,
        height = 600,
        strokeColor = '#000',
        strokeWidth = 2
    },
    ref
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    // 初始化画布
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 设置画布样式
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        setContext(ctx);
    }, [strokeColor, strokeWidth]);

    // 开始绘画
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || !context) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
    };

    // 绘画中
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.lineTo(x, y);
        context.stroke();
    };

    // 结束绘画
    const stopDrawing = () => {
        if (!context) return;

        context.closePath();
        setIsDrawing(false);
    };

    // 清空画布
    const clearCanvas = () => {
        if (!context || !canvasRef.current) return;

        context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
    };

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        clearCanvas,
        getCanvasElement: () => canvasRef.current,
    }));

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={styles.canvas}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
        />
    );
});

export default Canvas;