import React, { useState } from 'react';

import { BasicTable } from '../BasicTable';
import { columns } from './columns';
import { config } from './table.config';

export function ExamplePage() {
    const [sortParametrs, setSortParametrs] = useState({ field: 'contractorName', descDirection: false });
    const [currentRow, setCurrentRow] = useState();

    // медод для получения выделенных ID строк
    const handleGetSelectedRows = (/* rowIds: number[] */) => {};

    const handleEditRow = (/* rowData */) => {};

    const handleRowClick = rowData => {
        setCurrentRow(rowData.id);
    };

    const handleRowDoubleClick = (/* rowData */) => {};

    const extraProps = {
        onEdit: handleEditRow,
        onRemove: null,
        onSorting: setSortParametrs,
        onGetSelectedRowIds: handleGetSelectedRows,
        // onCalculatingTotalData: getTotalDataOfFinalSettlement,
        onRowClick: handleRowClick,
        onRowDoubleClick: handleRowDoubleClick,
    };

    // const actionCells = { actionCell: ActionsCell };

    return (
        <div style={{ margin: '0.5rem', height: '600px' }}>
            <BasicTable
                id="example-basic-table"
                currentRow={currentRow}
                columns={columns}
                config={config}
                isLoading={false}
                sortParametrs={sortParametrs}
                data={[]}
                extraProps={extraProps}
                // actionCells={actionCells}
            />
        </div>
    );
}
