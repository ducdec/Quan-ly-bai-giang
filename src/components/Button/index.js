import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  small = false,
  large = false,
  children,
  rightIcon,
  leftIcon,
  onClick,
  ...passsProps
}) {
  let Comp = 'button';

  const props = { onClick, ...passsProps };

  //remove event
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof [key] === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    rounded,
    text,
    disabled,
    small,
    large,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
