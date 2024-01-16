const routers = {
  home: '/',
  //Login
  signIn: '/login/signin',
  signUp: '/login/signup',
  passWord: '/login/password',
  passWordToken: '/login/password/:token',
  //Course
  createCourse: '/courses/store',
  editCourse: '/courses/:id/edit',
  storedCourse: '/courses/stored',
  trashCourse: '/courses/trash',
  lecture: '/courses/:slug',
  //Lecture
  createLec: '/lecture/:id/create',
  editLec: '/lecture/:slug/:id/edit',
  //
  learning: '/learning/:slug',
  //instructor
  CreateIns: '/instructor/create',
  editIns: '/instructor/:id/edit',
  storedIns: '/instructor/stored',

  //profile
  profile: '/:nickname',

  //users
  storeUsers: '/users/stored',
  editUser: '/users/:id/edit',
};

export default routers;
