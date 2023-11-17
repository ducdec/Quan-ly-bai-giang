import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <Image className={cx('avatar')} src={images.MeoLeLuoi} alt="" />
        <div>
          <Button className={cx('watch-btn')} primary>
            Xem
          </Button>
        </div>
      </div>

      <div className={cx('body')}>
        <h4 className={cx('nickname')}>
          <strong>ducdeptrai</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <p className={cx('name')}>Nguyen Van Duc</p>
        <p className={cx('analysis')}>
          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>Likes</span>
          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>follow</span>
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;
