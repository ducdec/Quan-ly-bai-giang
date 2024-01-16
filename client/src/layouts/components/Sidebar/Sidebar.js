import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { HomeIcon, UserIcon, AnphaIcon, CourseIcon } from '~/components/Icons';
import SuggestedAccounts from '../SuggestedAccounts';
import { useEffect, useState } from 'react';
import siteService from '~/services/siteServices';
import courseService from '~/services/courseServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  const [valuesHot, setValuesHot] = useState([]);
  const [valuesRandom, setValuesRandom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { coursesByStatus } = await siteService.home();
        const result = await courseService.storedCourse();
        const randomOrderValues = result.storedCourses.sort(
          () => Math.random() - 0.5,
        );
        setValuesRandom(randomOrderValues);
        //console.log('Line 24 ', randomOrderValues, result.storedCourses);
        if (coursesByStatus && coursesByStatus.hot) {
          setValuesHot(coursesByStatus.hot);
        } else {
          console.error('API returned invalid data:', coursesByStatus);
        }
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, []);
  //console.log('Values Hot:', valuesHot);

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} />
        <MenuItem
          title="Course"
          to={config.routes.storedCourse}
          icon={<CourseIcon className={cx('courses-menu')} />}
        />
        <MenuItem
          title="Instructor"
          to={config.routes.storedIns}
          icon={<UserIcon />}
        />
        <MenuItem
          title="Users"
          to={config.routes.storeUsers}
          icon={<AnphaIcon />}
        />
      </Menu>
      <SuggestedAccounts data={valuesHot} label="Các khóa học HOT" />
      <SuggestedAccounts data={valuesRandom} label="Các khóa học khác ..." />
    </aside>
  );
}

export default Sidebar;
