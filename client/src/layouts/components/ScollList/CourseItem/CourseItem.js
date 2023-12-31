// CourseItem.js

import React from 'react';
import styles from './CourseItem.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function CourseItem({ name, image }) {
  // Sử dụng biểu thức chính quy để kiểm tra xem image có phải là URL hay không
  const isURL = /^(http|https):\/\//.test(image);

  return (
    <section className={cx('col', 'c-12', 'm-4', 'col_1-3')}>
      <div className={cx('Item', 'Item-wrap')}>
        <a className={cx('Item-link')} href="lecture">
          {/* Kiểm tra nếu là URL, sử dụng image trực tiếp, ngược lại, sử dụng đường dẫn từ thư mục 'assets' */}
          <Image
            src={isURL ? image : `/assets/images/${image}`}
            className={cx('Item-image')}
            alt={name}
          />
        </a>
        <h3 className={cx('Item-title')}>
          <a target="_self" href="lecture">
            {name}
          </a>
        </h3>
      </div>
    </section>
  );
}

export default CourseItem;
