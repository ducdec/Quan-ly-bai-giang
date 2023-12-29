import React from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';
import { ProfileIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx('container')}>
      <section
        className={cx('content', 'module_gril', 'module_wide')}
        style={{ maxWidth: '1100px' }}
      >
        <div className={cx('header')}>
          <div className={cx('avatar')}>
            <Image src={images.Vex} alt="Ảnh đại diện" />
          </div>
          <div className={cx('info')}>
            <h1>Nguyễn Văn A</h1>
            <p>Lập trình viên / Nhà thiết kế web</p>
          </div>
        </div>

        <section className={cx('row')}>
          <section className={cx('col', 'col_left')}>
            <div className={cx('content-left')}>
              <div className={cx('Box_wrapper')}>
                <h4 className={cx('Box_title')}>Giới thiệu</h4>
                <div>
                  <div className={cx('Profile_participation')}>
                    <div className={cx('Profile_participation-icon')}>
                      <ProfileIcon />
                    </div>
                    <span>
                      Thành viên của{' '}
                      <span className={cx('Profile_highlight')}>
                        Quản Lý Bài Giảng
                      </span>{' '}
                      từ 4 năm trước
                    </span>
                  </div>
                </div>
              </div>
              <div className={cx('Box_wrapper')}>
                <h4 className={cx('Box_title')}>Hoạt động gần đây</h4>
                <div>
                  <div className={cx('Profile_no-result')}>
                    Chưa có hoạt động gần đây
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={cx('col', 'col_right')}>
            <div className={cx('Box_wrapper')}>
              <h4 className={cx('Box_title')}>Các khóa học đã xem</h4>
              <div>
                <div className={cx('Profile_inner')}>
                  <a className={cx('Profile_thumb')} href="/courses/nodejs">
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/courses/6.png"
                      className={cx('Profile_thumb-image')}
                      alt="Node &amp; ExpressJS"
                    />
                  </a>
                  <div className={cx('info')}>
                    <h3 className={cx('Profile_info-title')}>
                      <a href="/courses/nodejs">Node &amp; ExpressJS</a>
                    </h3>
                    <p className={cx('Profile_info-desc')}>
                      Học Back-end với Node &amp; ExpressJS framework, hiểu các
                      khái niệm khi làm Back-end và xây dựng RESTful API cho
                      trang web.
                    </p>
                  </div>
                </div>

                <div className={cx('Profile_inner')}>
                  <a className={cx('Profile_thumb')} href="/courses/nodejs">
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/courses/6.png"
                      className={cx('Profile_thumb-image')}
                      alt="Node &amp; ExpressJS"
                    />
                  </a>
                  <div className={cx('info')}>
                    <h3 className={cx('Profile_info-title')}>
                      <a href="/courses/nodejs">Node &amp; ExpressJS</a>
                    </h3>
                    <p className={cx('Profile_info-desc')}>
                      Học Back-end với Node &amp; ExpressJS framework, hiểu các
                      khái niệm khi làm Back-end và xây dựng RESTful API cho
                      trang web.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Profile;
