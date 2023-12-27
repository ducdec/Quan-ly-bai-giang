import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';
import classNames from 'classnames/bind';
import styles from '../MainLayout/MainLayout.module.scss';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
