import React from 'react';
import CoreLayout from 'layouts/CoreLayout';
import Home from 'pages/Home/Home';
import Photos from '../pages/Photos/Photos';
import Share from '../pages/Share/Share';

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: '/photos',
      component: Photos,
    },
    {
      path: '/share',
      component: Share,
    },
  ],
};
