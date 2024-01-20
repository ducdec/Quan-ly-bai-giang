import styles from './LecturePanel.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LectureItem from '../LectureItem';
import courseService from '~/services/courseServices';
const cx = classNames.bind(styles);

function LecturePanel() {
  const { slug } = useParams();

  const [lectures, setLectures] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await lectureService.courseSlug(id);

        const result = await courseService.courseSlug(slug);
        // console.log('Line 34 ', result.instructors);
        // console.log('Data from API:', result);
        setLectures(result.lectures);
        setInstructors(result.instructors);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [slug]);
  //console.log(countVides);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('panel')}>
        <div className={cx('panel-heading')}>
          <h5 className={cx('panel-title')}>
            <div className={cx('headline')}>
              <span className={cx('floatLeft')}>
                <strong>
                  Giảng viên: {instructors?.map((ins) => ins.name).join(', ')}
                </strong>
              </span>
              <span className={cx('floatRight')}>
                Số bài học: {lectures?.length ? lectures.length : 0}
              </span>
            </div>
          </h5>
        </div>

        <div className={cx('collapse')}>
          <div className={cx('panel-body')}>
            {lectures?.map((lec) => (
              <LectureItem key={lec._id} lecture={lec} slug={slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturePanel;
