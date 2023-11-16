import React, { ReactElement } from 'react';
import ReactLayout from '../pages/common/layout';
import { Navigate } from 'react-router-dom';

import Home from '../pages/home';
import CambridgeIelts from '../pages/cambridgeIelts';
import Examination from '../pages/examination';
import CustomizedTest from '../pages/customizedTest';


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
      {
        name: 'CambridgeIelts',
        path:'cambridgeIelts',
        element: <CambridgeIelts />,
      },
      {
        name: 'Examination',
        path:'examination',
        element: <Examination />,
      },
      {
        name: 'CustomizedTest',
        path:'customizedTest',
        element: <CustomizedTest />,
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