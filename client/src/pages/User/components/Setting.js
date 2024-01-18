import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import SettingName from './settingUser/SettingName';
import SettingAvatar from './settingUser/SettingAvatar';
import SettingEmail from './settingUser/SettingEmail';
import SettingPassword from './settingUser/SettingPass';
import userService from '~/services/userServices';
import { useDispatch } from 'react-redux';
import { setUser } from '~/actions/actions';

const cx = classNames.bind(styles);

function GeneralSettings() {
  const [id, setId] = useState('');
  const [dataName, setDataName] = useState('');
  const [dataAvatar, setDataAvatar] = useState('');
  const [dataEmail, setDataEmail] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserFromToken = async () => {
      const storedToken = localStorage.getItem('token');
      // Kiểm tra xem có token hay không
      if (storedToken) {
        try {
          const user = await userService.getUserFromToken();

          setDataName(user.username);
          setDataEmail(user.email);
          setDataAvatar(user.image);
          setId(user._id);
          dispatch(setUser(user));
          //console.log('Dispatch result:', action);
        } catch (error) {
          console.error('Error while fetching user:', error);
          // Xử lý lỗi (ví dụ: xóa token nếu không hợp lệ)
          localStorage.removeItem('token');
        }
      }
    };

    fetchUserFromToken();
  }, [dispatch]);

  const updateDataName = (newData) => {
    setDataName(newData);
    // Gửi cập nhật lên server
    sendUpdateToServer({ username: newData });
  };

  const updateDataAvatar = (newData) => {
    setDataAvatar(newData);
    // Gửi cập nhật lên server
    sendUpdateToServer({ image: newData });
  };

  const updateDataPass = (newData) => {
    // Gửi cập nhật lên server
    sendUpdateToServer({ password: newData });
  };

  const sendUpdateToServer = (updateData) => {
    // Gửi dữ liệu cập nhật lên server ở đây, có thể sử dụng thư viện axios hoặc fetch
    // Ví dụ:
    userService
      .setting(updateData, id)

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div className={cx('Setting_pageWrapper')}>
      <section className={cx('row')}>
        <section className={cx('col', 'c-12', 'm-12', 'l-12')}>
          <div className={cx('wrapper')}>
            <div className={cx('GroupField_wrapper')}>
              <h2 className={cx('GroupField_heading')}>Thông tin cá nhân</h2>

              <SettingName updateData={updateDataName} data={dataName} />
              <SettingAvatar updateData={updateDataAvatar} data={dataAvatar} />
              <SettingEmail data={dataEmail} />
              <SettingPassword updateData={updateDataPass} />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default GeneralSettings;
