import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import SettingName from './settingUser/SettingName';
import SettingAvatar from './settingUser/SettingAvatar';
import SettingEmail from './settingUser/SettingEmail';
import SettingPassword from './settingUser/SettingPass';

const cx = classNames.bind(styles);

function GeneralSettings() {
  return (
    <div className={cx('Setting_pageWrapper')}>
      <section className={cx('row')}>
        <section className={cx('col', 'c-12', 'm-12', 'l-12')}>
          <div className={cx('wrapper')}>
            <div className={cx('GroupField_wrapper')}>
              <h2 className={cx('GroupField_heading')}>Thông tin cá nhân</h2>

              <SettingName />
              <SettingAvatar />
              <SettingEmail />
              <SettingPassword />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default GeneralSettings;
