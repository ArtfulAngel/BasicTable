import React, { useContext } from 'react';

import { BasicTableContext } from '../utils/context';

import { NoDataText } from '../NoData';
import { BasicTableRow } from './BasicTableRow';
import css from './BasicTableBody.module.scss';
import { IBasicTableContext } from '../types/table.props';

export function BasicTableBody() {
    const {
        columnsMetrics,
        config: {
            rowConfig,
            bodyConfig: { style = {}, noDataText = 'Нет данных' },
        },
        gridWidth,
        currentRow,
        rows,
        actionsContext,
        actionCells,
    } = useContext<IBasicTableContext>(BasicTableContext);

    const { keyField = 'id' } = rowConfig;

    return (
        <div className={css.BasicTableBody} style={{ ...style, width: gridWidth }}>
            {rows.length ? (
                rows.map(row => {
                    const rowKey = row[keyField];

                    return (
                        <BasicTableRow
                            key={`row_${rowKey}`}
                            keyField={keyField}
                            currentRow={currentRow}
                            row={row}
                            columns={columnsMetrics}
                            rowConfig={rowConfig}
                            actionsContext={actionsContext}
                            actionCells={actionCells}
                        />
                    );
                })
            ) : (
                <NoDataText value={noDataText} />
            )}
        </div>
    );
}
