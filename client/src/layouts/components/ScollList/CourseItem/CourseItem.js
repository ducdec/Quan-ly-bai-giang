// CourseItem.js

import React from 'react';
import styles from './CourseItem.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function CourseItem({ name, image, link }) {
  const isURL = /^(http|https):\/\//.test(image);

  let imageUrl = image;
  if (!isURL) {
    const file = new File([image], name); // 'name' là tên tệp
    imageUrl = URL.createObjectURL(file);
  }

  return (
    <section className={cx('col', 'c-12', 'm-4', 'col_1-3')}>
      <div className={cx('Item', 'Item-wrap')}>
        <a className={cx('Item-link')} href={`courses/${link}`}>
          {/* Sử dụng imageUrl thay vì image */}
          <Image src={imageUrl} className={cx('Item-image')} alt={name} />
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
