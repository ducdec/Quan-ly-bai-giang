import request from '~/utils/axios';

const lectureService = {
  //creare
  create(newLecture, slug) {
    return request
      .post(`/lecture/${slug}/create`, newLecture)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios lecture:', err);
        throw err;
      });
  },

  courseSlug(slug) {
    return request
      .get(`/lecture/${slug}/create`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios lecture:', err);
        throw err;
      });
  },
};
export default lectureService;
