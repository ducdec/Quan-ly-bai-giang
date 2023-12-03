import styles from './ScollList.module.scss';
import classNames from 'classnames/bind';

import CourseItem from './CourseItem';
const cx = classNames.bind(styles);

function ScollList() {
  return (
    <div className={cx('ScollList')}>
      <div>
        <div className={cx('SL-heading-wrap')}>
          <h2 className={cx('SL-heading')}>
            <span>Khoa hoc pro</span>
          </h2>
        </div>
      </div>

      <div className={cx('body')}>
        <section className={cx('index-module-row')}>
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
        </section>
      </div>
    </div>
  );
}

export default ScollList;
