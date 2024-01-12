import React from 'react';
import HeaderBack from '../components/HeaderBack';
import classNames from 'classnames/bind';
import styles from '../HeaderOnly/HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderBackOnly({ children, to }) {
  return (
    <div className={cx('wrapper')}>
      <HeaderBack to={to} />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default HeaderBackOnly;
