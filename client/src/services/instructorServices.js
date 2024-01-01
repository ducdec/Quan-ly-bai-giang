import request from '~/utils/axios';

const InstructorService = {
  //creare
  create(newInstructor) {
    return request
      .post('/instructor/create', newInstructor)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Axios Instructor:', err);
        throw err;
      });
  },
};
export default InstructorService;
