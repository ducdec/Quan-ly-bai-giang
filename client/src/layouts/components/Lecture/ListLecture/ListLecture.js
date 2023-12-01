import images from '~/assets/images';
import styles from './ListLecture.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ListLecture() {
  return (
    <div className={cx('Content')}>
      <section className={cx('grip')}>
        <section className={cx('row')}>
          <section className={cx('col1')}>
            <h1 className={cx('course_name')}>
              Lập trình C++ cơ bản, nâng cao
            </h1>
            <div className={cx('text_content')}>
              Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới
              bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các
              khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc
              để chinh phục con đường trở thành một lập trình viên.
            </div>

            <div className={cx('CurriculumOfCourse')}>
              <div className={cx('CurriculumOfCourse_headerSticky')}>
                <div className={cx('CurriculumOfCourse_headerBlock')}>
                  <h2 className={cx('CurriculumOfCourse_float')}>
                    Nội dung khóa học
                  </h2>
                </div>
                <div className={cx('CurriculumOfCourse_subWrapper')}>
                  <ul>
                    <li className={cx('CurriculumOfCourse_hidden')}>
                      <strong>11 </strong> chương
                    </li>
                    <li className={cx('dot')}>•</li>
                    <li>
                      <strong>138 </strong> bài học
                    </li>
                    <li className={cx('dot')}>•</li>
                    <li>
                      <span>
                        Thời lượng <strong>10 giờ 29 phút</strong>
                      </span>
                    </li>
                  </ul>
                  <div className={cx('CurriculumOfCourse_toggleBtn')}>
                    Mở rộng tất cả
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={cx('col2')}>
            <div className={cx('CourseDetail')}>
              <div className={cx('CourseDetail_img')}>
                <div
                  className={cx('CourseDetail_bg')}
                  style={{ backgroundImage: `url("${images.Vex}")` }}
                ></div>
              </div>
              <h5>Miễn phí</h5>
              <button className={cx('Button_btn')}>HỌC NGAY</button>
              <ul>
                <li>
                  <span>Trình độ cơ bản</span>
                </li>
                <li>
                  <span>
                    Tổng số <strong>138</strong> bài học
                  </span>
                </li>
                <li>
                  <span>
                    Thời lượng <strong>10 giờ 29 phút</strong>
                  </span>
                </li>
                <li>
                  <span>Học mọi lúc, mọi nơi</span>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default ListLecture;
