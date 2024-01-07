import request from '~/utils/axios';

const insCourseService = {
  //them
  createInsCourse(newIns) {
    return request
      .post('/inscourse/store', newIns)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error create courses:', error);
        throw error; // bạn có thể xử lý lỗi hoặc chuyển tiếp nó
      });
  },
};

export default insCourseService;
