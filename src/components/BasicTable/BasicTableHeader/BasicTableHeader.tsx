import React, { useContext, useCallback } from 'react';

import { Checkbox } from '../../Checkbox';

import { BasicTableContext } from '../utils/context';
import { IBasicTableContext } from '../types/table.props';
import { IColumn } from '../types/table.columns';
import sortUpIco from '../assets/triangle-up.svg';
import sortDownIco from '../assets/triangle-down.svg';
import css from './BasicTableHeader.module.scss';

export function BasicTableHeader() {
    const {
        columnsMetrics,
        config: {
            sorting = false,
            headerConfig: { style = {} },
        },
        gridWidth,
        sortParametrs: { field, descDirection },
        actionsContext: { handleSorting, handleAllRowsSelect },
        rows,
        selectedRowIds,
        isAllRowsSelected,
    } = useContext<IBasicTableContext>(BasicTableContext);

    const handleChange = (checked: boolean) => handleAllRowsSelect(checked);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const { value } = event.currentTarget.dataset;
            handleSorting && handleSorting(value);
        },
        [handleSorting]
    );

    const indeterminate = Boolean(selectedRowIds.size && rows.length !== selectedRowIds.size);

    const isSortable = (column: IColumn) => {
        if (field === column.fieldName) {
            if (column.sortable !== undefined) {
                return column.sortable;
            }
            return sorting && !column.resizing;
        }
        return false;
    };

    const renderHeaderCell = (column: IColumn) => (
        <div
            key={column.fieldName}
            data-value={column.fieldName}
            title={column.fieldCaption}
            className={css.HeaderCell}
            style={column.style}
            role="presentation"
            onClick={column.type === 'selector' ? undefined : handleClick}>
            {column.type === 'selector' ? (
                <Checkbox
                    checked={isAllRowsSelected}
                    indeterminate={indeterminate}
                    onChange={handleChange}
                    disabled={false}
                />
            ) : (
                <React.Fragment>
                    {isSortable(column) && <img src={descDirection ? sortDownIco : sortUpIco} alt="sort" />}
                    <section className={css.Caption}>{column.fieldCaption}</section>
                </React.Fragment>
            )}
        </div>
    );

    return (
        <div className={css.BasicTableHeader} style={{ ...style, width: gridWidth }}>
            {Object.keys(columnsMetrics).map(column => renderHeaderCell(columnsMetrics[column]))}
        </div>
    );
}
