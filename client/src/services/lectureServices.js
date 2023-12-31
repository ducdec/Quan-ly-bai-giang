import request from '~/utils/axios';

const lectureService = {
  //creare
  create(newLecture) {
    return request
      .post('/lecture/create', newLecture)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios lecture:', err);
        throw err;
      });
  },
};
export default lectureService;
