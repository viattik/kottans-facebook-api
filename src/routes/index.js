import React from 'react';
import CoreLayout from 'layouts/CoreLayout';
import Home from 'pages/Home/Home';
import Photos from '../pages/Photos/Photos';

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: '/photos',
      component: Photos,
    },
  ],
};
