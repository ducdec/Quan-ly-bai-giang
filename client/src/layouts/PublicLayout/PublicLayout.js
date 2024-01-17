import classNames from 'classnames/bind';
import styles from './PublicLayout.module.scss';

import Footer from '../components/Footer';
import SidebarUser from '../components/Sidebar/SlibarUser';
import HeaderPublic from '../components/Header/HeaderPublic';

const cx = classNames.bind(styles);

function PublicLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <HeaderPublic />
      <div className={cx('container')}>
        <SidebarUser />
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default PublicLayout;
