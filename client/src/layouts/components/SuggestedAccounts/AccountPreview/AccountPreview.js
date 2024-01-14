import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
  const [dataInstructors, setDataInstructors] = useState([]);
  const [dataLectures, setDataLectures] = useState([]);
  useEffect(() => {
    setDataInstructors(data.instructors || []);
    setDataLectures(data.lectures || []);
  }, [data.instructors]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <Image className={cx('avatar')} src={data.imageUrl} alt="" />
        <div>
          <Button
            to={`/courses/${data.slug}`}
            className={cx('watch-btn')}
            primary
          >
            Xem
          </Button>
        </div>
      </div>

      <div className={cx('body')}>
        <h4 className={cx('nickname')}>
          <strong>{data.name}</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        {dataInstructors && dataInstructors.length > 0 && (
          <p className={cx('name')}>
            {dataInstructors.map((ins) => ins.name).join(', ')}
          </p>
        )}

        <p className={cx('analysis')}>
          {dataLectures && (
            <strong className={cx('value')}>{dataLectures.length} </strong>
          )}
          <span className={cx('label')}>bài học</span>
          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>follow</span>
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;
