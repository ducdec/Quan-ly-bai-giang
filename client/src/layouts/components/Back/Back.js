import classNames from 'classnames/bind';
import styles from './Back.module.scss';
import { Link } from 'react-router-dom';
import { BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Back({ to }) {
  return (
    <Link to={to} className={cx('logo-link')}>
      <div className={cx('icon')}>
        <BackIcon className={cx('iconBack')} />
        <span>Quay lại</span>
      </div>
    </Link>
  );
}

export default Back;
