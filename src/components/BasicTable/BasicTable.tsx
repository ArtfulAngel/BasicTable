import React, { useEffect } from 'react';

import { Spinner } from '../Spinner';
import { BasicTableHeader } from './BasicTableHeader';
import { BasicTableBody } from './BasicTableBody';
import { BasicTableFooter } from './BasicTableFooter';
import { NoConfigText } from './NoData';

import { useGetColumnsMetrics, useGetDataRows } from './hooks';

import { BasicTableContext } from './utils/context';
import { getRowsFromData } from './utils/dataModification';

import { defaultProps, IBasicTableProps } from './types/table.props';
import css from './BasicTable.module.scss';

export function BasicTable(props: IBasicTableProps) {
    const {
        id: gridId,
        data,
        currentRow,
        isLoading,
        sortParametrs,
        columns,
        config,
        config: {
            hasFooter,
            rowConfig: { keyField, disableByCondition },
        },
        actionCells,
        extraProps,
        extraProps: { onSorting, onGetSelectedRowIds, onCalculatingTotalData, onRowClick, onRowDoubleClick },
    } = props;

    // hooks
    const { columnsMetrics, gridWidth, generateColMetrics } = useGetColumnsMetrics();
    const {
        rows,
        setRows,
        totalData,
        setTotalData,
        selectedRowIds,
        setSelectedRowIds,
        isAllRowsSelected,
        setIsAllRowsSelected,
    } = useGetDataRows();

    useEffect(() => {
        columnsMetrics.length === 0 &&
            generateColMetrics({
                columns,
                config,
            });
    }, [columns, columnsMetrics, config, generateColMetrics]);

    useEffect(() => {
        if (data.length) {
            const { field = 'id', descDirection = false } = sortParametrs;
            const sortedRows = [...getRowsFromData({ data, disableByCondition, selectedRowIds, keyField })].sort(
                (a, b) => {
                    const x = a[field];
                    const y = b[field];

                    if (descDirection) {
                        return x < y ? 1 : -1;
                    }
                    return x > y ? 1 : -1;
                }
            );
            setRows(sortedRows);
        }
    }, [sortParametrs, data, setRows, disableByCondition, selectedRowIds, keyField]);

    useEffect(() => {
        if (onCalculatingTotalData) {
            setTotalData(onCalculatingTotalData(rows));
        }
    }, [onCalculatingTotalData, rows, setTotalData]);

    const handleSorting = (field: string) => {
        if (rows.length) {
            const descDirection = sortParametrs.field === field ? !sortParametrs.descDirection : false;
            if (onSorting) {
                onSorting({ field, descDirection });
            }
        }
    };

    const handleAllRowsSelect = (isSelected: boolean) => {
        if (rows.length) {
            let selectedRows = new Set<number>();
            if (isSelected) {
                const selectedIds = rows.filter(row => !row.isDisabled).map(row => row[keyField]);
                selectedRows = new Set<number>([...selectedIds]);
            }
            setSelectedRowIds(selectedRows);
            onGetSelectedRowIds && onGetSelectedRowIds([...selectedRows]);
            setIsAllRowsSelected(isSelected);
        }
    };

    const handleRowSelect = ({ isSelected, rowId }: { isSelected: boolean; rowId: number }) => {
        let ids = null;
        if (isSelected) {
            ids = new Set<number>([...selectedRowIds, rowId]);
        } else {
            ids = new Set<number>([...selectedRowIds]);
            ids.delete(rowId);
        }
        setSelectedRowIds(ids);
        onGetSelectedRowIds && onGetSelectedRowIds([...ids]);
    };

    const actionsContext = {
        ...extraProps,
        handleSorting,
        handleAllRowsSelect,
        handleRowSelect,
        handleRowClick: onRowClick,
        handleRowDoubleClick: onRowDoubleClick,
    };

    const renderBody = () => <div className={css.Body}>{isLoading ? <Spinner /> : <BasicTableBody />}</div>;

    const renderFooter = () =>
        hasFooter && !isLoading ? (
            <div className={css.Footer}>
                <BasicTableFooter />
            </div>
        ) : null;

    return config && columnsMetrics.length ? (
        <div className={css.BasicTable}>
            <div className={css.Scroll}>
                <BasicTableContext.Provider
                    value={{
                        gridId,
                        columnsMetrics,
                        config,
                        currentRow,
                        gridWidth,
                        rows,
                        totalData,
                        actionCells,
                        sortParametrs,
                        actionsContext,
                        selectedRowIds,
                        isAllRowsSelected,
                    }}>
                    <div className={css.Header}>
                        <BasicTableHeader />
                    </div>
                    {renderBody()}
                    {renderFooter()}
                </BasicTableContext.Provider>
            </div>
        </div>
    ) : (
        <NoConfigText />
    );
}

BasicTable.defaultProps = defaultProps;
