import classNames from 'classnames/bind';
import styles from './UserLayout.module.scss';

import Footer from '../components/Footer';
import SidebarUser from '../components/Sidebar/SlibarUser';
import HeaderUser from '../components/Header/HeaderUser';

const cx = classNames.bind(styles);

function UserLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <HeaderUser />
      <div className={cx('container')}>
        <SidebarUser />
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
