import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccounItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data, label }) {
  const itemsToShowInitially = 3;
  const itemsToShowIncrement = 5;
  const [visibleItems, setVisibleItems] = useState(itemsToShowInitially);
  const [showAll, setShowAll] = useState(false);

  const handleSeeAllClick = () => {
    setShowAll(true);
    setVisibleItems(
      (prevVisibleItems) => prevVisibleItems + itemsToShowIncrement,
    );
  };

  const handleSeeLessClick = () => {
    setShowAll(false);
    setVisibleItems(itemsToShowInitially);
  };

  if (!data || !Array.isArray(data)) {
    console.error('Invalid data:', data);
    return null; // Hoặc hiển thị thông báo lỗi khác nếu cần
  }

  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {data.slice(0, visibleItems).map((item) => (
        <AccountItem key={item._id} data={item} />
      ))}
      {visibleItems < data.length && !showAll && (
        <p className={cx('more-btn')} onClick={handleSeeAllClick}>
          Xem thêm
        </p>
      )}
      {showAll && (
        <p className={cx('more-btn')} onClick={handleSeeLessClick}>
          Thu gọn
        </p>
      )}
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default SuggestedAccounts;
