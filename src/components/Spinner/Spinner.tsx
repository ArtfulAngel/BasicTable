import React from 'react';
import classNames from 'classnames/bind';
import css from './Spinner.scss';

const cx = classNames.bind(css);

interface ISpinnerProps {
    withBackdrop: boolean;
    message: string;
}

const defaultProps = {
    withBackdrop: false,
    message: '',
};

export function Spinner(props: ISpinnerProps) {
    const { withBackdrop, message } = props;
    const style = cx(css.Spinner, { [css.WithBackdrop]: withBackdrop });

    return (
        <div className={style}>
            <div className={css.Loader}>
                <svg className={css.Circular} viewBox="25 25 50 50">
                    <circle
                        className={css.Path}
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        strokeWidth="3"
                        strokeMiterlimit="10"
                    />
                </svg>
            </div>
            {message && <p className={cx(css.Message, { [css.IsWithBackdrop]: withBackdrop })}>{message}</p>}
        </div>
    );
}

Spinner.defaultProps = defaultProps;
