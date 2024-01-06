import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';

import config from '~/config';
import courseService from '~/services/courseServices';

const cx = classNames.bind(styles);

function CreateCourse() {
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    imageFile: '',
    imageUrl: '',
    status: '',
    instructors: [],
  });
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors] = useState([]);

  const [selectedOption, setSelectedOption] = useState('URL');
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.storedIns();
        //console.log('Line 34 ', result);
        setInstructors(result);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleInstructorChange = (value) => {
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      instructors: value,
    }));

    // console.log('Line 56 : ', selectedInstructors);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    console.log('Handle create course is triggered');
    setErrorFields([]);

    const requiredFields = [
      'name',
      //selectedInstructors.length > 0 ? 'instructor' : null,
      selectedOption === 'URL' ? 'imageUrl' : 'imageFile',
      'status',
    ];
    const missingFields = requiredFields.filter((field) => {
      if (field === 'instructor') {
        return (
          selectedInstructors.filter((instructor) => instructor._id).length ===
          0
        );
      }
      return !newCourse[field];
    });

    //console.log('Missing fields:', missingFields);
    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      return;
    }
    courseService
      .createCourse(newCourse)
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
    //console.log('Line 104 : ', newCourse);
  };

  const instructorOptions = instructors.map((ins) => ({
    value: ins._id,
    label: ins.name,
  }));

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
                  <Select
                    className={cx({
                      'is-invalid': errorFields.includes('instructor'),
                    })}
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Chọn người hướng dẫn"
                    onChange={handleInstructorChange}
                    options={instructorOptions}
                  />
                </div>
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
