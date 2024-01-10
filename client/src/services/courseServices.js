import request from '~/utils/axios';

const courseService = {
  //hien thi
  courseSlug(slug) {
    return request
      .get(`/courses/${slug}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data courses:', error);
        throw error;
      });
  },
  //them
  createCourse(newCourse) {
    return request
      .post('/courses/store', newCourse)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error create courses:', error);
        throw error;
      });
  },

  storedIns() {
    return request
      .get('/courses/store')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error('Error create instructors:', error);
        throw error; // bạn có thể xử lý lỗi hoặc chuyển tiếp nó
      });
  },

  //sua
  editCourse(courseID) {
    return request
      .get(`/courses/${courseID}/edit`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error edit courses:', error.response.data);
        throw error;
      });
  },

  updateCourse(courseID, newCourse) {
    return request.put(`/courses/${courseID}`, newCourse);
  },

  //restore
  restoreCourse(courseID) {
    return request.patch(`/courses/${courseID}/restore`);
  },

  //xoa mềm
  deleteCourse(courseID) {
    return request.delete(`/courses/${courseID}`);
  },

  //xóa thật
  trueDelete(courseID) {
    return request.delete(`/courses/${courseID}/delete`);
  },

  storedCourse() {
    return request
      .get('courses/stored')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error fetching stored courses:', error);
        throw error;
      });
  },
  trashCourse() {
    return request
      .get('courses/trash')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error fetching trash courses:', error);
        throw error;
      });
  },
};

export default courseService;
