import React from 'react';
import { Modal } from '../ui/Modal';
import { ChartHeader } from './ChartHeader';
import { ChartContainer } from './ChartContainer';

interface PopupChartProps {
    isOpen: boolean;
    onClose: () => void;
    symbol: string;
    title: string;
    chartType: 'candle' | 'area';
    onChartTypeChange: (type: 'candle' | 'area') => void;
}

export const PopupChart: React.FC<PopupChartProps> = ({
    isOpen,
    onClose,
    symbol,
    title,
    chartType,
    onChartTypeChange,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] max-w-6xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <ChartHeader
            title={title}
            chartType={chartType}
            onChartTypeChange={onChartTypeChange}
            onClose={onClose}
            />

            {/* Content Area */}
            <div className="flex-1 p-6 min-h-0 flex flex-col">
            <ChartContainer chartType={chartType} symbol={symbol} />
            </div>
        </div>
        </Modal>

    );
};