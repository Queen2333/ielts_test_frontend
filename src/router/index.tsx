import React, { ReactElement } from 'react';
import ReactLayout from '../pages/common/layout';
import { Navigate } from 'react-router-dom';

import Home from '../pages/home';
import CambridgeIelts from '../pages/cambridgeIelts';
import Examination from '../pages/examination';
import CustomizedTest from '../pages/customizedTest';
import TestStep1 from "../pages/testStep1";
import ListeningStep2 from "../pages/listeningModule/listeningStep2";
import ListeningStep3 from "../pages/listeningModule/listeningStep3";
import ListeningModule from "../pages/listeningModule/listeningTest";
import ReadingStep2 from "../pages/readingModule/readingStep2";
import ReadingModule from "../pages/readingModule/readingTest";

const routes: any[] = [
  {
    name: "IndexUrl",
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    name: "Layout",
    path: "/",
    element: <ReactLayout />,
    children: [
      {
        name: "Index",
        path: "index",
        element: <Home />,
      },
      {
        name: "CambridgeIelts",
        path: "cambridgeIelts",
        element: <CambridgeIelts />,
      },
      {
        name: "Examination",
        path: "examination",
        element: <Examination />,
      },
      {
        name: "CustomizedTest",
        path: "customizedTest",
        element: <CustomizedTest />,
      },
    ],
  },
  {
    name: "TestStep1",
    path: "testStep1",
    element: <TestStep1 />,
  },
  {
    name: "ListeningStep2",
    path: "listeningStep2",
    element: <ListeningStep2 />,
  },
  {
    name: "ListeningStep3",
    path: "listeningStep3",
    element: <ListeningStep3 />,
  },
  {
    name: "ListeningModule",
    path: "listeningModule",
    element: <ListeningModule />,
  },
  {
    name: "ReadingStep2",
    path: "readingStep2",
    element: <ReadingStep2 />,
  },
  {
    name: "ReadingModule",
    path: "readingModule",
    element: <ReadingModule />,
  },
  {
    name: "root",
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
export default routes;