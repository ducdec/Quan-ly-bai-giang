import request from '~/utils/axios';

const learningService = {
  courseInfo(slug) {
    return request
      .get(`/learning/${slug}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios lecture 10:', err);
        throw err;
      });
  },
};

export default learningService;
