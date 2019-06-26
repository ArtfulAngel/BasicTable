export interface ITableConfig {
    sorting: boolean;
    hasFooter?: boolean;
    headerConfig: Partial<IHeaderConfig>;
    bodyConfig: Partial<IBodyConfig>;
    rowConfig: Partial<IRowConfig>;
    columnsConfig: Partial<IColumnsConfig>;
}

interface IHeaderConfig {
    hasSelection: boolean;
    style: Partial<React.CSSProperties>;
}

interface IBodyConfig {
    noDataText: string;
    style: Partial<React.CSSProperties>;
}

export interface IRowConfig extends IHeaderConfig {
    keyField: string;
    hasSelection: boolean;
    selectionMode: RowSelectionMode;
    disableByCondition: IDisabledByCondition;
    style: React.CSSProperties;
}

export interface IDisabledByCondition {
    field: string;
    value: string | number;
    operator: Operators;
}

type Operators = '===' | '!==' | '<' | '>' | 'like';

type RowSelectionMode = 'single' | 'multiple';

interface IColumnsConfig {
    defaultColumnWidth: number;
}
