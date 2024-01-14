import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccounItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data, label }) {
  //console.log('Data in SuggestedAccounts:', data);
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data:', data);
    return null; // Hoặc hiển thị thông báo lỗi khác nếu cần
  }

  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {data.map((item) => (
        <AccountItem key={item._id} data={item} />
      ))}
      <p className={cx('more-btn')}>See all</p>
    </div>
  );
}

// SuggestedAccounts.propTypes = {
//   // Corrected typo here
//   label: PropTypes.string.isRequired,
//   data: PropTypes.array, // Adjusted propType to reflect that 'data' is an array
// };

export default SuggestedAccounts;
