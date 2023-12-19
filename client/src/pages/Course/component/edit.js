import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';

import { useEffect, useState } from 'react';
import courseService from '~/services/courseServices';
import { useParams, useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function UpdateCourse() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: '',
    image: '',
    status: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.editCourse(id);
        setFormData(result);
      } catch (error) {
        console.error('Lỗi api:', error);
      }
    };
    fetchData();
  }, [id]);

  //handle
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    //put
    courseService
      .updateCourse(id, formData)
      .then((res) => {
        navigate(config.routes.storedCourse);
        console.log('Success:', res.data);
      })
      .catch((error) => {
        console.error(
          'Error data:',
          error.res ? error.res.data : error.message,
        );
      });
  };

  return (
    <div className={cx('form-container')}>
      <div className={cx('mt-5')}>
        <h3>Sửa Khóa Học</h3>

        <form onSubmit={handleUpdate}>
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
                onChange={handleInput}
                value={formData.name}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>
              <textarea
                onChange={handleInput}
                value={formData.description}
                rows="3"
                className={cx('form-control')}
                id="description"
                name="description"
              ></textarea>
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="instructor">Người Hướng Dẫn</label>
              <input
                onChange={handleInput}
                value={formData.instructor}
                type="text"
                className={cx('form-control')}
                id="instructor"
                name="instructor"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="image">Ảnh</label>
              <input
                onChange={handleInput}
                value={formData.image}
                type="text"
                className={cx('form-control')}
                id="image"
                name="image"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="status">Trạng thái</label>
              <input
                onChange={handleInput}
                value={formData.status}
                type="text"
                className={cx('form-control')}
                id="status"
                name="status"
              />
            </div>

            <Button blue onClick={handleUpdate} type="submit">
              Cập Nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCourse;
