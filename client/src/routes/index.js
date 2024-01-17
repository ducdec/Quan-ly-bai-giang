import config from '~/config';

//layouts
import { HeaderOnly, UserLayout, PublicLayout } from '~/layouts';

import Home from '~/pages/Home';
//Login
import SignIn from '~/pages/Login/Account/SignIn';
import SignUp from '~/pages/Login/Account/signUp';
import ForgotPass from '~/pages/Login/PassWord/Password';
import ForgotPassToken from '~/pages/Login/PassWord/PasswordNew';
//Courses
import CreateCourse from '~/pages/Course/component/create';
import UpdateCourse from '~/pages/Course/component/edit';
import StoredCourse from '~/pages/Course/MyCourses/storedCourses';
import TrashCourse from '~/pages/Course/MyCourses/trashCourses';
import Course from '~/pages/Course/course';
//Profile
import Profile from '~/pages/Profile/Profile';
//Lecture
import CreateLecture from '~/pages/Lecture/components/create';
import UpdateLecture from '~/pages/Lecture/components/edit';
//
import learning from '~/pages/Lecture/learning';
//instructor
import CreateInstructor from '~/pages/Instructor/component/create';
import UpdateInstructor from '~/pages/Instructor/component/edit';
import StoredInstructor from '~/pages/Instructor/MyInstructor/storedInstructors';
//user
import StoredUsers from '~/pages/User/storedUser';
import UpdateUsers from '~/pages/User/components/edit';
//
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
  {
    path: config.routes.passWord,
    component: ForgotPass,
    layout: null,
  },
  {
    path: config.routes.passWordToken,
    component: ForgotPassToken,
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
  { path: config.routes.lecture, component: Course, layout: HeaderOnly },

  //Lectures
  {
    path: config.routes.createLec,
    component: CreateLecture,
    layout: HeaderOnly,
  },
  {
    path: config.routes.editLec,
    component: UpdateLecture,
    layout: HeaderOnly,
  },
  //learning
  { path: config.routes.learning, component: learning, layout: HeaderOnly },

  //instructors
  {
    path: config.routes.CreateIns,
    component: CreateInstructor,
    layout: HeaderOnly,
  },
  {
    path: config.routes.editIns,
    component: UpdateInstructor,
    layout: HeaderOnly,
  },
  {
    path: config.routes.storedIns,
    component: StoredInstructor,
    layout: HeaderOnly,
  },

  //Profiles
  { path: config.routes.profile, component: Profile, layout: HeaderProfile },

  //Users
  {
    path: config.routes.storeUsers,
    component: StoredUsers,
    layout: HeaderOnly,
  },
  {
    path: config.routes.editUser,
    component: UpdateUsers,
    layout: HeaderOnly,
  },
];

//user routes

const userRoutes = [
  //home
  { path: config.routes.home, component: Home, layout: UserLayout },

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
  {
    path: config.routes.passWord,
    component: ForgotPass,
    layout: null,
  },
  {
    path: config.routes.passWordToken,
    component: ForgotPassToken,
    layout: null,
  },

  //courses
  { path: config.routes.lecture, component: Course, layout: HeaderOnly },

  //learning
  { path: config.routes.learning, component: learning, layout: HeaderOnly },

  //Profiles
  { path: config.routes.profile, component: Profile, layout: HeaderProfile },
];
const adminRoutes = [
  //home
  { path: config.routes.home, component: Home, layout: PublicLayout },
];

export { publicRoutes, userRoutes, adminRoutes };
