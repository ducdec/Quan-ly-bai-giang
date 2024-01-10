import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Instructor.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import InstructorService from '~/services/instructorServices';

const cx = classNames.bind(styles);

function CreateInstructor() {
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: '',
    phone: '',
  });
  //123
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xóa trường đó khỏi danh sách lỗi khi người dùng bắt đầu nhập
    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewInstructor((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleCreateInstructor = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name', 'email'];
    const missingFields = requiredFields.filter(
      (field) => !newInstructor[field],
    );

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo khóa học
    InstructorService.create(newInstructor)
      .then((res) => {
        console.log('Success:', res.data);
        navigate(config.routes.storedIns);
      })
      .catch((error) => {
        console.error('Error:', error.res ? error.res.data : error.message);
      });
  };

  return (
    <>
      <div className={cx('content_wrapper')}>
        <div className={cx('form-container')}>
          <div className={cx('mt-5')}>
            <h3>Thêm giảng viên</h3>

            <form onSubmit={handleCreateInstructor}>
              <div className={cx('form-group')}>
                <div className={cx('mb-3')}>
                  <label htmlFor="name" className="form-label">
                    Tên giảng viên
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={newInstructor.name}
                    type="text"
                    className={cx('form-control', {
                      'is-invalid': errorFields.includes('name'),
                    })}
                    id="name"
                    name="name"
                  />
                  {errorFields.includes('name') && (
                    <div className="invalid-feedback">Vui lòng nhập tên.</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={newInstructor.email}
                    type="text"
                    className={cx('form-control', {
                      'is-invalid': errorFields.includes('email'),
                    })}
                    id="email"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={newInstructor.phone}
                    type="text"
                    className={cx('form-control', {
                      'is-invalid': errorFields.includes('phone'),
                    })}
                    id="phone"
                    name="phone"
                  />
                </div>

                <Button blue onClick={handleCreateInstructor} type="submit">
                  Thêm
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateInstructor;
