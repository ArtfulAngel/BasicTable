import { ITableConfig } from '../types/table.config';

export const config: ITableConfig = {
    sorting: true,
    hasFooter: false,

    headerConfig: {
        hasSelection: true,
        style: { backgroundColor: '#F3F4F5', color: '#6D7986' },
    },

    bodyConfig: {
        noDataText: 'Нет данных',
        style: { backgroundColor: '#FFF' },
    },

    rowConfig: {
        keyField: 'id',
        hasSelection: true,
        selectionMode: 'single',
        disableByCondition: { field: 'sumPos', operator: '<', value: 20000 },
        style: { height: '35px' },
    },

    columnsConfig: { defaultColumnWidth: 150 },
};
