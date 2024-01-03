import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { HomeIcon, UserIcon, AnphaIcon } from '~/components/Icons';
import SuggestedAccounts from '../SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
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
      <SuggestedAccounts label="Suggested accounts" />
      <SuggestedAccounts label="Following accounts" />
    </aside>
  );
}

export default Sidebar;
