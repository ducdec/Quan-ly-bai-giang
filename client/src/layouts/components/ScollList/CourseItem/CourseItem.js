import Image from '~/components/Image';
import styles from './CourseItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CourseItem() {
  return (
    <section className={cx('col', 'c-12', 'm-4', 'col_1-3')}>
      <div className={cx('Item', 'Item-wrap')}>
        <a className={cx('Item-link')} href="lecture">
          <Image
            src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
            className={cx('Item-image')}
            alt="html"
          />
        </a>
        <h3 className={cx('Item-title')}>
          <a target="_self" href="lecture">
            HTML CSS
          </a>
        </h3>
      </div>
    </section>
  );
}

export default CourseItem;
