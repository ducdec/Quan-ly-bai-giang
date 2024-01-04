import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Instructor.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import InstructorService from '~/services/instructorServices';

const cx = classNames.bind(styles);

function CreateInstructor() {
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    courses: [],
    email: '',
    phone: '',
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await InstructorService.getCourse();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xóa trường đó khỏi danh sách lỗi khi người dùng bắt đầu nhập
    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    console.log('!!!!:', selectedCourses);

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
  };

  //hadle create
  const handleCreateInstructor = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name'];
    const missingFields = requiredFields.filter(
      (field) => !newInstructor[field],
    );

    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      return;
    }

    setNewInstructor((prevIns) => ({
      ...prevIns,
      courses: selectedCourses.length > 0 ? selectedCourses : [],
    }));

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo giáo viên
    InstructorService.create({
      ...newInstructor,
      courses: selectedCourses,
    })
      .then((res) => {
        console.log('Success:', res.data);
        navigate(config.routes.storedIns);
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message,
        );
      });
  };
  return (
    <div className={cx('content_wrapper')}>
      <div className={cx('form-container')}>
        <div className={cx('mt-5')}>
          <h3>Thêm giảng viên</h3>

          <form onSubmit={handleCreateInstructor}>
            <div className={cx('form-group')}>
              <div className={cx('mb-3')}>
                <label htmlFor="name" className="form-label">
                  Tên giảng viên
                </label>
                <input
                  onChange={handleInputChange}
                  value={newInstructor.name}
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
                <label htmlFor="courses" className="form-label">
                  Khóa học
                </label>
                <input
                  type="text"
                  className={cx('form-control')}
                  id="courses"
                  name="courses"
                  value={selectedCourses
                    .map((course) => course.name)
                    .join(', ')}
                  disabled
                />
                <select
                  onChange={handleCourseChange}
                  value={selectedCourses.length > 0 ? selectedCourses[0] : ''}
                  className={cx(
                    'form-select',
                    'form-select-lg',
                    'course-select-all',
                  )}
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
                  onChange={handleInputChange}
                  value={newInstructor.email}
                  type="text"
                  className={cx('form-control')}
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  onChange={handleInputChange}
                  value={newInstructor.phone}
                  type="text"
                  className={cx('form-control')}
                  id="phone"
                  name="phone"
                />
              </div>

              <Button blue onClick={handleCreateInstructor} type="submit">
                Thêm
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateInstructor;
