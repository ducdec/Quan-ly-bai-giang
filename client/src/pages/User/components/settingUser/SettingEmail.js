import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';

const cx = classNames.bind(styles);

function SettingEmail({ data }) {
  const [fullName, setFullName] = useState(data);

  useEffect(() => {
    // Nếu đang ở trạng thái chỉnh sửa, đặt tiêu điểm vào ô input

    setFullName(data);
  }, [data]);

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
