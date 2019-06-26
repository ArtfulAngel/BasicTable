import React, { useRef, useState, useEffect } from 'react';
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

export function Checkbox({
    name = 'customCheckbox',
    disabled = false,
    indeterminate = false,
    checked,
    label = ' ',
    onChange,
}: ICheckboxProps) {
    const checkboxInputRef = useRef(null);

    useEffect(() => {
        if (checkboxInputRef) {
            checkboxInputRef.current.indeterminate = indeterminate && checked;
        }
    }, [indeterminate]);

    const handleChange: React.ChangeEventHandler<HTMLElement> = event => {
        event.preventDefault();
        if (indeterminate) {
            onChange && onChange(false);
        } else {
            onChange && onChange(!checked);
        }
    };

    return (
        <div className={styles.Checkbox}>
            <input
                id={name}
                name={name}
                ref={checkboxInputRef}
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={handleChange}
            />
            {label && <label htmlFor={name}>{label}</label>}
        </div>
    );
}
