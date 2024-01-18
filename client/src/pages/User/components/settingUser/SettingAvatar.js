import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingName.module.scss';
import { CamIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function SettingAvatar() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    'https://graph.facebook.com/1117867828580619/picture?width=400&height=400',
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const saveChanges = () => {
    // Add logic to handle save changes (e.g., API call or state update)
    setIsEditing(false);
  };

  return (
    <div className={cx('FieldWrapper_wrapper')}>
      <div className={cx('fieldContent')}>
        <h3 className={cx('fieldContentLabel')}>Avatar</h3>

        <div className={cx('fieldContentEdit')}>
          <div className={cx('contentBody')}>
            Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
          </div>

          <div className={cx('contentImage')}>
            <div className={cx('PhotoField_avatar')}>
              <div
                className={cx('FallbackAvatar_avatar')}
                style={{ '--font-size': '8.9px' }}
              >
                <img
                  src={isEditing ? selectedImage || avatarUrl : avatarUrl}
                  alt="Đức Nguyễn"
                />
              </div>
            </div>

            {isEditing && (
              <label htmlFor="avatar">
                <div className={cx('PhotoField_chooseAva')}>
                  <CamIcon />
                </div>
                <div className={cx('PhotoField_pickAva')}>
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    id="avatar"
                    onChange={handleImageChange}
                  />
                </div>
              </label>
            )}
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

export default SettingAvatar;
