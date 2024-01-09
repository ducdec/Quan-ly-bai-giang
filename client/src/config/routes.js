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
  search: '/search',
  upload: '/upload',
};

export default routers;
