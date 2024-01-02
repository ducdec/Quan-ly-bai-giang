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
        const result = await courseService.editCourse(id);
        setFormData(result);

        // Fetch the list of instructors
        const instructorsData = await courseService.storedIns();
        setInstructors(instructorsData);
      } catch (error) {
        console.error('Lỗi api:', error);
      }
    };
    fetchData();
  }, [id]);

  // handle
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //option
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name', 'instructor', 'image', 'status'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }

    // Put
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

        // Update errorFields based on the error response or add a generic error field
        setErrorFields(error.res ? Object.keys(error.res.data) : ['error']);
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
                className={cx('form-control', {
                  'is-invalid': errorFields.includes('name'),
                })}
                id="name"
                name="name"
                onChange={handleInput}
                value={formData.name}
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
              <select
                onChange={handleInput}
                value={formData.instructor}
                className={cx('form-control', {
                  'is-invalid': errorFields.includes('instructor'),
                })}
                id="instructor"
                name="instructor"
              >
                <option value="">Chọn Người Hướng Dẫn</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
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
                  id="image"
                  name="image"
                  onChange={handleInput}
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
                  id="image"
                  name="image"
                  onChange={handleInput}
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
                onChange={handleInput}
                value={formData.status}
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
