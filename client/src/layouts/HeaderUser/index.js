import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderUser.module.scss';
import HeaderUser from '../components/Header/HeaderUser';

const cx = classNames.bind(styles);

function HeaderUsers({ children }) {
  return (
    <div className={cx('wrapper')}>
      <HeaderUser />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default HeaderUsers;
