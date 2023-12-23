import React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignUp() {
  return (
    <div className={cx('section')}>
      <div className={cx('form-box')}>
        <div className={cx('form-value')}>
          <form action="">
            <h2>Đăng ký</h2>
            <div className={cx('input-box')}>
              <FontAwesomeIcon icon={faEnvelope} className={cx('faicon')} />
              <input type="email" required />
              <label className={cx('label')} htmlFor="">
                Email
              </label>
            </div>
            <div className={cx('input-box')}>
              <FontAwesomeIcon className={cx('faicon')} icon={faLock} />
              <input type="password" required />
              <label className={cx('label')} htmlFor="">
                Mật khẩu
              </label>
            </div>
            <div className={cx('input-box')}>
              <FontAwesomeIcon className={cx('faicon')} icon={faLock} />
              <input type="password" required />
              <label className={cx('label')} htmlFor="">
                Nhập lại Mật khẩu
              </label>
            </div>
            <Button btnLogin>Đăng ký</Button>
            <div className={cx('register')}>
              <p>
                Bạn đã có tài khoản? <a href="/login/signin">Đăng nhập</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
