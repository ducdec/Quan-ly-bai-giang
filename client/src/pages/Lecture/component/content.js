import { LeftIcon, RightIcon } from '~/components/Icons';
import styles from './content.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Content() {
  return (
    <>
      <div className={cx('Video_wrapper', 'noselect')}>
        <div data-tour="learning-center">
          <div className={cx('VideoPlayer_wrapper')}>
            <div
              className={cx('VideoPlayer_player')}
              style={{ width: '100%', height: '100%' }}
            >
              <div
                className={cx('react-player__preview')}
                tabIndex="0"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage:
                    'url("https://i.ytimg.com/vi/6nw9AWvYrak/maxresdefault.jpg")',
                }}
              >
                <div
                  className={cx('react-player__shadow')}
                  style={{
                    background:
                      'radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)',
                    borderRadius: '64px',
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    className={cx('react-player__play-icon')}
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '16px 0px 16px 26px',
                      borderColor: 'transparent transparent transparent white',
                      marginLeft: '7px',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('Video_content', 'Video_fullWidth')}>
        <div className={cx('Video_contentTop')}>
          <header className={cx('wrapper')}>
            <h1 className={cx('Heading_heading')}>Mobile menu responsive</h1>
            <p className={cx('Heading_updated')}>Cập nhật tháng 9 năm 2022</p>
          </header>
        </div>
        <div
          className={cx('MarkdownParser_wrapper')}
          style={{ '--font-size': '1.6rem', '--line-height': '2' }}
        >
          <p>
            Trong bài này các bạn cứ xem và code theo phần sử dụng Javascript
            nhé. Chúng ta sẽ học Javascript ở khóa Javascript cơ bản trên
            website này luôn nhé (sau khi học xong và nắm chắc kiến thức của
            khóa này)
          </p>
        </div>
      </div>

      <div className={cx('ActionBar_wrapper')}>
        <button className={cx('ActionBar_btn')}>
          <LeftIcon />
          <span>BÀI TRƯỚC</span>
        </button>
        <button
          className={cx(
            'ActionBar_btn',
            'ActionBar_primary',
            'ActionBar_disabled',
          )}
        >
          <span>BÀI TIẾP THEO</span>
          <RightIcon />
        </button>
        <div className={cx('ActionBar_toggle-wrap')}>
          <h3 className={cx('ActionBar_track-title')}>
            9. Responsive web The band
          </h3>
          <button className={cx('ActionBar_toggle-btn')}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className={cx('svg-inline--fa', 'fa-bars')}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Content;
