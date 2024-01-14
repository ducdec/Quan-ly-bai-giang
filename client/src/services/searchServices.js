//import * as httpRequest from '~/utils/httpRequest';
import request from '~/utils/axios';

export const searchService = {
  //hien thi
  courseSearch(Query) {
    return request
      .get(`/courses?name=${Query}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data courses:', error);
        throw error;
      });
  },
};
