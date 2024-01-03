import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import courseService from '~/services/courseServices';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import FormatTime from '~/components/FormatTime';

const cx = classNames.bind(styles);

function StoredCourse() {
  const [courseResult, setCourseResult] = useState({
    storedCourses: [],
    countDeletedCourses: 0,
  });
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  //
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showActionWarning, setShowActionWarning] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.storedCourse();
        setCourseResult(result);
      } catch (error) {
        console.error('API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //handle checkbox
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    const allCourseIds = courseResult.storedCourses.map((course) => course._id);

    if (isChecked && selectedCourses.length === allCourseIds.length) {
      // Hủy tích "Chọn tất cả"
      setSelectAll(false);
      setSelectedCourses([]);
    } else {
      // Ngược lại, thiết lập danh sách khóa học đã chọn thành tất cả các ID
      setSelectedCourses(isChecked ? allCourseIds : []);
    }
  };

  const handleCourseCheckboxChange = (e, courseId) => {
    const isChecked = e.target.checked;
    setSelectAll(false);

    if (isChecked) {
      setSelectedCourses((prevSelected) => [...prevSelected, courseId]);
    } else {
      setSelectedCourses((prevSelected) =>
        prevSelected.filter((id) => id !== courseId),
      );
    }
  };

  const handleActionSubmit = async (e) => {
    const selectedActionElement = document.querySelector('[name="action"]');
    const selectedAction = selectedActionElement.value;

    if (selectedAction === '-- Hành động --') {
      e.preventDefault();
      setShowActionWarning(true);
      return;
    }

    setShowActionWarning(false);

    if (selectedAction === 'delete') {
      selectedCourses.forEach(async (courseId) => {
        await courseService.deleteCourse(courseId);
      });
    }

    // Sau khi thực hiện hành động, cập nhật danh sách khóa học và làm sạch dữ liệu đã chọn
    const updatedResult = await courseService.storedCourse();
    setCourseResult(updatedResult);
    setSelectedCourses([]);
    navigate(config.routes.storedCourse);
  };

  //course
  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteCourseId(id);
    setIsDelete(true);
  };

  const deleteCourse = async () => {
    console.log(deleteCourseId);

    if (deleteCourseId) {
      try {
        await courseService.deleteCourse(deleteCourseId);
        console.log('Xóa thanh cong');
        // Fetch the updated data after successful deletion
        const updatedResult = await courseService.storedCourse();
        setCourseResult(updatedResult);
        navigate(config.routes.storedCourse);
      } catch (error) {
        console.error('Xoa that bai:', error);
      } finally {
        setDeleteCourseId(null);
        setIsDelete(false);
      }
    }
  };

  return (
    <div className={cx('form-container')}>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <form className={cx('mt-5')} name="container-form">
          <h3>Danh Sách</h3>
          <div className={cx('row', 'error-container')}>
            <div
              className={cx('mt-4', 'd-flex', 'align-items-center', 'col-md-5')}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  id="checkbox-all"
                />
                <label
                  className={cx('form-check-label', 'select-all')}
                  htmlFor="checkbox-all"
                >
                  Chọn tất cả
                </label>
              </div>

              <select
                className={cx(
                  'form-select',
                  'form-select-lg',
                  'checkbox-select-all',
                  showActionWarning && 'is-invalid', // Thêm class is-invalid nếu cần hiển thị thông báo
                )}
                aria-label="Default select example"
                name="action"
                defaultValue="-- Hành động --"
                required
              >
                <option disabled>-- Hành động --</option>
                <option value="delete">Xóa</option>
              </select>
              {showActionWarning && (
                <div className="invalid-feedback">
                  Vui lòng chọn một mục trong danh sách.
                </div>
              )}

              <button
                className={cx(
                  'btn',
                  'btn-primary',
                  'btn-lg',
                  'check-all-submit-btn',
                )}
                onClick={(e) => handleActionSubmit(e)}
                disabled={selectedCourses.length === 0}
              >
                Thực hiện
              </button>
            </div>

            <a
              className={cx('col-md-3', 'ms-md-auto', 'underline')}
              href="/courses/trash"
            >
              Thùng Rác(
              {courseResult.countDeletedCourses})
            </a>
          </div>

          <table className={cx('table', 'mt-4')}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Stt</th>
                <th scope="col">Tên</th>
                <th scope="col">Người hướng dẫn</th>
                <th scope="col">Trạng thái</th>
                <th scope="col" colSpan="2">
                  Thời gian tạo
                </th>
              </tr>
            </thead>

            <tbody>
              {courseResult.storedCourses.length === 0 ? (
                <tr>
                  <td colSpan="6" className={cx('text-center')}>
                    Bạn chưa đăng gì cả!
                    <a
                      className={cx('mt-4', 'btn-lg', 'btn-link', 'underline')}
                      href="/courses/store"
                    >
                      Đăng ngay
                    </a>
                  </td>
                </tr>
              ) : (
                courseResult.storedCourses.map((course, index) => (
                  <tr key={course._id}>
                    <td>
                      <div className={cx('form-check')}>
                        <input
                          className={cx('form-check-input')}
                          type="checkbox"
                          name="courseId[]"
                          checked={selectedCourses.includes(course._id)}
                          onChange={(e) =>
                            handleCourseCheckboxChange(e, course._id)
                          }
                        />
                      </div>
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td className={cx('name')}>{course.name}</td>
                    <td className={cx('number')}>
                      {course.instructor.map((ins, i) => (
                        <span key={i}>{ins.name}</span>
                      ))}
                    </td>
                    <td className={cx('number')}>{course.status}</td>
                    <td className={cx('duration')}>
                      {FormatTime(course.createdAt)}
                    </td>
                    <td>
                      <Button
                        style={{ fontSize: '16px' }}
                        href={`/lecture/${course.slug}/create`}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Thêm
                      </Button>
                      <Button
                        style={{ fontSize: '16px' }}
                        href={`/courses/${course._id}/edit`}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={(e) => handleDeleteButtonClick(course._id, e)}
                        style={{ fontSize: '16px' }}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </form>
      )}

      {/* Modal */}
      <Modal show={isDelete} onHide={() => setIsDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa hả?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn chắc chắn muốn xóa?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button primary small variant="danger" onClick={deleteCourse}>
            Xóa bỏ
          </Button>
          <Button
            outline
            small
            variant="secondary"
            onClick={() => setIsDelete(false)}
          >
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StoredCourse;
