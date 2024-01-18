import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';

const cx = classNames.bind(styles);

function SettingPassword({ updateData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setError('');
    clearPasswords();
  };

  const saveChanges = () => {
    if (password === confirmPassword) {
      // Mật khẩu và xác nhận mật khẩu giống nhau
      setIsEditing(false);
      setError('');
      clearPasswords();
      updateData(password);
    } else {
      // Hiển thị thông báo lỗi nếu mật khẩu và xác nhận mật khẩu không khớp
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
    }
  };

  const clearPasswords = () => {
    setPassword('');
    setConfirmPassword('');
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
              name="password"
              className={cx('fieldContentInput')}
              maxLength="50"
              placeholder="Mật khẩu"
              disabled={!isEditing}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isEditing && (
              <input
                type="password"
                name="confirm_password"
                className={cx('fieldContentInput')}
                maxLength="50"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>
          {error && <p className={cx('errorText')}>{error}</p>}
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
