import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import config from '~/config';

import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function HeaderPublic() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <Image src={images.logo} alt="#" />
        </Link>
        <Search />

        <div className={cx('actions')}>
          <>
            <Button to={config.routes.signIn} primary>
              Đăng nhập
            </Button>
          </>

          {/* <button className={cx('more-btn')}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button> */}
        </div>
      </div>
    </header>
  );
}

export default HeaderPublic;
