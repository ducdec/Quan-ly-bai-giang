import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import { useState, useEffect } from 'react';

import * as courseServices from '~/services/courseServices';

const cx = classNames.bind(styles);

function StoredCourse() {
  const [courseResult, setCourseResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await courseServices.storedCourse();
        setCourseResult(result);
      } catch (error) {
        console.error('Error in component:', error);
      }
    };

    fetchData();
  }, []); // [] useEffect chỉ chạy một lần

  return (
    <div className={cx('form-container')}>
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
            Thùng Rác(0)
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

          {courseResult.length === 0 ? (
            <tr>
              <td colSpan="5" className={cx('text-center')}>
                Bạn chưa đăng gì cả!
                <a href="/courses/create">Đăng ngay</a>
              </td>
            </tr>
          ) : (
            courseResult.map((course, index) => (
              <tbody>
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
                  <td className={cx('number')}>{course.instructors}</td>
                  <td className={cx('number')}>{course.status}</td>
                  <td className={cx('duration')}>{course.createdAt}</td>
                  <td>
                    <a
                      style={{ fontSize: '16px' }}
                      href={`/courses/${course._id}/edit`}
                      className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                    >
                      Sửa
                    </a>
                    <a
                      href="123"
                      style={{ fontSize: '16px' }}
                      className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      data-id={`${course._id}`}
                      data-toggle="modal"
                      data-target="#delete-course-model"
                    >
                      Xóa
                    </a>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </form>

      {/* {{!-- confim --}}  */}

      <div
        className={cx('modal')}
        id="delete-course-model"
        tabIndex="-1"
        role="dialog"
      >
        <div className={cx('modal-dialog')} role="document">
          <div className={cx('modal-content')}>
            <div className={cx('modal-header')}>
              <h5 className={cx('modal-title')}>Xóa hả?</h5>
              <button
                type="button"
                className={cx('btn-close')}
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className={cx('modal-body')}>
              <p>Bạn chắc chắn muốn xóa?</p>
            </div>
            <div className={cx('modal-footer')}>
              <button
                type="button"
                id="btn-delete-course"
                className={cx('btn', 'btn-danger')}
              >
                Xóa bỏ
              </button>
              <button
                type="button"
                className={cx('btn', 'btn-secondary')}
                data-dismiss="modal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {{!--Delete hidden form  --}} */}
      <form name="delete-course-form" method="POST"></form>
    </div>
  );
}

export default StoredCourse;
