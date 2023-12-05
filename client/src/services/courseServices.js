import request from '~/utils/axios';

request.post('/courses/store').then((res) => {
  return res.data;
});
