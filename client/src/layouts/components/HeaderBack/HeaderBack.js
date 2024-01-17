import classNames from 'classnames/bind';
import styles from './HeaderBack.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Tippy from '@tippyjs/react';

import {
  faCircleQuestion,
  //faCloudUpload,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';
import Back from '../Back';
import { useSelector } from 'react-redux';

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

function HeaderBack({ to }) {
  const currentUser = true;

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

  //
  const userMENU = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Trang cá nhân',
      to: `@${userStore.username}`,
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
        <Back to={to} />

        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <div></div>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}

          <Menu
            items={currentUser ? userMENU : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src={images.MeoMatTo}
                alt="Image"
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

export default HeaderBack;
