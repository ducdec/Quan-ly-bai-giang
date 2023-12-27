import { CheckIcon, StartIcon } from '~/components/Icons';
import styles from './TrackItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TrackItem() {
  return (
    <>
      <div className={cx('TrackItem_wrapper')}>
        <h3 className={cx('TrackItem_title')}>1. Bắt đầu</h3>
        <span className={cx('TrackItem_desc')}>6/7 | 20:39</span>
        <span className={cx('TrackItem_icon')}></span>
      </div>

      <div className={cx('trackItem_list')}>
        <div className={cx('StepItem_wrapper', 'learn-item-1')}>
          <div className={cx('StepItem_info')}>
            <h3 className={cx('StepItem_title')}>1. Bài số 1</h3>
            <p className={cx('StepItem_desc')}>
              <StartIcon className={cx('lesson-icon')} />
              <span>03:15</span>
            </p>
          </div>
          <div className={cx('StepItem_icon-box')}>
            <CheckIcon />
          </div>
        </div>
      </div>

      <div className={cx('trackItem_list')}>
        <div className={cx('StepItem_wrapper', 'learn-item-1')}>
          <div className={cx('StepItem_info')}>
            <h3 className={cx('StepItem_title')}>1. Bài số 1</h3>
            <p className={cx('StepItem_desc')}>
              <StartIcon className={cx('lesson-icon')} />
              <span>03:15</span>
            </p>
          </div>
          <div className={cx('StepItem_icon-box')}>
            <CheckIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackItem;
