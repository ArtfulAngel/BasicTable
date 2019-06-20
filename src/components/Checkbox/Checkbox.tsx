import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Checkbox.scss';

const cx = classNames.bind(styles);

interface ICheckboxProps {
    name?: string;
    label?: string;
    checked: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (value: boolean) => void;
}

export function Checkbox({ name = 'checkbox', disabled, indeterminate, checked, label, onChange }: ICheckboxProps) {
    // debugger;
    const getClassNames = () =>
        cx(
            styles.Checkbox,
            { [styles.isDisabled]: disabled },
            { [styles.isChecked]: Boolean(!indeterminate && checked) },
            { [styles.Indeterminate]: indeterminate }
        );

    const handleChange = e => {
        e.preventDefault();
        const { onChange, disabled, indeterminate, checked } = props;

        if (indeterminate) {
            onChange(false);
        } else {
            onChange(!checked);
        }
    };

    return (
        <div className={getClassNames()} onClick={!disabled ? handleChange : null}>
            <div className={styles.Box}>
                <input
                    className={styles.Control}
                    name={name}
                    type="checkbox"
                    disabled={disabled}
                    checked={checked}
                    onChange={handleChange}
                />
            </div>
            {label}
        </div>
    );
}
