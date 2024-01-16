import request from '~/utils/axios';

const userService = {
  //storeUser
  storedUser() {
    return request
      .get('/users/stored')
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data user:', error);
        throw error;
      });
  },
  //:id
  userId(id) {
    return request
      .get(`/users/${id}/edit`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data user ID:', error);
        throw error;
      });
  },

  userUphate(id, newUser) {
    return request.put(`/users/${id}`, newUser);
  },
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
