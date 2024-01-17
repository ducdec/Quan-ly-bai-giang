import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import Search from '../Search';

const cx = classNames.bind(styles);

function HeaderPublic() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Search />

        <div className={cx('actions')}>
          <>
            <Button primary>Log in</Button>
          </>

          <button className={cx('more-btn')}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderPublic;
