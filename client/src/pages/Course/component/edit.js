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
        const result = await courseService.editCourse(id);
        setFormData(result);

        // Fetch the list of instructors
        const instructorsData = await courseService.storedIns();
        setInstructors(instructorsData);

        // Set selectedInstructors based on the result from the API
        setSelectedInstructors(result.instructor || []);
      } catch (error) {
        console.error('Lỗi api:', error);
      }
    };
    fetchData();
  }, [id]);

  // handleInput
  const handleInput = (e) => {
    const { name, value } = e.target;

    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setFormData((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleInstructorChange = (e) => {
    const selectedInstructor = e.target.value;

    if (selectedInstructor === '') {
      setSelectedInstructors([]);
      return;
    }

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
    console.log('!!!!:', selectedInstructors);
  };

  // useEffect
  useEffect(() => {
    setFormData((prevCourse) => ({
      ...prevCourse,
      instructor: selectedInstructors,
    }));
  }, [selectedInstructors]);

  // handleSelectChange
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // handleUpdate
  const handleUpdate = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = [
      'name',
      selectedInstructors.length > 0 ? 'instructor' : null,
      selectedOption === 'URL' ? 'imageUrl' : 'imageFile',
      'status',
    ];

    // Trong hàm handleUpdate

    const missingFields = requiredFields.filter((field) => {
      if (field === 'instructor') {
        return selectedInstructors.length === 0;
      }
      return !formData[field];
    });

    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      return;
    }
    console.log('missingFields:', missingFields);
    console.log('errorFields:', errorFields);

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
                        ? selectedInstructors[0]?.name || '' // Kiểm tra nếu mảng không rỗng thì mới truy cập
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
                    <option value="">Xóa người hướng dẫn</option>
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
                  value={
                    selectedInstructors.length > 0
                      ? selectedInstructors.map((ins) => ins.name).join('  ')
                      : ''
                  }
                  disabled
                />
                {errorFields.includes('instructor') && (
                  <div className="invalid-feedback">
                    Vui lòng chọn ít nhất một người hướng dẫn.
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
                  onChange={handleInput}
                  value={formData.imageFile}
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
                  onChange={handleInput}
                  value={formData.imageUrl}
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
