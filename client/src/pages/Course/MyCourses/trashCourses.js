import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import courseService from '~/services/courseServices';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function StoredCourse() {
  const [courseResult, setCourseResult] = useState({});
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseService.trashCourse();
        setCourseResult(result);
      } catch (error) {
        console.error('API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const restoreCourse = async (id, e) => {
    e.preventDefault();

    try {
      await courseService.restoreCourse(id);
      console.log('Khôi phục thành công');
      // Fetch the updated data after successful restoration
      const updatedResult = await courseService.trashCourse();
      setCourseResult(updatedResult);
      navigate(config.routes.trashCourse);
    } catch (err) {
      console.error('Khôi phục thất bại:', err);
    }
  };

  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteCourseId(id);
    setIsDelete(true);
    console.log(id);
  };

  const deleteCourse = async () => {
    if (deleteCourseId) {
      try {
        await courseService.trueDelete(deleteCourseId);
        console.log('Xóa thanh cong');
        // Fetch the updated data after successful deletion
        const updatedResult = await courseService.trashCourse();
        setCourseResult(updatedResult);
        navigate(config.routes.trashCourse);
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
          <h3>Đã xóa</h3>
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
              href="/courses/stored"
            >
              Danh sách
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
              {courseResult.length === 0 ? (
                <tr>
                  <td colSpan="6" className={cx('text-center')}>
                    Thùng rác trống!!!!
                    <a
                      className={cx('mt-4', 'btn-lg', 'btn-link', 'underline')}
                      href="/courses/stored"
                    >
                      Danh Sách
                    </a>
                  </td>
                </tr>
              ) : (
                courseResult.map((course, index) => (
                  <tr key={course._id}>
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
                        onClick={(e) =>
                          course.deleted ? restoreCourse(course._id, e) : null
                        }
                        style={{ fontSize: '16px' }}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Khôi phục
                      </Button>

                      <Button
                        onClick={(e) => handleDeleteButtonClick(course._id, e)}
                        style={{ fontSize: '16px' }}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Xóa vĩnh viễn
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </form>
      )}

      {/* {{!-- confim --}}  */}

      {/* Modal */}
      <Modal show={isDelete} onHide={() => setIsDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Vĩnh Viễn ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button primary small variant="danger" onClick={deleteCourse}>
            Xóa vĩnh viễn
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
