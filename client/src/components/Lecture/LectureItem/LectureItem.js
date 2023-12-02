import styles from './LectureItem.module.scss';
import classNames from 'classnames/bind';
import { StartIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

function LectureItem() {
  return (
    <div className={cx('lessonItem')}>
      <span className={cx('floatLeft')}>
        <StartIcon className={cx('icon')} />
        <div className={cx('lectureName')}>1. Gioi thieu khoa hoc</div>
      </span>
      <span className={cx('floatRight')}>1:03</span>
    </div>
  );
}

export default LectureItem;
