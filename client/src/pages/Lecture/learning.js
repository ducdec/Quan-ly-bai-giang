import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { XIcon } from '~/components/Icons';
import styles from './Lecture.module.scss';
import TrackItem from './MyLecture/TrackItem';
import Content from './MyLecture/content';
import learningService from '~/services/learningServices';

const cx = classNames.bind(styles);

function Learning() {
  const { slug } = useParams();
  //const [instructors, setInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [course, setCourse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) {
          console.error('Slug is undefined or null');
          return;
        }
        const result = await learningService.courseInfo(slug);

        console.log('Line 34 ', result.lectures);
        console.log('Data from API:', result);

        //setInstructors(result.instructors);
        setLectures(result.lectures);
        setCourse(result.courseName);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tracks_wrapper')}>
        <div className={cx('tracks_container')}>
          <header className={cx('Tracks_header')}>
            <h1 className={cx('Tracks_heading')}>Nội dung khóa học</h1>
            {/* <button className={cx('Tracks_close-btn')}>
              <XIcon />
            </button> */}
          </header>

          <div className={cx('tracks_body')}>
            <TrackItem
              lectures={lectures}
              nameCourse={course}
              index={lectures.length}
              slug={slug}
            />
          </div>
        </div>
      </div>

      <div className={cx('content_wrapper')}>
        <Content />
      </div>

      <div className={cx('actionBar_wrapper')}></div>
    </div>
  );
}

export default Learning;
