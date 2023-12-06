import request from '~/utils/axios';

// export const storedCourse = async () => {
//   try {
//     const res = await request.get('courses/stored');
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching stored courses:', error);
//     throw error;
//   }
// };

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

  //xoa
  trueDelete(courseID, course) {
    return request.delete(`/courses/${courseID}/delete`, { course });
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
};

export default courseService;
