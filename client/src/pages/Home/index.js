// Home.jsx
import ScollList from '~/layouts/components/ScollList';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import siteService from '~/services/siteServices';

const cx = classNames.bind(styles);

function Home() {
  const [coursesByStatus, setCoursesByStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await siteService.home();

        const filteredCoursesByStatus = Object.fromEntries(
          Object.entries(res.coursesByStatus).filter(
            ([status, courses]) => courses.length > 0,
          ),
        );

        // Cập nhật state với dữ liệu từ API
        setCoursesByStatus(filteredCoursesByStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className={cx('grid', 'fullWidth')} style={{ maxWidth: '1920px' }}>
      <div className={cx('home-wrapper')}>
        {/* Lặp qua danh sách các status và render mỗi ScollList */}
        {Object.keys(coursesByStatus).map((status) => (
          <ScollList
            key={status} // Sử dụng status làm key vì mỗi status là duy nhất
            status={status}
            courses={coursesByStatus[status]}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
