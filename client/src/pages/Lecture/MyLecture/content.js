import { LeftIcon, RightIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './content.module.scss';
import FormatDate from '~/components/FormatTime/FormatDate';
// import { getVideoDurationInSeconds } from 'get-video-duration';
const cx = classNames.bind(styles);

function Content({ lecture }) {
  // Sử dụng useState để lưu trạng thái của video
  const [showVideo, setShowVideo] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(1);

  //chuyen bai
  const handlePreviousClick = () => {
    if (currentLecture > 1) {
      setCurrentLecture(currentLecture - 1);
    }
  };

  const handleNextClick = () => {
    // Thay bằng số lượng bài giảng tối đa của khóa học
    if (currentLecture < lecture.length) {
      setCurrentLecture(currentLecture + 1);
    }
  };
  const isPreviousDisabled = currentLecture === 1;
  const isNextDisabled = currentLecture === lecture.length;

  // console.log(currentLecture, currentLecture);
  //video
  const handlePlayClick = () => {
    // Khi icon được ấn, chuyển trạng thái của video sang true
    setShowVideo(true);
  };

  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    console.log('Line 42 : video ', video);
    if (!video) return;
    console.log(`The video is ${video.duration} seconds long.`);
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
                      ref={videoRef}
                      onLoadedMetadata={handleLoadedMetadata}
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

      {/* <div className={cx('ActionBar_wrapper')}>
        <button
          className={cx('ActionBar_btn', {
            ActionBar_disabled: isPreviousDisabled,
          })}
          onClick={handlePreviousClick}
          disabled={isPreviousDisabled}
        >
          <LeftIcon />
          <span>BÀI TRƯỚC</span>
        </button>
        <button
          className={cx('ActionBar_btn', 'ActionBar_primary', {
            ActionBar_disabled: isNextDisabled,
          })}
          onClick={handleNextClick}
          disabled={isNextDisabled}
        >
          <span>BÀI TIẾP THEO</span>
          <RightIcon />
        </button>
        <div className={cx('ActionBar_toggle-wrap')}>
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
      </div> */}
    </>
  );
}

export default Content;
