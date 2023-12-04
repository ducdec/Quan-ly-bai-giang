import config from '~/config';

//layouts
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import CreateCourse from '~/pages/Course/component/create';
import UpdateCourse from '~/pages/Course/component/edit';
import StoredCourse from '~/pages/Course/MyCourses/storedCourses';
import TrashCourse from '~/pages/Course/MyCourses/trashCourses';

import Lecture from '~/pages/Lecture';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';

//Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },

  //Courses
  {
    path: config.routes.createCourse,
    component: CreateCourse,
    layout: HeaderOnly,
  },
  {
    path: config.routes.editCourse,
    component: UpdateCourse,
    layout: HeaderOnly,
  },
  {
    path: config.routes.storedCourse,
    component: StoredCourse,
    layout: HeaderOnly,
  },
  {
    path: config.routes.trashCourse,
    component: TrashCourse,
    layout: HeaderOnly,
  },

  //Lectures
  { path: config.routes.lecture, component: Lecture, layout: HeaderOnly },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
