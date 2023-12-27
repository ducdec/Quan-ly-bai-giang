import styles from './LecturePanel.module.scss';
import classNames from 'classnames/bind';

import LectureItem from '../LectureItem';
const cx = classNames.bind(styles);

function LecturePanel() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('panel')}>
        <div className={cx('panel-heading')}>
          <h5 className={cx('panel-title')}>
            <div className={cx('headline')}>
              <span className={cx('floatLeft')}>
                <strong>Lựa chọn giảng viên</strong>
              </span>
              <span className={cx('floatRight')}>Số bài học</span>
            </div>
          </h5>
        </div>

        <div className={cx('collapse')}>
          <div className={cx('panel-body')}>
            <LectureItem />
            <LectureItem />
            <LectureItem />
            <LectureItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturePanel;
