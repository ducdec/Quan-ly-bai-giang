import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './content.module.scss';
import FormatDate from '~/components/FormatTime/FormatDate';

const cx = classNames.bind(styles);

function Content({ lecture }) {
  // Sử dụng useState để lưu trạng thái của video
  const [showVideo, setShowVideo] = useState(false);
  //video
  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <>
      <div className={cx('Video_wrapper', 'noselect')}>
        <div data-tour="learning-center">
          <div className={cx('VideoPlayer_wrapper')}>
            <div
              className={cx('VideoPlayer_player')}
              style={{ width: '100%', height: '100%' }}
            >
              <>
                {/* Hình ảnh thumbnail */}
                <div
                  className={cx('react-player__preview')}
                  tabIndex="0"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    cursor: 'pointer',
                    display: showVideo ? 'none' : 'flex', // Ẩn nếu showVideo là true
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url("https://i.ytimg.com/vi/${lecture.videoID}/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAb9wuXOpXrY3TDtPwmmgz4l9PQxg")`,
                  }}
                  onClick={handlePlayClick}
                >
                  {/* Icon play */}
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
                        borderColor:
                          'transparent transparent transparent white',
                        marginLeft: '7px',
                      }}
                    ></div>
                  </div>
                </div>

                {/* Video iframe */}
                {showVideo && (
                  <div style={{ width: '100%', height: '100%' }}>
                    <iframe
                      frameborder="0"
                      allowfullscreen=""
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      title="#"
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${lecture.videoID}?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Ffullstack.edu.vn&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1`}
                      id="widget2"
                    ></iframe>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('Video_content', 'Video_fullWidth')}>
        <div className={cx('Video_contentTop')}>
          <header className={cx('wrapper')}>
            <h1 className={cx('Heading_heading')}>{lecture.name}</h1>
            <p className={cx('Heading_updated')}>
              {FormatDate(lecture.createdAt)}
            </p>
          </header>
        </div>
        <div
          className={cx('MarkdownParser_wrapper')}
          style={{ '--font-size': '1.6rem', '--line-height': '2' }}
        >
          <p>{lecture.description}</p>
        </div>
      </div>
    </>
  );
}

export default Content;
