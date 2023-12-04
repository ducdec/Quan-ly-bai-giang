import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';

const cx = classNames.bind(styles);

function TrashCourse() {
  return (
    <div className={cx('form-container')}>
      <form
        className={cx('mt-5')}
        name="container-form"
        method="POST"
        action="/courses/handle-form-actions"
      >
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
              required
              defaultValue="-- Hành động --"
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
            href="/stored/courses"
          >
            Danh sách khóa học
          </a>
        </div>

        <table className={cx('table', 'mt-4')}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Stt</th>
              <th scope="col">Tên</th>
              <th scope="col">Người hướng dẫn</th>
              <th scope="col">Số tiết</th>
              <th scope="col" colSpan="2">
                Thời gian tạo
              </th>
            </tr>
          </thead>

          {/* {{#if course}} */}
          <tbody>
            <tr>
              <td>
                <div className={cx('form-check')}>
                  <input
                    className={cx('form-check-input')}
                    type="checkbox"
                    name="courseId[]"
                    value="{{this._id}}"
                  />
                </div>
              </td>
              <th scope="row">1</th>
              <td className={cx('name')}>name</td>
              <td className={cx('number')}>1</td>
              <td className={cx('number')}>123</td>
              <td className={cx('duration')}>1tieng 32phut</td>
              <td>
                <a
                  style={{ fontSize: '16px' }}
                  href={`/courses/edit`}
                  className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                >
                  Khôi phục
                </a>
                <a
                  href="123"
                  style={{ fontSize: '16px' }}
                  className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                  data-id="{this._id}"
                  data-toggle="modal"
                  data-target="#delete-course-model"
                >
                  Xóa vĩnh viễn
                </a>
              </td>
            </tr>
          </tbody>
          {/* {{else}} */}
          <tr>
            <td colSpan="5" className={cx('text-center')}>
              Thùng rác trống!
              <a href="/stored/courses">Danh sách</a>
            </td>
          </tr>
          {/* {/if} */}
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
              <p>Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa?</p>
            </div>
            <div className={cx('modal-footer')}>
              <button
                type="button"
                id="btn-delete-course"
                className={cx('btn', 'btn-danger')}
              >
                Xóa vĩnh viễn
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
      <form name="restore-course-form" method="POST"></form>
    </div>
  );
}

export default TrashCourse;
