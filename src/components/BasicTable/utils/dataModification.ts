import { IDisabledByCondition } from '../types/table.config';

const getDisabledState = (fieldValue: string | number, disableByCondition: IDisabledByCondition) => {
    if (disableByCondition) {
        const { operator, value } = disableByCondition;

        switch (operator) {
            default:
            case '===':
                return fieldValue === value;
            case '!==':
                return fieldValue !== value;
            case '>':
                return fieldValue > value;
            case '<':
                return fieldValue < value;
            case 'like':
                return String(fieldValue)
                    .toLowerCase()
                    .includes(String(value).toLowerCase());
        }
    }
    return false;
};

const getSelectedState = ({ selectedRowIds, rowId }: { selectedRowIds: Set<number>; rowId: number }) => {
    const isSelected = selectedRowIds.has(Number(rowId));
    return isSelected;
};

export const getRowsFromData = ({
    data,
    disableByCondition,
    selectedRowIds,
    keyField,
}: {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data: any;
    disableByCondition?: IDisabledByCondition;
    selectedRowIds: Set<number>;
    keyField: string;
}) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const rows = data.map((row: any) => {
        const rowId = row[keyField];
        const isDisabled =
            disableByCondition && getDisabledState(row[disableByCondition.field], disableByCondition);
        const isSelected = !isDisabled && getSelectedState({ selectedRowIds, rowId });

        const rowModified = { ...row, isDisabled, isSelected };
        return rowModified;
    });

    return rows;
};
