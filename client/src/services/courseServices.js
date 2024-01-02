import request from '~/utils/axios';

const courseService = {
  //them
  createCourse(newCourse) {
    return request
      .post('/courses/store', newCourse)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error create courses:', error);
        throw error; // bạn có thể xử lý lỗi hoặc chuyển tiếp nó
      });
  },

  storedIns() {
    return request
      .get('/courses/store')
      .then((res) => {
        console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về từ API
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
