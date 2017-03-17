import CoreLayout from '../layouts/CoreLayout'
import Home from '../pages/Home/Home';

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: { component: Home },
  childRoutes: []
};
