import Main from '../components/Main';
import Home from '../components/Home';
import Detail from '../components/Detail';
import NotFound from '../components/NotFound';
import PageShell from '../components/PageShell';

const routes = [
  {
    component: Main,
    routes: [
      {
        path: '/',
        exact: true,
        component: PageShell(Home)
      },
      {
        path: '/post/:slug',
        component: PageShell(Detail)
      },
      {
        path: '*',
        component: PageShell(NotFound)
      }
    ]
  }
];

export default routes;
