import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { HomeIcon, UserIcon, AnphaIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} />
        <MenuItem title="anpha" to={config.routes.anpha} icon={<AnphaIcon />} />
        <MenuItem
          title="Profile"
          to={config.routes.profile}
          icon={<UserIcon />}
        />
      </Menu>
    </aside>
  );
}

export default Sidebar;
