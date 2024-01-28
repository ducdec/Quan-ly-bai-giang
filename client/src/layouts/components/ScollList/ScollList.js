import styles from './ScollList.module.scss';
import classNames from 'classnames/bind';
import CourseItem from './CourseItem';

const cx = classNames.bind(styles);

function ScollList({ status, courses }) {
  const handleCourseClick = (course) => {
    let clickedCourses =
      JSON.parse(localStorage.getItem('clickedCourses')) || [];

    const clickedCourse = {
      slug: course.slug,
      image: course.imageUrl,
      name: course.name,
      description: course.description,
    };

    const isCourseClicked = clickedCourses.some(
      (item) => item.slug === course.slug,
    );

    if (!isCourseClicked) {
      clickedCourses.push(clickedCourse);
      localStorage.setItem('clickedCourses', JSON.stringify(clickedCourses));
    }
  };
  //console.log('8', courses);
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
                image={course.imageUrl}
                onClick={() => handleCourseClick(course)}
              />
            ))}
        </section>
      </div>
    </div>
  );
}

export default ScollList;
