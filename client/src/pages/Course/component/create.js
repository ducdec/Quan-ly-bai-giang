import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';

import config from '~/config';
import request from '~/utils/axios';

const cx = classNames.bind(styles);

function CreateCourse() {
  const [newCourse, setNewCourse] = useState({});
  //const history = useHistory();
  const handleInputChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    request
      .post('/courses/store', newCourse)
      .then((res) => {
        console.log('Success:', res.data);
        //history.push('/courses/stored');
      })
      .catch((error) => {
        console.error('Error:', error.res ? error.res.data : error.message);
      });
  };

  return (
    <div className={cx('form-container')}>
      <div className={cx('mt-5')}>
        <h3>Thêm Khóa Học</h3>

        <form onSubmit={handleCreateCourse}>
          <div className={cx('form-group')}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên
              </label>
              <input
                onChange={handleInputChange}
                value={newCourse.name || ''}
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
                onChange={handleInputChange}
                value={newCourse.description || ''}
                rows="3"
                className={cx('form-control')}
                id="description"
                name="description"
              ></textarea>
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="instructor">Người Hướng Dẫn</label>
              <input
                onChange={handleInputChange}
                value={newCourse.instructor || ''}
                type="text"
                className={cx('form-control')}
                id="instructor"
                name="instructor"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="image">Ảnh</label>
              <input
                onChange={handleInputChange}
                value={newCourse.image || ''}
                type="text"
                className={cx('form-control')}
                id="image"
                name="image"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="status">Trạng thái</label>
              <input
                onChange={handleInputChange}
                value={newCourse.status || ''}
                type="text"
                className={cx('form-control')}
                id="status"
                name="status"
              />
            </div>

            <Button
              blue
              onClick={handleCreateCourse}
              to={config.routes.storedCourse}
            >
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
