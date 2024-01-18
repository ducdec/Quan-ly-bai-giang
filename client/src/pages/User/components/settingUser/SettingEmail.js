import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';

const cx = classNames.bind(styles);

function SettingEmail() {
  const [fullName, setFullName] = useState('Email');

  return (
    <div className={cx('FieldWrapper_wrapper')}>
      <div className={cx('fieldContent')}>
        <h3 className={cx('fieldContentLabel')}>Email</h3>
        <div>
          <div className={cx('fieldContentEdit')}>
            <input
              type="text"
              name="full_name"
              className={cx('fieldContentInput')}
              maxLength="50"
              placeholder="Thêm tên của bạn"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingEmail;
