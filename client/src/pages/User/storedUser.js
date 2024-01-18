import React from 'react';
import classNames from 'classnames/bind';
import styles from './storedUser.module.scss';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import userService from '~/services/userServices';

const cx = classNames.bind(styles);

function StoredUsers() {
  const [userResult, setUserResult] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  //
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIns, setSelectedIns] = useState([]);
  const [showActionWarning, setShowActionWarning] = useState(false);

  //console.log('data', userResult);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userService.storedUser();
        setUserResult(result);
        //console.log('result', result);
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

    const allInstIds = userResult.map((user) => user._id);

    if (isChecked && selectedIns.length === allInstIds.length) {
      // Hủy tích "Chọn tất cả"
      setSelectAll(false);
      setSelectedIns([]);
    } else {
      // Ngược lại, thiết lập danh sách khóa học đã chọn thành tất cả các ID
      setSelectedIns(isChecked ? allInstIds : []);
    }
  };

  const handleInsCheckboxChange = (e, userId) => {
    const isChecked = e.target.checked;
    setSelectAll(false);

    if (isChecked) {
      setSelectedIns((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedIns((prevSelected) =>
        prevSelected.filter((id) => id !== userId),
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
      selectedIns.forEach(async (userId) => {
        await userService.deleteUser(userId);
      });
    }

    // Sau khi thực hiện hành động, cập nhật danh sách khóa học và làm sạch dữ liệu đã chọn
    const updatedResult = await userService.storedUser();
    setUserResult(updatedResult);
    setSelectedIns([]);
    navigate(config.routes.storedIns);
  };

  //lay id user
  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteUserId(id);
    setIsDelete(true);
  };

  const deleteUser = async () => {
    console.log(deleteUserId);

    if (deleteUserId) {
      try {
        await userService.deleteUser(deleteUserId);
        console.log('Xóa thanh cong');
        // Fetch the updated data after successful deletion
        const updatedResult = await userService.storedUser();
        setUserResult(updatedResult);
        navigate(config.routes.storeUsers);
      } catch (error) {
        console.error('Xoa that bai:', error);
      } finally {
        setDeleteUserId(null);
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
                <th scope="col">Email</th>
                <th scope="col">Quyền</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {userResult.length === 0 ? (
                <tr>
                  <td colSpan="6" className={cx('text-center')}>
                    Chưa có người dùng nào cả !
                  </td>
                </tr>
              ) : (
                userResult.map((user, index) => (
                  <tr key={user._id}>
                    <td>
                      <div className={cx('form-check')}>
                        <input
                          className={cx('form-check-input')}
                          type="checkbox"
                          name="userId[]"
                          checked={selectedIns.includes(user._id)}
                          onChange={(e) => handleInsCheckboxChange(e, user._id)}
                        />
                      </div>
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td className={cx('name', 'th_col')}>{user.username}</td>
                    <td className={cx('number', 'th_col')}>{user.email}</td>
                    <td className={cx('number', 'th_col')}>{user.role}</td>
                    <td>
                      <Button
                        style={{ fontSize: '16px' }}
                        to={`/users/${user._id}/edit`}
                        className={cx('btn', 'btn-lg', 'btn-link', 'underline')}
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={(e) => handleDeleteButtonClick(user._id, e)}
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
          <Modal.Title>Xóa người dùng ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button primary small variant="danger" onClick={deleteUser}>
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

export default StoredUsers;
