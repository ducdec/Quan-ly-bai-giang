import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import Button from '~/components/Button';
import { Select } from 'antd';

import { useEffect, useState } from 'react';
import courseService from '~/services/courseServices';
import { useParams, useNavigate } from 'react-router-dom';
import config from '~/config';
import Back from '~/layouts/components/Back';

const cx = classNames.bind(styles);

function UpdateCourse() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructors: [],
    imageUrl: '',
    status: '',
  });
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedOption, setSelectedOption] = useState('URL');
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null);
  const [errorFields, setErrorFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.editCourse(id);
        setSelectedInstructors(result.instructors || []);
        setFormData(result);
        const instructorsData = await courseService.storedIns();
        setInstructors(instructorsData);
      } catch (error) {
        console.error('Lỗi api:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log('line 47', selectedInstructors);
  const handleInput = (e) => {
    const { name, value } = e.target;
    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setFormData((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleInstructorChange = (value) => {
    setSelectedInstructors(value);
  };

  useEffect(() => {
    setFormData((prevCourse) => ({
      ...prevCourse,
      instructors: selectedInstructors,
    }));
  }, [selectedInstructors]);

  // handleFileChange
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile && selectedOption === 'File') {
  //     setFile(selectedFile);
  //   }
  // };

  // handleSelectChange
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    //console.log('Dữ liệu trước khi cập nhật:', formData);
    const requiredFields = ['name', 'imageUrl', 'status'];

    const missingFields = requiredFields.filter((field) => {
      return !formData[field];
    });

    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      return;
    }

    formData.instructors = selectedInstructors;

    const fileData =
      selectedOption === 'URL'
        ? { imageUrl: formData.imageUrl }
        : { imageFile: formData.imageFile };

    courseService
      .updateCourse(id, { ...formData, ...fileData })
      .then((res) => {
        //console.log('Dữ liệu sau khi cập nhật:', res.data);
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

  const instructorOptions = instructors.map((ins) => ({
    value: ins._id,
    label: ins.name,
    key: ins._id,
  }));

  return (
    <div className={cx('form-container')}>
      <div className={cx('mt-5')}>
        <div className={cx('back')}>
          <Back to={`/courses/stored`} />
        </div>
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
                  <Select
                    className={cx({
                      'is-invalid': errorFields.includes('instructor'),
                    })}
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Chọn người hướng dẫn"
                    value={selectedInstructors.map((instructor) => instructor)}
                    onChange={handleInstructorChange}
                    options={instructorOptions}
                    key={id}
                  />
                </div>
              </div>

              <div className={cx('form-group', 'row', 'input_ins')}>
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
                  disabled
                >
                  <option>URL</option>
                </select>
              </div>
            </div>

            {/* {selectedOption === 'File' && (
              <div className={cx('form-group')}>
                <label htmlFor="imageFile">Chọn File</label>
                <input
                  type="file"
                  className={cx('form-control')}
                  id="imageFile"
                  name="imageFile"
                  onChange={handleFileChange}
                />
                {errorFields.includes('imageFile') && (
                  <div className="invalid-feedback">
                    Vui lòng chọn file hình ảnh.
                  </div>
                )}
              </div>
            )} */}

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
