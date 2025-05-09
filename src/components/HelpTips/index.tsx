import React from 'react';
import styles from './styles.module.css';

/**
 * 帮助提示组件
 */
const HelpTips: React.FC = () => {
    return (
        <div className={styles.helpTips}>
            <h3>使用说明：</h3>
            <ul>
                <li>在画布上自由绘画</li>
                <li>使用工具栏选择颜色和画笔粗细</li>
                <li>点击"预测"按钮让 AI 猜测你画的是什么</li>
                <li>如果需要重新开始，点击"清空"按钮</li>
            </ul>
        </div>
    );
};

export default HelpTips;