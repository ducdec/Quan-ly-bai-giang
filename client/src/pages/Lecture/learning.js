import { XIcon } from '~/components/Icons';
import styles from './Lecture.module.scss';
import classNames from 'classnames/bind';
import TrackItem from './component/TrackItem';
import Content from './component/content';

const cx = classNames.bind(styles);

function learning() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('tracks_wrapper')}>
        <div className={cx('tracks_container')}>
          <header className={cx('Tracks_header')}>
            <h1 className={cx('Tracks_heading')}>Nội dung khóa học</h1>
            <button className={cx('Tracks_close-btn')}>
              <XIcon />
            </button>
          </header>

          <div className={cx('tracks_body')}>
            <TrackItem />
          </div>
        </div>
      </div>

      <div className={cx('content_wrapper')}>
        <Content />
      </div>

      <div className={cx('actionBar_wrapper')}></div>
    </div>
  );
}

export default learning;
