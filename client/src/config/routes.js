const routers = {
  home: '/',
  //Login
  signIn: 'login/signin',
  signUp: 'login/signup',
  //Course
  createCourse: '/courses/store',
  editCourse: '/courses/:id/edit',
  storedCourse: '/courses/stored',
  trashCourse: '/courses/trash',
  //Lecture
  lecture: '/lecture',
  learning: '/learning/:course',
  //instructor

  //profile
  profile: '/:nickname',
  search: '/search',
  upload: '/upload',
};

export default routers;
