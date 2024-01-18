import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import userService from '~/services/userServices';
import { setUser } from '~/store/userSlice';
//import { logoutUser } from '~/store/userSlice';

const cx = classNames.bind(styles);

function HeaderUser() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});

  const updateRoleUser = (user) => setUserData(user);

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

  //Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        //Handle'
        break;
      default:
    }
  };

  const userMENU = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Trang cá nhân',
      to: `/@${userData.username}`,
      separate: true,
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/users/setting',
    },
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Đăng xuất',
      to: config.routes.signIn,
      //onClick: handleLogout,
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <Image src={images.logo} alt="#" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <Menu items={userMENU} onChange={handleMenuChange}>
            <Image
              className={cx('user-avatar')}
              src={userData.image}
              alt="avatar"
            />
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
