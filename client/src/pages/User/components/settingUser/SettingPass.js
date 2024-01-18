import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';

const cx = classNames.bind(styles);

function SettingPassword() {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('Mật khẩu');

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };
  return (
    <div className={cx('FieldWrapper_wrapper')}>
      <div className={cx('fieldContent')}>
        <h3 className={cx('fieldContentLabel')}>Mật khẩu</h3>
        <div>
          <div
            className={cx('fieldContentEdit', {
              inputFieldEditing: isEditing,
            })}
          >
            <input
              type={isEditing ? 'text' : 'password'}
              name="full_name"
              className={cx('fieldContentInput')}
              maxLength="50"
              placeholder="Thêm tên của bạn"
              disabled={!isEditing}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={cx('fieldBtn')}>
        {isEditing ? (
          <>
            <button className={cx('Button', 'btn-save')} onClick={saveChanges}>
              Lưu
            </button>
            <button
              className={cx('Button', 'ButtonDefault')}
              onClick={cancelEditing}
            >
              Hủy
            </button>
          </>
        ) : (
          <button
            className={cx('Button', 'ButtonDefault')}
            onClick={startEditing}
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
}

export default SettingPassword;
