import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

import config from '~/config';
import courseService from '~/services/courseServices';

const cx = classNames.bind(styles);

function CreateCourse() {
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    instructor: '',
    imageFile: '',
    imageUrl: '',
    status: '',
  });

  const [selectedOption, setSelectedOption] = useState('URL');
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xóa trường đó khỏi danh sách lỗi khi người dùng bắt đầu nhập
    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name', 'instructor', 'status'];
    const missingFields = requiredFields.filter((field) => !newCourse[field]);

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo khóa học
    courseService
      .createCourse(newCourse)
      .then((res) => {
        console.log('Success:', res.data);
        navigate(config.routes.storedCourse);
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
                value={newCourse.name}
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
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>
              <textarea
                onChange={handleInputChange}
                value={newCourse.description}
                rows="3"
                className={cx('form-control')}
                id="description"
                name="description"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="instructor" className="form-label">
                Người Hướng Dẫn
              </label>
              <input
                onChange={handleInputChange}
                value={newCourse.instructor}
                type="text"
                className={cx('form-control', {
                  'is-invalid': errorFields.includes('instructor'),
                })}
                id="instructor"
                name="instructor"
              />
              {errorFields.includes('instructor') && (
                <div className="invalid-feedback">
                  Vui lòng nhập tên người hướng dẫn.
                </div>
              )}
            </div>

            <div className={cx('form-group', 'row')}>
              <label
                htmlFor="action"
                className={cx('col-md-2', 'col-form-label')}
              >
                Hình ảnh
              </label>
              <div className={cx('col-md-10')}>
                <select
                  className={cx(
                    'form-select',
                    'form-select-lg',
                    'checkbox-select-all',
                  )}
                  aria-label="Default select example"
                  name="action"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  required
                >
                  {/* <option>--Phương thức--</option> */}
                  <option>File</option>
                  <option>URL</option>
                </select>
              </div>
            </div>

            {selectedOption === 'File' && (
              <div className={cx('form-group')}>
                <label htmlFor="imageFile">Chọn File</label>
                <input
                  type="file"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('imageFile'),
                  })}
                  id="imageFile"
                  name="imageFile"
                  onChange={handleInputChange}
                />
                {errorFields.includes('imageFile') && (
                  <div className="invalid-feedback">
                    Vui lòng chọn file hình ảnh.
                  </div>
                )}
              </div>
            )}

            {selectedOption === 'URL' && (
              <div className={cx('form-group')}>
                <label htmlFor="imageUrl">Nhập URL</label>
                <input
                  type="text"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('imageUrl'),
                  })}
                  id="imageUrl"
                  name="imageUrl"
                  onChange={handleInputChange}
                />
                {errorFields.includes('imageUrl') && (
                  <div className="invalid-feedback">
                    Vui lòng nhập URL hình ảnh.
                  </div>
                )}
              </div>
            )}

            <div className={cx('form-group')}>
              <label htmlFor="status">Trạng thái</label>
              <input
                onChange={handleInputChange}
                value={newCourse.status}
                type="text"
                className={cx('form-control', {
                  'is-invalid': errorFields.includes('status'),
                })}
                id="status"
                name="status"
              />
              {errorFields.includes('status') && (
                <div className="invalid-feedback">
                  Vui lòng chọn phương thức hình ảnh.
                </div>
              )}
            </div>

            <Button blue onClick={handleCreateCourse} type="submit">
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
