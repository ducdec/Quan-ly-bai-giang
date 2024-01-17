import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import validationFunctions from './LoginValidation';
import Button from '~/components/Button';
import userService from '~/services/userServices';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '~/store/userSlice';

const cx = classNames.bind(styles);

function SignIn() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.data);

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Lưu trữ dữ liệu vào localStorage khi component unmounted
    return () => {
      localStorage.setItem('userStore', JSON.stringify(userState));
    };
  }, [userState]);

  // useEffect(() => {
  //   // Kiểm tra lỗi mỗi khi giá trị thay đổi
  //   setErrors(validation(values, users));
  // }, [values, users]);

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors(validationFunctions.validation(values));
      // Kiểm tra nếu không có lỗi
      if (!errors.email && !errors.password) {
        const { user, token } = await userService.signin(values);
        // Kiểm tra nếu đăng nhập thành công
        if (user) {
          dispatch(setUser(user));
          // Lưu token vào localStorage
          localStorage.setItem('token', token);
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
  //console.log('values:', values, 'user:', userState);
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
              {errors.password && showError && (
                <span className={cx('text-danger')}>{errors.password}</span>
              )}
              <label className={cx('label')} htmlFor="">
                Mật Khẩu
              </label>
            </div>
            <div className={cx('forget')}>
              <label className={cx('label')} htmlFor="">
                <input type="checkbox" />
                Nhớ <a href="/login/password">Lấy lại mật khẩu</a>
              </label>
            </div>
            <Button type="submit" btnLogin>
              Đăng nhập
            </Button>
            <div className={cx('register')}>
              <p>
                Bạn chưa có tài khoản? <Link to="/login/signup">Đăng ký</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
