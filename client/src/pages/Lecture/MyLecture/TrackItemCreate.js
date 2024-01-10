import { StartIcon } from '~/components/Icons';
import styles from './TrackItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import { XIcon } from '~/components/Icons';
//import courseService from '~/services/courseServices';
import lectureService from '~/services/lectureServices';

const cx = classNames.bind(styles);

function TrackItemCreate({ lectures, nameCourse, index, id, slug }) {
  const [activeIndex, setActiveIndex] = useState(null);

  //console.log(courseResult);
  const [deleteLectureId, setDeleteLectureId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [updatedLectures, setUpdatedLectures] = useState([]);
  //
  const navigate = useNavigate();

  //course
  const handleDeleteButtonClick = (id, e) => {
    e.preventDefault();
    setDeleteLectureId(id);
    setIsDelete(true);
  };
  console.log('30', deleteLectureId);
  const deleteCourse = async () => {
    console.log(deleteLectureId);

    if (deleteLectureId) {
      try {
        await lectureService.DeleteLec(slug, deleteLectureId);
        console.log('Xóa thành công', id);
        navigate(`/lecture/${id}/create`);

        // Không cần gọi lại server để lấy danh sách mới
        setUpdatedLectures((prevLectures) =>
          prevLectures.filter((lec) => lec._id !== deleteLectureId),
        );
      } catch (error) {
        console.error('Xóa thất bại:', error);
      } finally {
        setDeleteLectureId(null);
        setIsDelete(false);
      }
    }
  };
  console.log('52:', updatedLectures);
  //useEffect để re-render khi updatedLectures thay đổi
  useEffect(() => {
    const filteredLectures = lectures.filter((lec) => lec !== undefined);
    setUpdatedLectures(filteredLectures);
  }, [lectures]);

  const handleClick = (index) => {
    // Hàm xử lý khi Link được nhấp vào
    setActiveIndex(index);
  };

  return (
    <>
      <div className={cx('TrackItem_wrapper')}>
        <h3 className={cx('TrackItem_title')}>{nameCourse}</h3>
        <span className={cx('TrackItem_desc')}>{index}/? | 20:39</span>
        <span className={cx('TrackItem_icon')}></span>
      </div>
      <div className={cx('trackItem_list')}>
        {Array.isArray(updatedLectures) &&
          updatedLectures.map((lec, i) => (
            <Link
              to={`/lecture/${slug}/${lec._id}/edit`}
              key={lec._id}
              className={cx('StepItem_wrapper', 'learn-item-1', {
                active: activeIndex === i,
              })}
              onClick={() => {
                handleClick(i);
              }}
            >
              <div className={cx('StepItem_info')}>
                <h3 className={cx('StepItem_title')}>
                  {i + 1}. {lec.name}
                </h3>
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
