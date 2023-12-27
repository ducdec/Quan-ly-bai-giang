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
      <p className={cx('Powered_wrapper')}>
        {/* Your SVG and other elements */}
      </p>
    </>
  );
}

export default Content;
