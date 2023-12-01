import config from '~/config';

//layouts
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Lecture from '~/pages/Lecture';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';

//Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.lecture, component: Lecture, layout: HeaderOnly },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
