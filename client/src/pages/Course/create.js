import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CreateCourse() {
  return (
    <div className={cx('form-container')}>
      <div className={cx('mt-5')}>
        <h3>Thêm Khóa Học</h3>

        <form method="POST" action="/courses/store">
          <div className={cx('form-group')}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên
              </label>
              <input
                type="text"
                className={cx('form-control')}
                id="name"
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>
              <textarea
                rows="3"
                className={cx('form-control')}
                id="description"
                name="description"
              ></textarea>
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="instructors">Người Hướng Dẫn</label>
              <input
                type="text"
                className={cx('form-control')}
                id="instructors"
                name="instructors"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="videoID">Video ID</label>
              <input
                type="text"
                className={cx('form-control')}
                id="videoID"
                name="videoID"
              />
            </div>

            <Button blue>Thêm</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
