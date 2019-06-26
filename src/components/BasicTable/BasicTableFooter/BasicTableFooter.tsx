import React, { useContext } from 'react';

import cN from 'classnames/bind';
import { BasicTableContext } from '../utils/context';
import { formaterCell } from '../utils/dataFormatting';
import { IBasicTableContext } from '../types/table.props';

import css from './BasicTableFooter.module.scss';

const cx = cN.bind(css);

export function BasicTableFooter() {
    const { columnsMetrics, gridWidth, totalData } = useContext<IBasicTableContext>(BasicTableContext);

    const getStylesCell = (columnType: string, highlight: boolean, value: string | number) =>
        cx(
            css.FooterCell,
            { [css.isNegative]: columnType === 'currency' && highlight && Number(value) < 0 },
            { [css.isPositive]: columnType === 'currency' && highlight && Number(value) > 0 }
        );

    return (
        <div className={css.BasicTableFooter} style={{ width: gridWidth }}>
            {columnsMetrics.map(column => {
                const cellId = `footer__cell_${column.fieldName}`;
                const valueCell = totalData[column.fieldName];
                const stylesCell = getStylesCell(column.type, column.highlight, valueCell);
                return (
                    <div key={cellId} title={valueCell} className={stylesCell} style={column.style}>
                        {column.type === 'selector' ? (
                            'Итого:'
                        ) : (
                            <section className={css.Caption} style={column.style}>
                                {column.type === 'currency' ? formaterCell('currency', valueCell) : ''}
                            </section>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
