import classNames from 'classnames/bind';
import styles from './Instructor.module.scss';
import Button from '~/components/Button';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '~/config';
import InstructorService from '~/services/instructorServices';
import Back from '~/layouts/components/Back';

const cx = classNames.bind(styles);

function UpdateInstructor() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  //123
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await InstructorService.editInstructor(id);
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
    InstructorService.updateInstructor(id, formData)
      .then((res) => {
        navigate(config.routes.storedIns);
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
        <div className={cx('back')}>
          <Back to={`/instructor/stored`} />
        </div>
        <h3>Sửa Khóa Học</h3>

        <form onSubmit={handleUpdate}>
          <div className={cx('form-group')}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên giảng viên
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <textarea
                onChange={handleInput}
                value={formData.email}
                rows="3"
                className={cx('form-control')}
                id="email"
                name="email"
              ></textarea>
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                onChange={handleInput}
                value={formData.phone}
                type="text"
                className={cx('form-control')}
                id="phone"
                name="phone"
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

export default UpdateInstructor;
