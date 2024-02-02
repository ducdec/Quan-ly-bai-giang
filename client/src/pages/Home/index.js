// Home.jsx
import ScollList from '~/layouts/components/ScollList';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import siteService from '~/services/siteServices';

const cx = classNames.bind(styles);

function Home() {
  const [coursesByStatus, setCoursesByStatus] = useState({});
  const [sortedStatuses, setSortedStatuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await siteService.home();
        const filteredCoursesByStatus = Object.fromEntries(
          Object.entries(res.coursesByStatus).filter(
            ([status, courses]) => courses.length > 0,
          ),
        );
        setCoursesByStatus(filteredCoursesByStatus);
        const statuses = Object.keys(filteredCoursesByStatus);
        const sortedStatuses = statuses.sort((a, b) => {
          if (a === 'hot') return -1;
          if (b === 'hot') return 1;
          if (a === 'new') return -1;
          if (b === 'new') return 1;
          return 0;
        });
        setSortedStatuses(sortedStatuses);
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
        {sortedStatuses.map((status) => (
          <ScollList
            key={status}
            status={status}
            courses={coursesByStatus[status]}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
