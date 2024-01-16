import { StartIcon } from '~/components/Icons';
import styles from './TrackItem.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function TrackItem({ lectures, nameCourse, length, slug }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [viewedLectures, setViewedLectures] = useState([]);

  const { pathname } = useLocation();
  useEffect(() => {
    // Kiểm tra xem pathname có khớp với điều kiện mong muốn hay không
    if (pathname === `/learning/${slug}`) {
      // Thực hiện logic để xác định activeIndex (trong trường hợp này là 0)
      setActiveIndex(0);
    } else {
      setActiveIndex(null);
    }
  }, [pathname, slug]);

  const handleClick = (index) => {
    // Hàm xử lý khi Link được nhấp vào
    setActiveIndex(index);
  };

  const markAsViewed = (index) => {
    setViewedLectures((prevViewedLectures) => [...prevViewedLectures, index]);
  };
  return (
    <>
      <div className={cx('TrackItem_wrapper')}>
        <h3 className={cx('TrackItem_title')}>{nameCourse}</h3>
        <span className={cx('TrackItem_desc')}>
          {length} / {length}
        </span>
        <span className={cx('TrackItem_icon')}></span>
      </div>
      <div className={cx('trackItem_list')}>
        {lectures.map((lec, i) => (
          <Link
            to={`/learning/${slug}?id=${lec._id}`}
            key={lec._id}
            className={cx('StepItem_wrapper', 'learn-item-1', {
              active: activeIndex === i,
              viewed: viewedLectures.includes(i),
            })}
            onClick={() => {
              handleClick(i);
              markAsViewed(i);
            }}
          >
            <div className={cx('StepItem_info')}>
              <h3 className={cx('StepItem_title')}>
                {i + 1}. {lec.name}
              </h3>
              <p className={cx('StepItem_desc')}>
                <StartIcon className={cx('lesson-icon')} />
                <span></span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default TrackItem;
