import { useState } from 'react';

export function useGetDataRows() {
    const [rows, setRows] = useState([]);
    const [totalData, setTotalData] = useState(null);
    const [selectedRowIds, setSelectedRowIds] = useState(new Set<number>());
    const [isAllRowsSelected, setIsAllRowsSelected] = useState(false);

    return {
        setRows,
        rows,
        selectedRowIds,
        setSelectedRowIds,
        isAllRowsSelected,
        setIsAllRowsSelected,
        totalData,
        setTotalData,
    };
}
