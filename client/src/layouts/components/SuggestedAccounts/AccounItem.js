import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useEffect } from 'react';

import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview data={data} />
        </PopperWrapper>
      </div>
    );
  };

  const [dataInstructors, setDataInstructors] = useState([]);
  //const [dataLectures, setDataLectures] = useState([]);
  useEffect(() => {
    setDataInstructors(data.instructors || []);
    //setDataLectures(data.lectures || []);
  }, [data.instructors]);

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
          <Image className={cx('avatar')} src={data.imageUrl} alt="anpha" />

          <div className={cx('item-info')}>
            <h4 className={cx('nickname')}>
              <strong>{data.name}</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </h4>
            {dataInstructors && dataInstructors.length > 0 && (
              <p className={cx('name')}>
                {dataInstructors.map((ins) => ins.name).join(', ')}
              </p>
            )}{' '}
          </div>
        </div>
      </Tippy>
    </div>
  );
}

AccountItem.prototype = {};

export default AccountItem;
