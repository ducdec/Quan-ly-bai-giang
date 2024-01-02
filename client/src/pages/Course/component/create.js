import { useState, useEffect } from 'react';
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
  const [instructors, setInstructors] = useState([]);

  const [selectedOption, setSelectedOption] = useState('URL');
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.storedIns();
        setInstructors(result);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, []);

  //hande
  const handleInputChange = (e) => {
    const { name, value } = e.target;

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
    const requiredFields = ['name', 'instructor', 'image', 'status'];
    const missingFields = requiredFields.filter((field) => !newCourse[field]);

    if (missingFields.length > 0) {
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
              <select
                onChange={handleInputChange}
                value={newCourse.instructor}
                className={cx('form-control', {
                  'is-invalid': errorFields.includes('instructor'),
                })}
                id="instructor"
                name="instructor"
              >
                <option value="">Chọn Người Hướng Dẫn</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor.name}>
                    {instructor.name}
                  </option>
                ))}
              </select>
              {errorFields.includes('instructor') && (
                <div className="invalid-feedback">
                  Vui lòng chọn người hướng dẫn.
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
                <label htmlFor="image">Chọn File</label>
                <input
                  type="file"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('image'),
                  })}
                  id="imageFile"
                  name="imageFile"
                  onChange={handleInputChange}
                />
                {errorFields.includes('image') && (
                  <div className="invalid-feedback">
                    Vui lòng chọn file hình ảnh.
                  </div>
                )}
              </div>
            )}

            {selectedOption === 'URL' && (
              <div className={cx('form-group')}>
                <label htmlFor="image">Nhập URL</label>
                <input
                  type="text"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('image'),
                  })}
                  id="imageUrl"
                  name="imageUrl"
                  onChange={handleInputChange}
                />
                {errorFields.includes('image') && (
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
                  Vui lòng nhập trạng thái.
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
