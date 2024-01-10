import styles from './LectureItem.module.scss';
import classNames from 'classnames/bind';
//import { Link } from 'react-router-dom';
import { StartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
//to={`/learning/${slug}?id=${lecture._id}`}
function LectureItem({ lecture, slug }) {
  return (
    <div className={cx('lessonItem')}>
      <div>
        <span className={cx('floatLeft')}>
          <StartIcon className={cx('icon')} />
          <div className={cx('lectureName')}>{lecture.name}</div>
        </span>
        <span className={cx('floatRight')}>time</span>
      </div>
    </div>
  );
}

export default LectureItem;
