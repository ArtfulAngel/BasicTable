import moment from 'moment';

export const formaterCell = (type: string, value: string | number, displayFormat?: string) => {
    if (type === 'currency') {
        return !isNaN(Number(value)) ? Number(value).toLocaleString('ru') : '0';
    }
    if (type === 'date') {
        return value ? dateFormatter({ value, displayFormat }) : '';
    }
    return value;
};

export const dateFormatter = ({ value, displayFormat = '', formatMoment = 'DD.MM.YYYY' }) => {
    return moment(value, formatMoment).format(displayFormat);
};
