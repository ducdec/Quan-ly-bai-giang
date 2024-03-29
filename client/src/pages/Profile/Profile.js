import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Image from '~/components/Image';
import { ProfileIcon } from '~/components/Icons';
import { setUser } from '~/store/userSlice';
import userService from '~/services/userServices';
import ItemCourse from './components/item';

const cx = classNames.bind(styles);

const Profile = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});

  const updateRoleUser = (user) => setUserData(user);

  useEffect(() => {
    const fetchUserFromToken = async () => {
      // Lấy token từ Local Storage
      const storedToken = localStorage.getItem('token');
      // Kiểm tra xem có token hay không
      if (storedToken) {
        try {
          // Gửi token lên server để xác thực
          const user = await userService.getUserFromToken();

          dispatch(setUser(user));
          //console.log('Dispatch result:', action);
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

  //console.log(userData);

  // Time
  const accountCreationTime = new Date(userData.createdAt);

  // Thời điểm hiện tại
  const currentTime = new Date();

  //console.log(accountCreationTime, currentTime);
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
            <Image src={userData.image} alt="Ảnh đại diện" />
          </div>
          <div className={cx('info')}>
            <h1>{userData.username}</h1>
            <p>{userData.role === 'Admin' ? 'Quản trị viên' : 'Thành viên'}</p>
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
              <ItemCourse />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Profile;
