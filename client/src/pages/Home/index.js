import ScollList from '~/layouts/components/ScollList';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
  return (
    <section className={cx('grid', 'fullWidth')} style={{ maxWidth: '1920px' }}>
      <div className={cx('home-wrapper')}>
        <ScollList />
        <ScollList />
        <ScollList />
      </div>
    </section>
  );
}

export default Home;
