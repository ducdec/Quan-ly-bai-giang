import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from 'antd';

import styles from './Lecture.module.scss';
import TrackItemCreate from '../MyLecture/TrackItemCreate';
import Button from '~/components/Button';
import lectureService from '~/services/lectureServices';
import Back from '~/layouts/components/Back';

const cx = classNames.bind(styles);

function CreateLecture() {
  const { id } = useParams();

  const [newLecture, setNewLecture] = useState({
    name: '',
    instructor: '',
    description: '',
    videoID: '',
  });

  const [instructors, setInstructors] = useState([]);
  const [lectures, setlectures] = useState([]);
  const [course, setCourse] = useState('');

  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await lectureService.courseSlug(id);
        // console.log('Line 34 ', result.lectures);
        // console.log('Data from API:', result);
        setInstructors(result.instructors);
        setlectures(result.lectures);
        setCourse(result.courseInfo);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewLecture((prevLec) => ({
      ...prevLec,
      [name]: value,
    }));
  };

  const handleInstructorChange = (value) => {
    setNewLecture((prevLec) => ({
      ...prevLec,
      instructor: value,
    }));
  };

  const handleCreateLecture = async (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name', 'videoID'];
    const missingFields = requiredFields.filter((field) => !newLecture[field]);

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }
    const data = await lectureService.createLec(id, newLecture);
    // Cập nhật danh sách bài giảng để hiển thị bài giảng mới
    setlectures((prevLectures) => [...prevLectures, data]);

    // Làm mới danh sách người hướng dẫn
    const updatedInstructors = await lectureService.courseSlug(id);
    setInstructors(updatedInstructors.instructors);

    // Cập nhật trạng thái newLecture để làm mới các trường trong form
    setNewLecture((prevLec) => ({
      name: '',
      instructor: '',
      description: '',
      videoID: '',
    }));
    navigate(`/lecture/${id}/create`);
    //  }
    // catch((error) => {
    //   console.error('Error:', error.res ? error.res.data : error.message);
    // });
  };

  const instructorOptions = instructors.map((ins) => ({
    value: ins._id,
    label: ins.name,
    key: ins._id,
  }));
  //const first = 'Chọn người hướng dẫn';

  return (
    <>
      <div className={cx('tracks_wrapper')}>
        <div className={cx('tracks_container')}>
          <header className={cx('Tracks_header')}>
            <h1 className={cx('Tracks_heading')}>Nội dung khóa học</h1>
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
              <Back to={`/courses/stored`} />
            </div>
            <h3>Thêm Tiết Học</h3>
            <form onSubmit={handleCreateLecture}>
              <div className={cx('form-group')}>
                <div className={cx('mb-3')}>
                  <label htmlFor="name" className="form-label">
                    Tên
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={newLecture.name}
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
                        //defaultValue={first}
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
                    value={newLecture.description}
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
                    value={newLecture.videoID}
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

                <Button blue onClick={handleCreateLecture} type="submit">
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

export default CreateLecture;
