import React from 'react';
import cN from 'classnames/bind';

import { BasicTableCell } from '../BasicTableCell';
import { IActionsContext } from '../../types/table.props';
import { IRowConfig } from '../../types/table.config';
import { IColumn } from '../../types/table.columns';

import css from './BasicTableRow.module.scss';

const cx = cN.bind(css);

interface IBasicTableRowProps {
    keyField: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: { [key: string]: any };
    columns: IColumn[];
    currentRow: number;
    rowConfig: Partial<IRowConfig>;
    actionsContext: Partial<IActionsContext>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionCells?: { [key: string]: any };
}

export function BasicTableRow(props: IBasicTableRowProps) {
    const {
        keyField,
        row,
        columns,
        currentRow,
        rowConfig: { style = {} },
        actionsContext,
        actionsContext: { handleRowClick, handleRowDoubleClick },
        actionCells,
    } = props;

    const handlerRowClick: React.MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        event.stopPropagation();
        handleRowClick && handleRowClick(row);
    };

    const handlerRowDoubleClick: React.MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        event.stopPropagation();
        handleRowDoubleClick && !row.isDisabled && handleRowDoubleClick(row);
    };

    const getRowStyle = () =>
        cx(
            css.BasicTableRow,
            { [css.isDisabled]: row.isDisabled },
            { [css.isSelected]: currentRow === row[keyField] }
        );

    return (
        <div
            className={getRowStyle()}
            role="presentation"
            style={style}
            onClick={handlerRowClick}
            onDoubleClick={handlerRowDoubleClick}>
            {columns.map(col => (
                <BasicTableCell
                    key={`cell__${col.fieldName}`}
                    column={col}
                    rowId={row[keyField]}
                    rowData={row}
                    value={row[col.fieldName]}
                    isSelected={row.isSelected}
                    actionsContext={actionsContext}
                    actionCells={actionCells}
                    isDisabled={row.isDisabled}
                />
            ))}
        </div>
    );
}
