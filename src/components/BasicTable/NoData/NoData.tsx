import React from 'react';

import css from './NoData.module.scss';

export function NoConfigText() {
    return <div className={css.NoData}>Отсутствуют настройки для таблицы!</div>;
}

export function NoDataText({ value }: { value: string }) {
    return <div className={css.NoData}>{value}</div>;
}
