import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';

const cx = classNames.bind(styles);

function SettingName({ updateData, data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(data);
  console.log(data, 'name', fullName);
  // Tạo ref cho input
  const inputRef = useRef(null);

  useEffect(() => {
    // Nếu đang ở trạng thái chỉnh sửa, đặt tiêu điểm vào ô input
    if (isEditing) {
      inputRef.current.focus();
    }
    setFullName(data);
  }, [isEditing, data]);

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    // Nếu muốn hủy các thay đổi khi nhấn nút "Hủy", bạn có thể khôi phục giá trị ban đầu ở đây
    setFullName(data);
    setIsEditing(false);
  };

  const saveChanges = () => {
    setIsEditing(false);
    updateData(fullName);
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
              ref={inputRef}
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
