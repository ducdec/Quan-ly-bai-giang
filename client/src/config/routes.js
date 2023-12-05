const routers = {
  home: '/',
  createCourse: '/courses/store',
  editCourse: '/courses/:id/edit',
  storedCourse: '/stored/courses',
  trashCourse: '/trash/courses',

  lecture: '/lecture',
  profile: '/:nickname',
  search: '/search',
  upload: '/upload',
};

export default routers;
