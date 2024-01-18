import request from '~/utils/axios';

const userService = {
  //getToken
  getUserFromToken() {
    return request
      .get(`/users/getToken`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data userToken:', error);
        throw error;
      });
  },
  //setting
  setting(updateData, id) {
    return request
      .put(`/users/setting/${id}`, updateData)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data setting:', error);
        throw error;
      });
  },
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
  //:id sua
  userId(id) {
    return request
      .get(`/users/${id}/edit`)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error data user ID:', error);
        throw error;
      });
  },

  userUpdate(id, newUser) {
    return request.put(`/users/${id}`, newUser);
  },
  //xoa
  deleteUser(id) {
    return request.delete(`/users/${id}/delete`).catch((error) => {
      console.error('Error delete user:', error);
      throw error;
    });
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
