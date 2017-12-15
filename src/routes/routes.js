import Main from '../components/Main';
import Home from '../components/Home';
import Detail from '../components/Detail';
import NotFound from '../components/NotFound';

const routes = [
  {
    component: Main,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/post/:slug',
        component: Detail,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
