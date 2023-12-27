import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('footer')}>
        <p>Copyright &copy; 2023 Nguyễn Văn Đức</p>
      </div>
    </div>
  );
}

export default Footer;
