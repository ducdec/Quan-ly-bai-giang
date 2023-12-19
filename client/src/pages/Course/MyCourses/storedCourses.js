import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import courseService from '~/services/courseServices';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function StoredCourse() {
  const [courseResult, setCourseResult] = useState({
    storedCourses: [],
    countDeletedCourses: 0,
  });
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

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

            <tbody>
              {courseResult.storedCourses.length === 0 ? (
                <tr>
                  <td colSpan="5" className={cx('text-center')}>
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
