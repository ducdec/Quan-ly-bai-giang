import styles from './Lecture.module.scss';
import classNames from 'classnames/bind';
import ListLecture from '~/layouts/components/Lecture/ListLecture';

const cx = classNames.bind(styles);

function Lecture() {
  return (
    <div className={cx('wrapper')}>
      <ListLecture />
    </div>
  );
}

export default Lecture;
