import { ITableConfig } from './table.config';
import { IColumn } from './table.columns';

export const defaultProps = {
    currentRow: undefined,
    id: 'basic-table',
    isLoading: false,
};

type BasicProps = typeof defaultProps;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBasicTableProps extends BasicProps {
    data: any;
    columns: IColumn[];
    config: ITableConfig;
    sortParametrs?: { field: string; descDirection: boolean };
    extraProps?: Partial<IExtraProps>;
    actionCells?: { [key: string]: any };
}

interface IExtraProps {
    onSorting: ({ field, descDirection }: { field: string; descDirection: boolean }) => void;
    onGetSelectedRowIds: (rowIds: number[]) => void;
    onCalculatingTotalData: (rows: any) => void;
    onRowClick: (row: object) => void;
    onRowDoubleClick: (row: object) => void;
}

export interface IBasicTableContext {
    gridId: string;
    columnsMetrics: IColumn[];
    config: ITableConfig;
    currentRow: number;
    gridWidth: string;
    selectedRowIds: Set<number>;
    isAllRowsSelected: boolean;
    rows: any;
    totalData: any;
    sortParametrs: { field: string; descDirection: boolean };
    actionsContext: Partial<IActionsContext>;
    actionCells?: { [key: string]: any };
}

export interface IActionsContext {
    handleSorting: (field: string) => void;
    handleAllRowsSelect: (isSelected: boolean) => void;
    handleRowSelect: ({ isSelected, rowId }: { isSelected: boolean; rowId: number }) => void;
    handleRowClick: (row: object) => void;
    handleRowDoubleClick: (row: object) => void;
}
