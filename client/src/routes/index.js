import config from '~/config';

//layouts
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
//Login
import SignIn from '~/pages/Login/SignIn';
import SignUp from '~/pages/Login/signUp';
//Courses
import CreateCourse from '~/pages/Course/component/create';
import UpdateCourse from '~/pages/Course/component/edit';
import StoredCourse from '~/pages/Course/MyCourses/storedCourses';
import TrashCourse from '~/pages/Course/MyCourses/trashCourses';
//Profile
import Profile from '~/pages/Profile/Profile';
import Lecture from '~/pages/Lecture';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';
import HeaderProfile from '~/layouts/HeaderProfile';

//Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },

  //Login routes
  {
    path: config.routes.signIn,
    component: SignIn,
    layout: null,
  },
  {
    path: config.routes.signUp,
    component: SignUp,
    layout: null,
  },
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

  //Profiles
  { path: config.routes.profile, component: Profile, layout: HeaderProfile },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
