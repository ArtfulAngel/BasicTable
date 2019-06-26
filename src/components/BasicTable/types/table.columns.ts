// TODO подумать над передачей типа данных с бэка
export interface IColumn {
    indexSort?: number;
    fieldName: string;
    fieldCaption?: string;
    sortable?: boolean;
    type?: TColumnTypes;
    hint?: boolean;
    resizing?: boolean;
    displayFormat?: DisplayFormats<keyof IAllDisplayFormats>;
    width?: number;
    align?: Align;
    extraProps?: string;
    style?: Partial<React.CSSProperties>;
    highlight?: boolean;
    action?: string;
}

export type TColumnTypes = 'string' | 'number' | 'date' | 'selector' | 'currency' | 'action';

export type TTextDisplayFormats = 'capitalize' | 'capitalize-first' | 'lowercase' | 'uppercase';

export type TDateDisplayFormats = 'date' | 'UTC' | 'ISO';

export type TNumericDisplayFormats = 'digit' | 'fixed2';

export type DisplayFormats<K extends keyof IAllDisplayFormats> = IAllDisplayFormats[K];

export interface IAllDisplayFormats {
    string: TTextDisplayFormats;
    number: TNumericDisplayFormats;
    date: TDateDisplayFormats;
}

type Align = 'left' | 'right' | 'center' | 'justify';

export const columnCheckbox: IColumn = {
    fieldName: '_cb',
    fieldCaption: '',
    type: 'selector',
    width: 50,
    action: 'handleSelectRow',
};
