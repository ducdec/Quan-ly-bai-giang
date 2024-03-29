import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from 'antd';

import styles from './EditUsers.module.scss';
import Button from '~/components/Button';
import Back from '~/layouts/components/Back';
import config from '~/config';
import userService from '~/services/userServices';

const cx = classNames.bind(styles);

function UpdateUsers() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [selectedRole, setSelectedRole] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userService.userId(id);
        //console.log('Line 34 ', result);
        setFormData(result);
        setSelectedRole(result.role);
        //const dataUser = await userService.storedUser();
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setFormData((prevLec) => ({
      ...prevLec,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
    console.log('61', selectedRole);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['username', 'email', 'role'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }

    formData.role = selectedRole;

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo khóa học
    userService
      .userUpdate(id, formData)
      .then((res) => {
        console.log('Success:', res.data);
        navigate(config.routes.storeUsers);
      })
      .catch((error) => {
        console.error('Error:', error.res ? error.res.data : error.message);
      });
  };

  const roleOptions = [
    { value: 'User', label: 'User' },
    { value: 'Admin', label: 'Admin' },
  ];
  //console.log('Form Data:', formData);

  return (
    <div className={cx('content_wrapper')}>
      <div className={cx('form-container')}>
        <div className={cx('mt-5')}>
          <div className={cx('back')}>
            <Back to={config.routes.storeUsers} />
          </div>
          <h3>Sửa Người dùng</h3>

          <form onSubmit={handleUpdate}>
            <div className={cx('form-group')}>
              <div className={cx('mb-3')}>
                <label htmlFor="username" className="form-label">
                  Tên
                </label>
                <input
                  onChange={handleInputChange}
                  value={formData.username}
                  type="text"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('username'),
                  })}
                  id="username"
                  name="username"
                />
                {errorFields.includes('username') && (
                  <div className="invalid-feedback">Vui lòng nhập tên.</div>
                )}
              </div>

              <>
                <div className={cx('form-group', 'row')}>
                  <label
                    htmlFor="role"
                    className={cx('col-md-2', 'col-form-label')}
                  >
                    Quyền
                  </label>
                  <div className={cx('col-md-4')}>
                    <Select
                      value={selectedRole}
                      placeholder="Chọn quyền truy cập"
                      style={{ width: '100%' }}
                      onChange={handleRoleChange}
                      options={roleOptions}
                      showSearch
                      optionFilterProp="children"
                      className={cx({
                        'is-invalid': errorFields.includes('role'),
                      })}
                    />
                    {errorFields.includes('role') && (
                      <div className="invalid-feedback">
                        Vui lòng chọn quyền
                      </div>
                    )}
                  </div>
                </div>
              </>

              <div className="mb-3">
                <label htmlFor="videoID" className="form-label">
                  Email
                </label>
                <input
                  onChange={handleInputChange}
                  value={formData.email}
                  type="text"
                  className={cx('form-control', {
                    'is-invalid': errorFields.includes('email'),
                  })}
                  id="email"
                  name="email"
                />
                {errorFields.includes('email') && (
                  <div className="invalid-feedback">Vui lòng nhập email.</div>
                )}
              </div>

              <Button blue onClick={handleUpdate} type="submit">
                Sửa
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUsers;
