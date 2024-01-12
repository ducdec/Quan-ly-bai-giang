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

  //forgot password
  forgotPassToken(email) {
    return request
      .post('/login/password', email)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error axios password:', error);
        throw error;
      });
  },
  forgotPassNew(token, password) {
    return request
      .post(`/login/password/${token}`, password)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error axios passwordToken:', error);
        throw error;
      });
  },
};

export default userService;
