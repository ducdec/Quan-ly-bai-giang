import React from 'react';
import classNames from 'classnames/bind';
import styles from './MyInstructor.module.scss';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import InstructorService from '~/services/instructorServices';

const cx = classNames.bind(styles);

function StoredInstructor() {
  const [insResult, setInsResult] = useState([]);
  const [deleteInsId, setDeleteInsId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  //
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIns, setSelectedIns] = useState([]);
  const [showActionWarning, setShowActionWarning] = useState(false);

  //console.log('data', insResult);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await InstructorService.storedInstructor();
        setInsResult(result);
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

    const allInstIds = insResult.map((instructor) => instructor._id);

    if (isChecked && selectedIns.length === allInstIds.length) {
      // Hủy tích "Chọn tất cả"
      setSelectAll(false);
      setSelectedIns([]);
    } else {
      // Ngược lại, thiết lập danh sách khóa học đã chọn thành tất cả các ID
      setSelectedIns(isChecked ? allInstIds : []);
    }
  };

  const handleInsCheckboxChange = (e, instructorId) => {
    const isChecked = e.target.checked;
    setSelectAll(false);

    if (isChecked) {
      setSelectedIns((prevSelected) => [...prevSelected, instructorId]);
    } else {
      setSelectedIns((prevSelected) =>
        prevSelected.filter((id) => id !== instructorId),
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
      selectedIns.forEach(async (instructorId) => {
        await InstructorService.trueDelete(instructorId);
      });
    }

    // Sau khi thực hiện hành động, cập nhật danh sách khóa học và làm sạch dữ liệu đã chọn
    const updatedResult = await InstructorService.storedIntructor();
    setInsResult(updatedResult);
    setSelectedIns([]);
    navigate(config.routes.storedIns);
  };

  //instructor
  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteInsId(id);
    setIsDelete(true);
  };

  const deleteinstructor = async () => {
    console.log(deleteInsId);

    if (deleteInsId) {
      try {
        await InstructorService.trueDelete(deleteInsId);
        console.log('Xóa thanh cong');
        // Fetch the updated data after successful deletion
        const updatedResult = await InstructorService.storedInstructor();
        setInsResult(updatedResult);
        navigate(config.routes.storedIns);
      } catch (error) {
        console.error('Xoa that bai:', error);
      } finally {
        setDeleteInsId(null);
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
                disabled={selectedIns.length === 0}
              >
                Thực hiện
              </button>
            </div>
          </div>

          <table className={cx('table', 'mt-4')}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Stt</th>
                <th scope="col">Tên</th>
                <th scope="col">Khóa học giảng dạy</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {insResult.length === 0 ? (
                <tr>
                  <td colSpan="6" className={cx('text-center')}>
                    Chưa có người hướng dẫn!
                    <a
                      className={cx('mt-4', 'btn-lg', 'btn-link', 'underline')}
                      href="/instructor/create"
                    >
                      Tạo ngay
                    </a>
                  </td>
                </tr>
              ) : (
                insResult.map((instructor, index) => (
                  <tr key={instructor._id}>
                    <td>
                      <div className={cx('form-check')}>
                        <input
                          className={cx('form-check-input')}
                          type="checkbox"
                          name="instructorId[]"
                          checked={selectedIns.includes(instructor._id)}
                          onChange={(e) =>
                            handleInsCheckboxChange(e, instructor._id)
                          }
                        />
                      </div>
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td className={cx('name', 'th_col')}>{instructor.name}</td>
                    <td className={cx('number', 'th_col')}>
                      {instructor.courses.map((ins, i) => (
                        <div key={i}>{ins.name}</div>
                      ))}
                    </td>
                    <td>
                      <Button
                        style={{ fontSize: '16px' }}
                        to={`/instructor/${instructor._id}/edit`}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleDeleteButtonClick(instructor._id, e)
                        }
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
          <Button primary small variant="danger" onClick={deleteinstructor}>
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

export default StoredInstructor;
