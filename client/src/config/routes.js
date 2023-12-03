const routers = {
  home: '/',
  createCourse: '/courses/store',
  editCourse: '/courses/:id',
  storedCourse: '/courses/stored',
  trashCourse: '/courses/trash/:id',

  lecture: '/lecture',
  profile: '/:nickname',
  search: '/search',
  upload: '/upload',
};

export default routers;
