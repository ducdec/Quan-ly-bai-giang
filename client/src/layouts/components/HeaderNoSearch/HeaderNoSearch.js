import classNames from 'classnames/bind';
import styles from '../HeaderNoSearch/HeaderNoSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import Image from '~/components/Image';
import { BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Languagesss',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tieng Viet',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shorcuts',
  },
];

function HeaderNoSearch() {
  const currentUser = true;

  //Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        //Handle'
        break;
      default:
    }
  };

  //
  const userMENU = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Trang cá nhân',
      to: '@hoaa',
      separate: true,
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coins',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: config.routes.signIn,
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to={config.routes.home} className={cx('logo-link')}>
            <Image src={images.logo} alt="#" />
          </Link>
          <a href="/" class="NavBar_backHome__U1RTm">
            <h4 class="NavBar_logoHeading__bs7MP">
              <BackIcon />
              <span>Quay lại</span>
            </h4>
          </a>
        </div>
        <div className={cx('actions')}>
          <Menu
            items={currentUser ? userMENU : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src={images.MeoMatTo}
                alt="Nguyen Van Duc"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default HeaderNoSearch;
