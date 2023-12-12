import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccounItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
  //const [accounts, setAccounts] = useState([]);

  useEffect(() => {});
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>

      <AccountItem />
      <AccountItem />
      <AccountItem />

      <p className={cx('more-btn')}>See all</p>
    </div>
  );
}

SuggestedAccounts.propTyopes = {
  label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
