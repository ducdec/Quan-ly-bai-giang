import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import validationFunctions from './LoginValidation';
import Button from '~/components/Button';
import userService from '~/services/userServices';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignUp() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigate = useNavigate();
  //handle
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(validationFunctions.validationSignup(values));
    } catch (error) {
      console.error('Error during signup:', error);
      return;
    }
  };

  useEffect(() => {
    const signupUser = async () => {
      try {
        // Check if there are no errors after the state has been updated
        if (!errors.username && !errors.email && !errors.password) {
          const newUser = await userService.signup(values);
          navigate('/login/signin');
          console.log(newUser);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    };

    signupUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleRememberPassword = () => {
    setRememberPassword(!rememberPassword);
  };

  return (
    <div className={cx('section')}>
      <div className={cx('form-box2')}>
        <div className={cx('form-value')}>
          <form onSubmit={handleSubmit}>
            <h2>Đăng ký</h2>
            <div className={cx('input-box')}>
              <FontAwesomeIcon icon={faUser} className={cx('faicon')} />
              <input type="text" onChange={handleInput} name="username" />
              <label className={cx('label')}>Name</label>
              {errors.username && (
                <span className={cx('text-danger')}>{errors.username}</span>
              )}
            </div>
            <div className={cx('input-box')}>
              <FontAwesomeIcon icon={faEnvelope} className={cx('faicon')} />
              <input type="email" onChange={handleInput} name="email" />
              <label className={cx('label')}>Email</label>
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
              <label className={cx('label')}>Mật Khẩu</label>
            </div>
            <div className={cx('forget')}>
              <label className={cx('label')}>
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={handleRememberPassword}
                />
                Nhớ <a href="/">Lấy lại mật khẩu</a>
              </label>
            </div>
            <Button type="submit" btnLogin>
              Đăng ký
            </Button>
            <div className={cx('register')}>
              <p>
                Bạn đã có tài khoản? <Link to="/login/signin">Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
