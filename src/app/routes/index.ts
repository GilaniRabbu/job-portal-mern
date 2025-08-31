import express from 'express';
import { AuthRoute } from '../modules/Auth/auth.route';
import { UserRoute } from '../modules/User/user.route';
import { JobsRoute } from '../modules/Jobs/jobs.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/jobs',
    route: JobsRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
