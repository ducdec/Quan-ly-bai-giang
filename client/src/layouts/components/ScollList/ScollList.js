import styles from './ScollList.module.scss';
import classNames from 'classnames/bind';
import CourseItem from './CourseItem';

const cx = classNames.bind(styles);

function ScollList({ status, courses }) {
  return (
    <div className={cx('ScollList')}>
      <div className={cx('SL-heading-wrap')}>
        <h2 className={cx('SL-heading')}>
          <span>{`Khóa học ${status}`}</span>
        </h2>
      </div>

      <div className={cx('body')}>
        <section className={cx('row')}>
          {/* Sử dụng && để kiểm tra courses và courses.length trước khi lặp */}
          {courses &&
            courses.length > 0 &&
            courses.map((course) => (
              <CourseItem
                key={course._id}
                name={course.name}
                link={course.slug}
                image={course.imageFile || course.imageUrl}
              />
            ))}
        </section>
      </div>
    </div>
  );
}

export default ScollList;
