import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Profile.module.scss';
import { useEffect } from 'react';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ItemCourse() {
  const [viewedCourses, setViewedCourses] = useState([]);

  useEffect(() => {
    const storedCourses = localStorage.getItem('clickedCourses');
    if (storedCourses) {
      setViewedCourses(JSON.parse(storedCourses));
    }
  }, []);
  return (
    <div>
      {viewedCourses.map((course) => (
        <div key={course.slug} className={cx('Profile_inner')}>
          <a className={cx('Profile_thumb')} href="/courses/nodejs">
            <Image
              src={course.image}
              className={cx('Profile_thumb-image')}
              alt={course.name}
            />
          </a>
          <div className={cx('info')}>
            <h3 className={cx('Profile_info-title')}>
              <a href={`/courses/${course.slug}`}>{course.name}</a>
            </h3>
            <p className={cx('Profile_info-desc')}>{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemCourse;
