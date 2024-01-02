import request from '~/utils/axios';

const InstructorService = {
  //creare
  create(newIns) {
    return request
      .post('/instructor/create', newIns)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios Instructor:', err);
        throw err;
      });
  },

  //sua
  editInstructor(insID) {
    return request
      .get(`/instructor/${insID}/edit`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error edit instructor:', error.response.data);
        throw error;
      });
  },

  updateInstructor(insID, newIns) {
    return request.put(`/instructor/${insID}`, newIns);
  },

  //xóa thật
  trueDelete(insID) {
    return request.delete(`/instructor/${insID}/delete`);
  },

  storedInstructor() {
    return request
      .get('instructor/stored')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error fetching stored instructor:', error);
        throw error;
      });
  },
};

export default InstructorService;
