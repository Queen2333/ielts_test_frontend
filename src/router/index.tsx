import React, { ReactElement } from 'react';
import ReactLayout from '../pages/common/layout';
import Home from '../pages/home';
import { Navigate, RouteObject } from 'react-router-dom';

const routes: any[] = [
  {
    name: 'IndexUrl',
    path:'/',
    element: <Navigate to='/index' />,
  },
  {
    name: 'Layout',
    path: '/',
    element: <ReactLayout />,
    children: [
      {
        name: 'Index',
        path:'index',
        element: <Home />,
      },
    ],
  },
  {
    name: 'root',
    path: '*',
    element: <Navigate to='/' replace />
  }
];
export default routes;