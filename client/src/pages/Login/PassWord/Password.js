import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import validation from '../Account/LoginValidation';
import Button from '~/components/Button';
import userService from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ForgotPassToken() {
  const [values, setValues] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(validation(values));

      // ...
    } catch (error) {
      console.error('Error during forgot password:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Kiểm tra lỗi và đưa ra quyết định ở đây
      if (!errors.email) {
        try {
          // Gửi yêu cầu mã xác nhận đến server
          const response = await userService.forgotPassToken(values);

          if (response.success) {
            console.log('Mã xác nhận đã được gửi thành công');
            navigate(config.routes.home);
          } else {
            console.log('Có lỗi xảy ra khi gửi mã xác nhận');
          }
        } catch (error) {
          console.error('Error during forgot password:', error);
        }
      }
    };

    fetchData();
  }, [errors, navigate, values]);
  return (
    <div className={cx('section')}>
      <div className={cx('form-box')}>
        <div className={cx('form-value')}>
          <form action="" onSubmit={handleSubmit}>
            <h2>Lấy lại mật khẩu</h2>
            <div className={cx('input-box')}>
              <FontAwesomeIcon icon={faEnvelope} className={cx('faicon')} />
              <input type="email" onChange={handleInput} name="email" />
              <label className={cx('label')} htmlFor="email">
                Email đăng ký
              </label>
              {errors.email && (
                <span className={cx('text-danger')}>{errors.email}</span>
              )}
            </div>
            <Button type="submit" btnLogin>
              Gửi mã
            </Button>
            <div className={cx('register')}>
              <p>
                Quay lại ? <a href="/login/signin">Đăng nhập</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassToken;
