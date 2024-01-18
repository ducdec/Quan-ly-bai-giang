import classNames from 'classnames/bind';
import styles from '../HeaderNoSearch/HeaderNoSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import Image from '~/components/Image';
import { BackIcon } from '~/components/Icons';
import { useSelector } from 'react-redux';
//import { logoutUser } from '~/store/userSlice';

const cx = classNames.bind(styles);

function HeaderNoSearch() {
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
      title: 'Settings',
      to: '/users/setting',
    },
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: config.routes.signIn,
      separate: true,
      //onClick: handleLogout,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <Image src={images.logo} alt="#" />
          <div className={cx('icon')}>
            <BackIcon className={cx('iconBack')} />
            <span>Quay lại</span>
          </div>
        </Link>
        <div className={cx('actions')}>
          <Menu items={userMENU} onChange={handleMenuChange}>
            <Image
              className={cx('user-avatar')}
              src={userStore.image}
              alt="Nguyen Van Duc"
            />
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default HeaderNoSearch;
