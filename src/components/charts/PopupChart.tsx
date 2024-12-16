import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ChartHeader } from './ChartHeader';
import { ChartContainer } from './ChartContainer';
import { Candle } from '../../types/candle';

interface PopupChartProps {
    isOpen: boolean;
    onClose: () => void;
    data: Candle[];
    title: string;
    isLoading: boolean;
    isError: boolean;
}

export const PopupChart: React.FC<PopupChartProps> = ({
    isOpen,
    onClose,
    data,
    title,
    isLoading,
    isError,
}) => {
    const [chartType, setChartType] = useState<'candle' | 'area'>('candle');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] max-w-6xl max-h-[90vh] flex flex-col">
                <ChartHeader
                    title={title}
                    chartType={chartType}
                    onChartTypeChange={setChartType}
                    onClose={onClose}
                />
                <div className="flex-1 p-6 min-h-0">
                    <ChartContainer
                        chartType={chartType}
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
            </div>
        </Modal>
    );
};