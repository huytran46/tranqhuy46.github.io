import './Button.scss';

import clsx from 'clsx';
import React from 'react';

type ButtonVariant = 'solid' | 'outlined' | 'ghost';
interface ButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  rightIcon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    variant = 'solid',
    children,
    rightIcon,
    ...nativeProps
  } = props;

  return (
    <button
      {...nativeProps}
      className={clsx(
        'cj-button',
        {
          'cj-button--ghost': variant === 'ghost',
          'cj-button--solid': variant === 'solid',
          'cj-button--outlined': variant === 'outlined',
        },
        className,
      )}>
      <span className="cj-button__body">{children}</span>
      {rightIcon != null && (
        <span className="cj-button__append">
          {React.cloneElement(rightIcon, {
            ...rightIcon.props,
            className: clsx(
              rightIcon.props.className,
              'cj-button__append__icon',
            ),
          })}
        </span>
      )}
    </button>
  );
};

export default Button;
