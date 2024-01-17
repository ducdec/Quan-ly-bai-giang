import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  //console.log(data);
  return (
    <Link to={`/courses/${data.slug}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={data.imageUrl} alt={data.slug} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.name}</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <span className={cx('username')}>
          {data.instructors.map((ins) => ins.name).join(', ')}
        </span>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
