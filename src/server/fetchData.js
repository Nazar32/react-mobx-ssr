// thanks https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
import { matchRoutes } from 'react-router-config';
// routes
import routes from '../routes/routes';

export default (req, store) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route, match }) => {
    const fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store, match.params) : Promise.resolve(null);
  });
  return Promise.all(promises);
};
