import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview />
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div>
      <Tippy
        interactive
        delay={[800, 0]}
        offset={[-20, 0]}
        placement="bottom-start"
        render={renderPreview}
      >
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
      </Tippy>
    </div>
  );
}

AccountItem.prototype = {};

export default AccountItem;
