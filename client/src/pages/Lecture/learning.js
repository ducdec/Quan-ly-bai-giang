import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

//import { XIcon } from '~/components/Icons';
import styles from './Lecture.module.scss';
import TrackItem from './MyLecture/TrackItem';
import Content from './MyLecture/content';
import learningService from '~/services/learningServices';

const cx = classNames.bind(styles);

function Learning() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const { slug } = useParams();

  //console.log('12:', id, 'slug:', slug);

  //const [instructors, setInstructors] = useState([]);
  const [dataLectures, setDataLectures] = useState([]);
  const [lectureAlone, setLectureAlone] = useState({});
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await learningService.courseInfo(slug, id);

        setLectureAlone(result.lecture);
        setDataLectures(result.course.lectures);
        setCourse(result.course);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [slug, id]);

  //console.log('1:', dataLectures, '2:', lectureAlone, '3:', course);
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
              lectures={dataLectures}
              nameCourse={course.name}
              length={dataLectures.length}
              slug={slug}
            />
          </div>
        </div>
      </div>

      <div className={cx('content_wrapper')}>
        <Content lecture={lectureAlone} />
      </div>

      <div className={cx('actionBar_wrapper')}></div>
    </div>
  );
}

export default Learning;
