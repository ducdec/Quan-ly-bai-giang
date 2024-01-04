import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Instructor.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import InstructorService from '~/services/instructorServices';

const cx = classNames.bind(styles);

function UpdateInstructor() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courses: [],
  });
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await InstructorService.editInstructor(id);
        setFormData(result);

        const coursesData = await InstructorService.getCourse();
        setCourses(coursesData);
        setSelectedCourses(result.courses || []);
      } catch (error) {
        console.error('Lỗi API:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    // Xóa trường đó khỏi danh sách lỗi khi người dùng bắt đầu nhập
    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setFormData((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;

    if (selectedCourse === '') {
      setSelectedCourses([]);
      return;
    }

    setSelectedCourses((prevCourses) => {
      const isCourseSelected = prevCourses.some(
        (course) => course.name === selectedCourse,
      );

      if (isCourseSelected) {
        // Nếu đã chọn, hãy loại bỏ
        return prevCourses.filter((course) => course.name !== selectedCourse);
      } else {
        // Nếu chưa chọn, hãy thêm vào
        return [...prevCourses, { name: selectedCourse }];
      }
    });
    console.log('!!!!:', selectedCourses);
  };
  // useEffect
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      courses: selectedCourses,
    }));
  }, [selectedCourses]);

  const handleUpdateInstructor = (e) => {
    e.preventDefault();
    // const confirmed = window.confirm('Bạn có chắc chắn muốn cập nhật không?'); //oh
    // if (!confirmed) {
    //   return;
    // }

    const requiredFields = ['name'];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      return;
    }

    //put
    InstructorService.updateInstructor(id, formData)
      .then((res) => {
        navigate(config.routes.storedIns);
        console.log('Success:', res.data);
      })
      .catch((error) => {
        console.error(
          'Error data:',
          error.response ? error.response.data : error.message,
        );
        setErrorFields(error.res ? Object.keys(error.res.data) : ['error']);
      });
  };

  return (
    <div className={cx('form-container')}>
      <div className={cx('mt-5')}>
        <h3>Sửa Giảng Viên</h3>

        <form onSubmit={handleUpdateInstructor}>
          <div className={cx('form-group')}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên giảng viên
              </label>
              <input
                type="text"
                className={cx('form-control')}
                id="name"
                name="name"
                onChange={handleInput}
                value={formData.name}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="coursesSelect" className="form-label">
                Khóa học
              </label>
              <input
                type="text"
                className={cx('form-control')}
                id="courses"
                name="courses"
                value={
                  selectedCourses.length > 0
                    ? selectedCourses.map((course) => course.name).join(', ')
                    : ''
                }
                disabled
              />
              <select
                onChange={handleCourseChange}
                value={selectedCourses.length > 0 ? selectedCourses[0] : ''}
                className={cx('form-select', 'form-select-lg')}
                id="courseS"
                name="courseS"
              >
                <option value="">Chọn khóa học</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={handleInput}
                value={formData.email}
                className={cx('form-control')}
                type="email"
                id="email"
                name="email"
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                onChange={handleInput}
                value={formData.phone}
                type="text"
                className={cx('form-control')}
                id="phone"
                name="phone"
              />
            </div>

            <Button blue onClick={handleUpdateInstructor} type="submit">
              Cập Nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateInstructor;
