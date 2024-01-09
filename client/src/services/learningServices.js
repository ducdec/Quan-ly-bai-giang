import request from '~/utils/axios';

const learningService = {
  courseInfo(slug, idLecture) {
    return request
      .get(`/learning/${slug}?id=${idLecture}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios lecture 10:', err);
        throw err;
      });
  },
};

export default learningService;
