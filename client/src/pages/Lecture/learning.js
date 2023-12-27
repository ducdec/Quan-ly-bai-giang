import styles from './Lecture.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function learning() {
  return <div className={cx('wrapper')}>ShowLecture</div>;
}

export default learning;
