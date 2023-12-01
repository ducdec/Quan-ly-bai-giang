import Image from '~/components/Image';
import styles from './ScollList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ScollList() {
  return (
    <div className={cx('ScollList')}>
      <div>
        <div className={cx('SL-heading-wrap')}>
          <h2 className={cx('SL-heading')}>
            <span>Khoa hoc pro</span>
          </h2>
        </div>
      </div>

      <div className={cx('ScollList-body')}>
        <section className={cx('index-module-row')}>
          <section className={cx('index-module-col')}>
            <div className={cx('Item-wrap')}>
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

          <section className={cx('index-module-col')}>
            <div className={cx('Item-wrap')}>
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
        </section>
      </div>
    </div>
  );
}

export default ScollList;
