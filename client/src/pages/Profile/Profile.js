import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from '~/components/Image';
import images from '~/assets/images';
import { ProfileIcon } from '~/components/Icons';
import { setUser } from '~/store/userSlice';
import userService from '~/services/userServices';

const cx = classNames.bind(styles);

const Profile = () => {
  const userStore = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});

  const updateRoleUser = (role) => setUserData(role);

  useEffect(() => {
    console.log('useEffect đã được kích hoạt');
    const fetchUserFromToken = async () => {
      // Lấy token từ Local Storage
      const storedToken = localStorage.getItem('token');
      // Kiểm tra xem có token hay không
      if (storedToken) {
        try {
          // Gửi token lên server để xác thực
          const user = await userService.getUserFromToken();
          console.log('Dữ liệu người dùng nhận được:', user);
          // Nếu xác thực thành công, cập nhật state của ứng dụng

          const action = dispatch(setUser(user));
          console.log('Dispatch result:', action);
          updateRoleUser(user);
        } catch (error) {
          console.error('Error while fetching user:', error);
          // Xử lý lỗi (ví dụ: xóa token nếu không hợp lệ)
          localStorage.removeItem('token');
        }
      }
    };

    fetchUserFromToken();
  }, [dispatch]);

  useEffect(() => {
    // Khôi phục dữ liệu từ localStorage khi component được mounted
    const storedUser = localStorage.getItem('userStore');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Dispatch action setUser với parsedUser
      const data = dispatch(setUser(parsedUser));
      setUserData(data.payload);
      console.log(data.payload);
    }
  }, [dispatch]);
  console.log(userData.username);
  // Thời điểm bạn tạo tài khoản
  const accountCreationTime = new Date(userStore.createdAt);

  // Thời điểm hiện tại
  const currentTime = new Date();

  //console.log(accountCreationTime, currentTime);
  // Tính khoảng thời gian
  const timeDifference = currentTime.getTime() - accountCreationTime.getTime();

  const secondsDifference = timeDifference / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = Math.ceil(hoursDifference / 24);

  // Hàm chuyển đổi thành "X tháng trước"
  const formatMonthsAgo = (days) => {
    if (days > 30) {
      const months = Math.floor(days / 30);
      return ` từ ${months} tháng trước`;
    } else {
      return ` từ ${days} ngày trước`;
    }
  };
  const formattedTimeDifference = formatMonthsAgo(daysDifference);
  //console.log('Khoảng thời gian (ngày):', Math.ceil(daysDifference));
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
            <h1>{userData.username}</h1>
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
                      Thành viên của
                      <span className={cx('Profile_highlight')}>
                        <span> Quản Lý Bài Giảng</span>
                      </span>
                      {formattedTimeDifference}
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
