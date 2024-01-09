import { StartIcon } from '~/components/Icons';
import styles from './TrackItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TrackItem({ lectures, nameCourse, index, slug }) {
  return (
    <>
      <div className={cx('TrackItem_wrapper')}>
        <h3 className={cx('TrackItem_title')}>{nameCourse}</h3>
        <span className={cx('TrackItem_desc')}>{index}/? | 20:39</span>
        <span className={cx('TrackItem_icon')}></span>
      </div>
      <div className={cx('trackItem_list')}>
        {lectures.map((lec) => (
          <Link
            to={`/learning/${slug}?id=${lec._id}`}
            key={lec._id}
            className={cx('StepItem_wrapper', 'learn-item-1')}
          >
            <div className={cx('StepItem_info')}>
              <h3 className={cx('StepItem_title')}>{lec.name}</h3>
              <p className={cx('StepItem_desc')}>
                <StartIcon className={cx('lesson-icon')} />
                <span>03:15</span>
              </p>
            </div>
            {/* <div className={cx('StepItem_icon-box')}>
                <CheckIcon />
              </div> */}
          </Link>
        ))}
      </div>
    </>
  );
}

export default TrackItem;