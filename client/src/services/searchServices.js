//import * as httpRequest from '~/utils/httpRequest';
import request from '~/utils/axios';

//API
// export const search = async (q, type = 'less') => {
//   try {
//     const res = await httpRequest.get(`users/search`, {
//       params: {
//         q,
//         type,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

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
