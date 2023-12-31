import request from '~/utils/axios';

const siteService = {
  //signup
  home() {
    return request
      .get('/')
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error Home:', err);
        throw err;
      });
  },
};
export default siteService;
