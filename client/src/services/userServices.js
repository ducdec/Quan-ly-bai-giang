import request from '~/utils/axios';

const userService = {
  //signup
  signup(newUser) {
    return request
      .post('/login/signup', newUser)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error create user:', error);
        throw error;
      });
  },

  //signin
  signin(User) {
    return request
      .post('/login/signin', User)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error axios signin:', error);
        throw error;
      });
  },

  datauUser() {
    return request
      .get('/login/signin')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data user:', error);
        throw error;
      });
  },
};

export default userService;
