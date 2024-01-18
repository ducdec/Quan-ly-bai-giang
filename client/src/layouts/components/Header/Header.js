import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import {
  faCloudUpload,
  faGear,
  faSignOut,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';
import { useSelector } from 'react-redux';
//import { logoutUser } from '~/store/userSlice';

const cx = classNames.bind(styles);

function Header() {
  //const dispatch = useDispatch();
  const userStore = useSelector((state) => state.data);

  //Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        //Handle'
        break;
      default:
    }
  };
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };
  //
  const userMENU = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Trang cá nhân',
      to: `/@${userStore.username}`,
      separate: true,
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Cài đặt',
      to: `/users/setting`,
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
          <div className={cx('action')}>
            <>
              <Tippy
                delay={[0, 200]}
                content="Thêm khóa học"
                placement="bottom"
              >
                <Link
                  to={config.routes.createCourse}
                  className={cx('action-btn')}
                >
                  <FontAwesomeIcon icon={faCloudUpload} />
                </Link>
              </Tippy>

              <Tippy
                delay={[0, 200]}
                content="Thêm giảng viên"
                placement="bottom"
              >
                <Link to={config.routes.CreateIns} className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </Tippy>
            </>
          </div>

          <Menu items={userMENU} onChange={handleMenuChange}>
            <Image
              className={cx('user-avatar')}
              src={images.MeoMatTo}
              alt="avatar"
            />
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
