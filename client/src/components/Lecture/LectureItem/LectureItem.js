import styles from './LectureItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { StartIcon } from '~/components/Icons';
import config from '~/config';
const cx = classNames.bind(styles);

function LectureItem() {
  return (
    <div className={cx('lessonItem')}>
      <Link to={config.routes.learning}>
        <span className={cx('floatLeft')}>
          <StartIcon className={cx('icon')} />
          <div className={cx('lectureName')}>1. Nguyễn Văn A</div>
        </span>
        <span className={cx('floatRight')}>13 video</span>
      </Link>
    </div>
  );
}

export default LectureItem;
