import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';

const cx = classNames.bind(styles);

function SettingName() {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('Đức Nguyễn');

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    // Thêm logic để xử lý khi nhấn nút "Lưu"
    // Có thể gọi API hoặc thực hiện các công việc cần thiết ở đây
    // Ở đây mình chỉ cập nhật trạng thái, bạn cần thay đổi thành gọi API hoặc thực hiện các công việc khác tương ứng
    setIsEditing(false);
  };
  return (
    <div className={cx('FieldWrapper_wrapper')}>
      <div className={cx('fieldContent')}>
        <h3 className={cx('fieldContentLabel')}>Họ tên</h3>
        <div>
          <div
            className={cx('fieldContentEdit', {
              inputFieldEditing: isEditing,
            })}
          >
            <input
              type="text"
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

export default SettingName;
