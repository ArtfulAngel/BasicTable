import { useState, useEffect } from 'react';
import { IColumn, columnCheckbox } from '../types/table.columns';
import { ITableConfig } from '../types/table.config';

export function useGetColumnsMetrics() {
    const [columnsMetrics, setColumnsMetrics] = useState<IColumn[]>([]);
    const [gridWidth, setGridWidth] = useState<string>('100%');

    useEffect(() => {
        const width = Object.keys(columnsMetrics).reduce((fullWidth, key) => {
            const columnWidth = columnsMetrics[key].width;
            fullWidth += columnWidth;

            return fullWidth;
        }, 0);
        width && setGridWidth(`${width}px`);
    }, [columnsMetrics]);

    const generateColMetrics = ({
        columns,
        config: {
            rowConfig: { hasSelection = false },
            columnsConfig: { defaultColumnWidth = 180 },
        },
    }: {
        columns: IColumn[];
        config: ITableConfig;
    }) => {
        let prevColWidth = 0;
        let prevLeftOffset = 0;
        let cols: IColumn[] = [...columns];
        if (hasSelection) {
            cols = [columnCheckbox, ...cols];
        }

        const colMetrics = cols.reduce((metrics, col, colIdx) => {
            const leftOffset = colIdx === 0 ? 0 : prevLeftOffset + prevColWidth;
            const colWidth = col.width || defaultColumnWidth;
            const textAlign = col.align || 'left';

            const column = { ...col, style: { left: leftOffset, width: colWidth, textAlign } };

            const newMetrics = [...metrics, column];

            prevLeftOffset = leftOffset;
            prevColWidth = colWidth;

            return newMetrics;
        }, []);

        setColumnsMetrics(colMetrics);
    };

    return { columnsMetrics, gridWidth, generateColMetrics };
}
