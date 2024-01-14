import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { validation } from './PassValidation';
import Button from '~/components/Button';
import userService from '~/services/userServices';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ForgotPass() {
  const { token } = useParams;
  const [values, setValues] = useState({
    password: '',
    againPass: '',
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(validation(values, values.againPass));

      // Kiểm tra nếu không có lỗi
      if (!errors.password) {
        const User = await userService.forgotPassNew(token, values);

        // Kiểm tra nếu đăng nhập thành công
        if (User) {
          console.log(User); // Optional: log the user data
          navigate(config.routes.home);
        } else {
          console.log('Khong duoc');
        }
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  console.log('values:', values);
  return (
    <div className={cx('section')}>
      <div className={cx('form-box')}>
        <div className={cx('form-value')}>
          <form action="" onSubmit={handleSubmit}>
            <h2>Đổi mật khẩu</h2>
            <div className={cx('input-box')}>
              <input type="text" onChange={handleInput} name="password" />
              {errors.password && (
                <span className={cx('text-danger')}>{errors.password}</span>
              )}
              <label className={cx('label')} htmlFor="">
                Mật khẩu mới
              </label>
            </div>

            <div className={cx('input-box')}>
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEyeSlash : faEye}
                className={cx('faicon')}
                onClick={togglePasswordVisibility}
              />
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                onChange={handleInput}
                name="againPass"
              />
              {errors.password && (
                <span className={cx('text-danger')}>{errors.password}</span>
              )}
              <label className={cx('label')} htmlFor="">
                Nhập lại mật khẩu
              </label>
            </div>
            <Button type="submit" btnLogin>
              Đổi mật khẩu
            </Button>
            <div className={cx('register')}>
              <p>
                Quay lại ? <Link to="/login/signin">Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
