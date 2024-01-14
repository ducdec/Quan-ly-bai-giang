import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { HomeIcon, UserIcon, AnphaIcon } from '~/components/Icons';
import SuggestedAccounts from '../SuggestedAccounts';
import { useEffect, useState } from 'react';
import siteService from '~/services/siteServices';

const cx = classNames.bind(styles);

function Sidebar() {
  const [valuesHot, setValuesHot] = useState({});
  const [valuesRandom, setValuesRandom] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Thêm dấu ngoặc để gọi hàm
        const { coursesByStatus } = await siteService.home();
        // Kiểm tra giá trị trước khi gọi setValues
        if (coursesByStatus && coursesByStatus.hot) {
          console.log('Line 24 ', coursesByStatus.hot);
          setValuesHot(coursesByStatus.hot);
        } else if (coursesByStatus) {
          valuesRandom(coursesByStatus);
        } else {
          console.error('API returned invalid data:', coursesByStatus);
        }
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, []);
  console.log('Values Hot:', valuesHot);

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} />
        <MenuItem
          title="Course"
          to={config.routes.storedCourse}
          icon={<AnphaIcon />}
        />
        <MenuItem
          title="Instructor"
          to={config.routes.storedIns}
          icon={<UserIcon />}
        />
      </Menu>
      <SuggestedAccounts data={valuesHot} label="Các khóa học HOT" />
      {/* <SuggestedAccounts data={valuesRandom} label="Các khóa học khác ..." /> */}
    </aside>
  );
}

export default Sidebar;
