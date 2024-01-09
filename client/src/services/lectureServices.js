import request from '~/utils/axios';

const lectureService = {
  //creare
  create(slug, newLecture) {
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

  //sua
  editLec(slug, lecID) {
    return request
      .get(`/lecture/${slug}/${lecID}/edit`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error edit lecture:', error.response.data);
        throw error;
      });
  },

  updateLec(slug, LecID, newLec) {
    return request.put(`/lecture/${slug}/${LecID}`, newLec);
  },

  //xóa thật
  DeleteLec(slug, lecID) {
    return request.delete(`/lecture/${slug}/${lecID}/delete`);
  },
};
export default lectureService;
