import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';

import * as CourseServices from '~/services/courseServices';

const cx = classNames.bind(styles);

function CreateCourse() {
  const [courseResult, setCourseResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await CourseServices.getCourse();
        if (result) {
          setCourseResult(result);
        } else {
          console.error('API returned an empty result.');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchApi();
  }, []); // [] useEffect chỉ chạy một lần

  return (
    <div className={cx('form-container')}>
      <div className={cx('mt-5')}>
        <h3>Thêm Khóa Học</h3>

        <form method="POST" action="/courses/store">
          <div className={cx('form-group')}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên
              </label>
              <input
                type="text"
                className={cx('form-control')}
                id="name"
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>
              <textarea
                rows="3"
                className={cx('form-control')}
                id="description"
                name="description"
              ></textarea>
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="instructors">Người Hướng Dẫn</label>
              <input
                type="text"
                className={cx('form-control')}
                id="instructors"
                name="instructors"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="videoID">Video ID</label>
              <input
                type="text"
                className={cx('form-control')}
                id="videoID"
                name="videoID"
              />
            </div>

            <Button blue>Thêm</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
