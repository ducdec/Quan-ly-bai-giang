import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('account-item')}>
      <Image className={cx('avatar')} src={images.MeoLeLuoi} alt="anpha" />
      <div className={cx('item-info')}>
        <h4 className={cx('nickname')}>
          <strong>ducdeptrai</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <p className={cx('name')}>Nguyen Van Duc</p>
      </div>
    </div>
  );
}

AccountItem.prototype = {};

export default AccountItem;
