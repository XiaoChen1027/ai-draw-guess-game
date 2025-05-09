import React from 'react';
import styles from './styles.module.css';

interface ToolBarProps {
    strokeColor: string;
    strokeWidth: number;
    onColorChange: (color: string) => void;
    onWidthChange: (width: number) => void;
    onClear: () => void;
}

/**
 * 工具栏组件
 * @param strokeColor - 画笔颜色
 * @param strokeWidth - 画笔粗细
 * @param onColorChange - 颜色改变回调
 * @param onWidthChange - 粗细改变回调
 * @param onClear - 清空画布回调
 */
const ToolBar: React.FC<ToolBarProps> = ({
    strokeColor,
    strokeWidth,
    onColorChange,
    onWidthChange,
    onClear,
}) => {
    // 预设颜色列表
    const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

    // 预设粗细列表
    const widths = [2, 4, 6, 8, 10];

    return (
        <div className={styles.toolbar}>
            <div className={styles.section}>
                <span className={styles.label}>颜色：</span>
                <div className={styles.colors}>
                    {colors.map((color) => (
                        <button
                            key={color}
                            className={`${styles.colorBtn} ${color === strokeColor ? styles.active : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => onColorChange(color)}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <span className={styles.label}>粗细：</span>
                <div className={styles.widths}>
                    {widths.map((width) => (
                        <button
                            key={width}
                            className={`${styles.widthBtn} ${width === strokeWidth ? styles.active : ''}`}
                            onClick={() => onWidthChange(width)}
                            title={`${width}px`}
                        >
                            {width}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <button
                    className={styles.clearBtn}
                    onClick={onClear}
                    title="清空画布"
                >
                    清空
                </button>
            </div>
        </div>
    );
};

export default ToolBar;