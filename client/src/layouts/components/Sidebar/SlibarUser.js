import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { HomeIcon } from '~/components/Icons';
import SuggestedAccounts from '../SuggestedAccounts';
import { useEffect, useState } from 'react';
import siteService from '~/services/siteServices';
import courseService from '~/services/courseServices';

const cx = classNames.bind(styles);

function SidebarUser() {
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

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} />
      </Menu>
      <SuggestedAccounts data={valuesHot} label="Các khóa học HOT" />
      <SuggestedAccounts data={valuesRandom} label="Các khóa học khác ..." />
    </aside>
  );
}

export default SidebarUser;
