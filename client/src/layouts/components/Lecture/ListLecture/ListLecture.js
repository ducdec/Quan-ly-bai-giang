import styles from './ListLecture.module.scss';
import classNames from 'classnames/bind';

import LecturePanel from '~/components/Lecture/LecturePanel';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '~/services/courseServices';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function ListLecture() {
  const { slug } = useParams();
  const [dataCourse, setDataCourse] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.courseSlug(slug);
        //console.log('Line 34 ', result);
        console.log('Data from API:', result);
        setDataCourse(result);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className={cx('Content')}>
      <section className={cx('grip')} style={{ maxWidth: '1920px' }}>
        <section className={cx('row', 'Course_wrapper')}>
          <section className={cx('col2', 'c-12', 'm-12', 'c-1-8')}>
            <h1 className={cx('course_name')}>{dataCourse.name}</h1>
            <div className={cx('text_content')}>{dataCourse.description}</div>

            <div className={cx('CurriculumOfCourse')}>
              <div className={cx('CurriculumOfCourse_headerSticky')}>
                <div className={cx('CurriculumOfCourse_headerBlock')}>
                  <h2 className={cx('CurriculumOfCourse_float')}>
                    Nội dung khóa học
                  </h2>
                </div>
                <div className={cx('CurriculumOfCourse_subWrapper')}>
                  <ul>
                    {/* <li className={cx('CurriculumOfCourse_hidden')}>
                      <strong>11 </strong> chương
                    </li>
                    <li className={cx('dot')}>•</li> */}
                    <li>
                      <strong>8 </strong> bài học
                    </li>
                    <li className={cx('dot')}>•</li>
                    <li>
                      <span>
                        Thời lượng <strong>10 giờ 29 phút</strong>
                      </span>
                    </li>
                  </ul>
                  {/* <div className={cx('CurriculumOfCourse_toggleBtn')}>
                    Mở rộng tất cả
                  </div> */}
                </div>
              </div>

              <div className={cx('CurriculumOfCourse_panel')}>
                <LecturePanel />
              </div>
            </div>
          </section>

          <section className={cx('col2', 'c-12', 'm-12', 'c-1-4')}>
            <div className={cx('CourseDetail')}>
              <div className={cx('CourseDetail_img')}>
                <div
                  className={cx('CourseDetail_bg')}
                  style={{ backgroundImage: `url(${dataCourse.imageUrl})` }}
                ></div>
              </div>
              <h5>Miễn phí</h5>
              <Button
                to={`/learning/${slug}?id=${123}`}
                className={cx('Button_btn')}
              >
                HỌC NGAY
              </Button>
              <ul>
                <li>
                  <span>Trình độ cơ bản</span>
                </li>
                <li>
                  <span>
                    Tổng số <strong>8</strong> giảng viên
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
