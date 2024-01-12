import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import validation from './LoginValidation';
import Button from '~/components/Button';
import userService from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function SignIn() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [users, serUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userService.datauUser();
        //console.log('Line 34 ', result);
        console.log('Data from API:', result);
        serUsers(result);
      } catch (error) {
        console.error('API:', error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   // Kiểm tra lỗi mỗi khi giá trị thay đổi
  //   setErrors(validation(values, users));
  // }, [values, users]);

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(validation(values, users));

      // Kiểm tra nếu không có lỗi
      if (!errors.email && !errors.password) {
        const User = await userService.signin(values);

        // Kiểm tra nếu đăng nhập thành công
        if (User) {
          console.log(User); // Optional: log the user data
          navigate(config.routes.home);
        } else {
          console.log('Tài khoản hoặc mật khẩu không chính xác');
        }
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  console.log('values:', values, 'user:', users);
  return (
    <div className={cx('section')}>
      <div className={cx('form-box')}>
        <div className={cx('form-value')}>
          <form action="" onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div className={cx('input-box')}>
              <FontAwesomeIcon icon={faEnvelope} className={cx('faicon')} />
              <input type="email" onChange={handleInput} name="email" />
              <label className={cx('label')} htmlFor="">
                Email
              </label>
              {errors.email && (
                <span className={cx('text-danger')}>{errors.email}</span>
              )}
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
                name="password"
              />
              {errors.password && (
                <span className={cx('text-danger')}>{errors.password}</span>
              )}
              <label className={cx('label')} htmlFor="">
                Mật Khẩu
              </label>
            </div>
            <div className={cx('forget')}>
              <label className={cx('label')} htmlFor="">
                <input type="checkbox" />
                Nhớ <a href="/">Lấy lại mật khẩu</a>
              </label>
            </div>
            <Button type="submit" btnLogin>
              Đăng nhập
            </Button>
            <div className={cx('register')}>
              <p>
                Bạn chưa có tài khoản? <a href="/login/signup">Đăng ký</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
