// src/components/Profile.js
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx('profile-container')}>
      <div className={cx('profile-header')}>
        <Image
          className={cx('profile-cover')}
          src={images.BackGround}
          alt="Cover"
        />
        <Image className={cx('profile-avatar')} src={images.Vex} alt="Avatar" />
        <h1 className={cx('profile-name')}>Nguyễn Văn Đức</h1>
        <p className={cx('profile-bio')}>Hoạt động.</p>
      </div>

      <div className={cx('profile-content')}>
        <h2 className={cx('content-title')}>My Content</h2>
        <p className={cx('content-description')}>
          This is where you can showcase your posts, photos, and other content.
        </p>
        {/* Add more content components as needed */}
      </div>
    </div>
  );
};

export default Profile;
