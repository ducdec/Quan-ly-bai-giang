import ScollList from '~/layouts/components/ScollList';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('home-wrapper')}>
      <ScollList />
      <ScollList />
      <ScollList />
    </div>
  );
}

export default Home;
