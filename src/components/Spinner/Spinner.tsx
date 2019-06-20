import React from 'react';
import classNames from 'classnames/bind';
import styles from './Spinner.scss';

const cx = classNames.bind(styles);

interface ISpinnerProps {
    withBackdrop: boolean;
    message: string;
}

export function Spinner(props: ISpinnerProps) {
    const { withBackdrop = false, message = '' } = props;
    const style = cx(styles.Spinner, { [styles.WithBackdrop]: withBackdrop });

    return (
        <div className={style}>
            <div className={styles.Loader}>
                <svg className={styles.Circular} viewBox="25 25 50 50">
                    <circle
                        className={styles.Path}
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        strokeWidth="3"
                        strokeMiterlimit="10"
                    />
                </svg>
            </div>
            {message && <p className={cx(styles.Message, { [styles.IsWithBackdrop]: withBackdrop })}>{message}</p>}
        </div>
    );
}
