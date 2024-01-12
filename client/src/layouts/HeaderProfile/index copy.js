import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch/HeaderNoSearch';
import classNames from 'classnames/bind';
import styles from '../HeaderOnly/HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderProfile({ children }) {
  return (
    <div className={cx('wrapper')}>
      <HeaderNoSearch />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default HeaderProfile;
