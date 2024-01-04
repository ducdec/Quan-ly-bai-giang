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
    instructor: [],
    imageFile: '',
    imageUrl: '',
    status: '',
  });
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);

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

  //handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  //handleInstructorChange
  const handleInstructorChange = (e) => {
    e.persist();
    const selectedInstructor = e.target.value;
    console.log('!!!!:', selectedInstructors);
    setSelectedInstructors((prevIns) => {
      const isInstructorSelected = prevIns.some(
        (instructor) => instructor.name === selectedInstructor,
      );

      if (isInstructorSelected) {
        // Nếu đã chọn, hãy loại bỏ
        return prevIns.filter(
          (instructor) => instructor.name !== selectedInstructor,
        );
      } else {
        // Nếu chưa chọn, hãy thêm vào
        return [...prevIns, { name: selectedInstructor }];
      }
    });
  };

  // useEffect
  useEffect(() => {
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      instructor: selectedInstructors,
    }));
  }, [selectedInstructors]);

  //
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //
  const handleCreateCourse = (e) => {
    e.preventDefault();

    // Xóa đi tất cả lỗi cũ
    setErrorFields([]);

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = [
      'name',
      selectedInstructors.length > 0 ? 'instructor' : null,
      selectedOption === 'URL' ? 'imageUrl' : 'imageFile',
      'status',
    ];
    const missingFields = requiredFields.filter((field) => !newCourse[field]);

    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      return;
    }

    // Chuyển trường instructor về mảng như định dạng của mô hình mới
    const formattedInstructor = selectedInstructors.map((name) => ({ name }));

    // Cập nhật trường instructor trong newCourse
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      instructor: formattedInstructor,
    }));

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo khóa học
    courseService
      .createCourse(newCourse)
      .then((res) => {
        console.log('Success!!!:', res.data);
        navigate(config.routes.storedCourse);
      })
      .catch((error) => {
        console.error('Error:', error.res ? error.res.data : error.message);
        // Xử lý lỗi nếu cần thiết
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

            <>
              <div className={cx('form-group', 'row')}>
                <label
                  htmlFor="instructorSelect"
                  className={cx('col-md-2', 'col-form-label')}
                >
                  Người Hướng Dẫn
                </label>
                <div className={cx('col-md-4')}>
                  <select
                    onChange={handleInstructorChange}
                    value={
                      selectedInstructors.length > 0
                        ? selectedInstructors[0]
                        : ''
                    }
                    className={cx(
                      'form-select',
                      'form-select-lg',
                      'ins-select-all',
                    )}
                    id="instructorS"
                    name="instructorS"
                  >
                    <option value="">Chọn người hướng dẫn</option>
                    {instructors.map((instructor) => (
                      <option key={instructor._id} value={instructor.name}>
                        {instructor.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={cx('form-group', 'row', 'input_ins')}>
                <input
                  type="text"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('instructor'),
                  })}
                  id="selectedInstructor"
                  name="selectedInstructor"
                  value={selectedInstructors.map((ins) => ins.name).join('  ')}
                  disabled
                />

                {errorFields.includes('instructor') && (
                  <div className="invalid-feedback">
                    Vui lòng chọn người hướng dẫn.
                  </div>
                )}
              </div>
            </>

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
