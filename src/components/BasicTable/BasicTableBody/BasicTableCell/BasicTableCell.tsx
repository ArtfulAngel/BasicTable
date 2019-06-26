import React from 'react';
import cN from 'classnames/bind';
import { Checkbox } from '../../../Checkbox';

import { IColumn } from '../../types/table.columns';
import { formaterCell } from '../../utils/dataFormatting';
import css from './BasicTableCell.module.scss';

const cx = cN.bind(css);

interface IBasicTableCellProps {
    rowId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: { [key: string]: any };
    isSelected: boolean;
    isDisabled: boolean;
    value: string | number;
    column: IColumn;
    actionsContext: {
        handleRowSelect?: ({ isSelected, rowId }: { isSelected: boolean; rowId: number }) => void;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionCells?: { [key: string]: any };
}

export function BasicTableCell(props: IBasicTableCellProps) {
    const {
        rowId,
        rowData,
        isSelected,
        isDisabled,
        value,
        column,
        actionsContext,
        actionsContext: { handleRowSelect },
        actionCells,
    } = props;

    const getStylesCell = (columnType: string, highlight: boolean) =>
        cx(
            css.Cell,
            { [css.isSelector]: columnType === 'selector' },
            { [css.isNegative]: columnType === 'currency' && highlight && Number(value) < 0 },
            { [css.isPositive]: columnType === 'currency' && highlight && Number(value) > 0 }
        );

    const handleChange = (checked: boolean) => {
        handleRowSelect && handleRowSelect({ isSelected: checked, rowId });
    };

    const valueCell = formaterCell(column.type, value);
    const stylesCell = getStylesCell(column.type, column.highlight);

    const getCellByType = () => {
        switch (column.type) {
            case 'selector':
                return (
                    <Checkbox
                        checked={isSelected}
                        className={css.Checkbox}
                        indeterminate={false}
                        onChange={handleChange}
                        disabled={isDisabled}
                    />
                );
            case 'action':
                if (!isDisabled) {
                    const CellRenderer = actionCells[column.fieldName];

                    return <CellRenderer rowData={rowData} actions={actionsContext} />;
                }
                return null;
            default:
                return (
                    <div className={stylesCell} style={column.style}>
                        {valueCell}
                    </div>
                );
        }
    };

    const title = valueCell ? String(valueCell) : '';

    return (
        <div key={`${rowId}__cell_${column.fieldName}`} title={title} className={css.Wrapper} style={column.style}>
            {getCellByType()}
        </div>
    );
}
