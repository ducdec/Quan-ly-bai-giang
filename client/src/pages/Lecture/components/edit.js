import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from 'antd';

import styles from './Lecture.module.scss';
//import { XIcon } from '~/components/Icons';
import Button from '~/components/Button';
import lectureService from '~/services/lectureServices';
import TrackItemCreate from '../MyLecture/TrackItemCreate';
import Back from '~/layouts/components/Back';

const cx = classNames.bind(styles);

function UpdateLecture() {
  const { slug, id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    description: '',
    videoID: '',
  });

  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [course, setCourse] = useState('');

  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await lectureService.courseSlug(id);

        const result = await lectureService.editLec(slug, id);
        console.log('Line 34 ', result.lecture.instructor);
        console.log('Data from API:', result);

        setInstructors(result.instructors);
        setLectures(result.lecturesCourse);
        setCourse(result.courseInfo);
        setSelectedInstructors(result.lecture.instructor || '');
        setFormData(result.lecture);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [slug, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setFormData((prevLec) => ({
      ...prevLec,
      [name]: value,
    }));
  };

  const handleInstructorChange = (value) => {
    setSelectedInstructors(value);
  };
  useEffect(() => {
    setFormData((prevCourse) => ({
      ...prevCourse,
      instructor: selectedInstructors,
    }));
  }, [selectedInstructors]);

  let idCourse = course.id;

  const handleUpdate = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name', 'videoID'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }

    formData.instructor = selectedInstructors;

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo khóa học
    lectureService
      .updateLec(slug, id, idCourse, formData)
      .then((res) => {
        console.log('Success:', res.data);
        navigate(`/lecture/${idCourse}/create`);
      })
      .catch((error) => {
        console.error('Error:', error.res ? error.res.data : error.message);
      });
  };

  const instructorOptions = instructors.map((ins) => ({
    value: ins._id,
    label: ins.name,
    key: ins._id,
  }));
  return (
    <>
      <div className={cx('tracks_wrapper')}>
        <div className={cx('tracks_container')}>
          <header className={cx('Tracks_header')}>
            <h1 className={cx('Tracks_heading')}>Nội dung khóa học</h1>
            {/* <button className={cx('Tracks_close-btn')}>
              <XIcon />
            </button> */}
          </header>

          <div className={cx('tracks_body')}>
            <TrackItemCreate
              lectures={lectures}
              nameCourse={course.name}
              index={lectures.length}
              id={course.id}
              slug={course.slug}
            />
          </div>
        </div>
      </div>

      <div className={cx('content_wrapper')}>
        <div className={cx('form-container')}>
          <div className={cx('mt-5')}>
            <div className={cx('back')}>
              <Back to={`/lecture/${idCourse}/create`} />
            </div>
            <h3>Sửa Tiết Học</h3>

            <form onSubmit={handleUpdate}>
              <div className={cx('form-group')}>
                <div className={cx('mb-3')}>
                  <label htmlFor="name" className="form-label">
                    Tên
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.name}
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
                        value={selectedInstructors}
                        placeholder="Chọn người hướng dẫn"
                        style={{ width: '100%' }}
                        onChange={handleInstructorChange}
                        options={instructorOptions}
                        showSearch
                        optionFilterProp="children"
                      />
                    </div>
                  </div>
                </>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Mô tả
                  </label>
                  <textarea
                    onChange={handleInputChange}
                    value={formData.description}
                    rows="3"
                    className={cx('form-control')}
                    id="description"
                    name="description"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="videoID" className="form-label">
                    Video ID
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.videoID}
                    type="text"
                    className={cx('form-control', {
                      'is-invalid': errorFields.includes('videoID'),
                    })}
                    id="videoID"
                    name="videoID"
                  />
                  {errorFields.includes('videoID') && (
                    <div className="invalid-feedback">
                      Vui lòng nhập ID Video.
                    </div>
                  )}
                </div>

                <Button blue onClick={handleUpdate} type="submit">
                  Sửa
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateLecture;
