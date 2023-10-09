import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/112e8aa3f166bae9646db579f4878217~c5_300x300.webp?x-expires=1697007600&x-signature=OkD4idtAYM8XrXzWa%2BPJxVxIYuI%3D"
      />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>nguyen van a</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <span className={cx('usernames')}>Nguyenvana</span>
      </div>
    </div>
  );
}

export default AccountItem;
