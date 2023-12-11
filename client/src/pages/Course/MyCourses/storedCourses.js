import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import courseService from '~/services/courseServices';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function StoredCourse() {
  const [courseResult, setCourseResult] = useState({
    storedCourses: [],
    countDeletedCourses: 0,
  });
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.storedCourse();
        setCourseResult(result);
      } catch (error) {
        console.error('Error in component:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCourse = async () => {
    if (deleteCourseId) {
      try {
        await courseService.Delete(deleteCourseId);
        console.log('Course deleted successfully');
      } catch (error) {
        console.error('Error deleting course:', error);
      } finally {
        setDeleteCourseId(null);
        setIsDelete(false);
      }
    }
  };

  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteCourseId(id);
    setIsDelete(true);
  };

  return (
    <div className={cx('form-container')}>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <form className={cx('mt-5')} name="container-form">
          <h3>Danh Sách</h3>
          <div className={cx('row')}>
            <div
              className={cx('mt-4', 'd-flex', 'align-items-center', 'col-md-5')}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
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
                )}
                aria-label="Default select example"
                name="action"
                defaultValue="-- Hành động --"
                required
              >
                <option disabled>-- Hành động --</option>
                <option value="delete">Xóa</option>
              </select>

              <button
                className={cx(
                  'btn',
                  'btn-primary',
                  'btn-lg',
                  'check-all-submit-btn',
                )}
                disabled
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

            {courseResult.storedCourses.length === 0 ? (
              <tr>
                <td colSpan="5" className={cx('text-center')}>
                  Bạn chưa đăng gì cả!
                  <a href="/courses/create">Đăng ngay</a>
                </td>
              </tr>
            ) : (
              courseResult.storedCourses.map((course, index) => (
                <tbody key={course._id}>
                  <tr>
                    <td>
                      <div className={cx('form-check')}>
                        <input
                          className={cx('form-check-input')}
                          type="checkbox"
                          name="courseId[]"
                        />
                      </div>
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td className={cx('name')}>{course.name}</td>
                    <td className={cx('number')}>{course.instructor}</td>
                    <td className={cx('number')}>{course.status}</td>
                    <td className={cx('duration')}>{course.createdAt}</td>
                    <td>
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
                </tbody>
              ))
            )}
          </table>
        </form>
      )}

      {/* {{!-- confim --}}  */}

      {/* Modal */}
      <Modal show={isDelete} onHide={() => setIsDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa hả?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn chắc chắn muốn xóa?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCourse}>
            Xóa bỏ
          </Button>
          <Button variant="secondary" onClick={() => setIsDelete(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {{!--Delete hidden form  --}} */}
      <form name="delete-course-form" method="POST"></form>
    </div>
  );
}

export default StoredCourse;
