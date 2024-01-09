import { StartIcon } from '~/components/Icons';
import styles from './TrackItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import courseService from '~/services/courseServices';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

import { XIcon } from '~/components/Icons';
import lectureService from '~/services/lectureServices';

const cx = classNames.bind(styles);

function TrackItemCreate({ lectures, nameCourse, index, slug }) {
  //console.log(courseResult);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [updatedLectures, setUpdatedLectures] = useState([]);
  //

  //course
  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteCourseId(id);
    setIsDelete(true);
  };

  const deleteCourse = async () => {
    console.log(deleteCourseId);

    if (deleteCourseId) {
      try {
        await lectureService.DeleteLec(slug, deleteCourseId);
        console.log('Xóa thành công');

        // Fetch the updated data after successful deletion
        await courseService.storedCourse();
        // Cập nhật state với danh sách bài giảng mới
        setUpdatedLectures(
          lectures.filter((lec) => lec._id !== deleteCourseId),
        );
      } catch (error) {
        console.error('Xóa thất bại:', error);
      } finally {
        setDeleteCourseId(null);
        setIsDelete(false);
      }
    }
  };

  // useEffect để re-render khi updatedLectures thay đổi
  useEffect(() => {
    // Cập nhật state, có thể thêm logic xử lý khác ở đây nếu cần
    setUpdatedLectures(lectures);
  }, [lectures]);
  return (
    <>
      <div className={cx('TrackItem_wrapper')}>
        <h3 className={cx('TrackItem_title')}>{nameCourse}</h3>
        <span className={cx('TrackItem_desc')}>{index}/? | 20:39</span>
        <span className={cx('TrackItem_icon')}></span>
      </div>
      <div className={cx('trackItem_list')}>
        {updatedLectures.map((lec) => (
          <Link
            to={`/lecture/${slug}/${lec._id}/edit`}
            key={lec._id}
            className={cx('StepItem_wrapper', 'learn-item-1')}
          >
            <div className={cx('StepItem_info')}>
              <h3 className={cx('StepItem_title')}>{lec.name}</h3>
              <p className={cx('StepItem_desc')}>
                <StartIcon className={cx('lesson-icon')} />
                <span>03:15</span>
              </p>
            </div>
            <div
              onClick={(e) => handleDeleteButtonClick(lec._id, e)}
              className={cx('StepItem_icon-box')}
            >
              <XIcon />
            </div>
          </Link>
        ))}
      </div>
      {/* Modal */}
      <Modal show={isDelete} onHide={() => setIsDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa hả?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn chắc chắn muốn xóa? Hành động này không thể khôi phục</p>
        </Modal.Body>
        <Modal.Footer>
          <Button primary small variant="danger" onClick={deleteCourse}>
            Xóa bỏ
          </Button>
          <Button
            outline
            small
            variant="secondary"
            onClick={() => setIsDelete(false)}
          >
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TrackItemCreate;
