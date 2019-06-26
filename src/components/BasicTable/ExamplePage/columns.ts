import { IColumn } from '../types/table.columns';

export const columns: IColumn[] = [
    {
        fieldName: 'category',
        fieldCaption: 'Категория',
        type: 'string',
        align: 'left',
        width: 150,
    },
    {
        fieldName: 'title',
        fieldCaption: 'Название',
        type: 'string',
        align: 'left',
        width: 350,
    },
    {
        fieldName: 'imageCount',
        fieldCaption: 'Кол. Изображений',
        type: 'number',
        align: 'center',
        width: 150,
    },
    {
        fieldName: 'image_url',
        fieldCaption: 'Url превьюшки',
        type: 'string',
        align: 'right',
        width: 200,
    },
    {
        fieldName: 'price',
        fieldCaption: 'Цена',
        type: 'currency',
        align: 'right',
        width: 150,
    },
    {
        fieldName: 'url',
        fieldCaption: 'Ссылка',
        type: 'string',
        align: 'left',
        width: 350,
    },
];
