import React, { ReactElement } from 'react';
import ReactLayout from '../pages/common/layout';
import { Navigate } from 'react-router-dom';
import {
  DesktopOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import Home from "../pages/home";
import CambridgeIelts from "../pages/cambridgeIelts";
import Examination from "../pages/examination";
import CustomizedTest from "../pages/customizedTest";
import TestStep1 from "../pages/testStep1";
import ListeningStep2 from "../pages/listeningModule/listeningStep2";
import ListeningStep3 from "../pages/listeningModule/listeningStep3";
import ListeningModule from "../pages/listeningModule/listeningTest";
import ReadingStep2 from "../pages/readingModule/readingStep2";
import ReadingModule from "../pages/readingModule/readingTest";
import WritingStep2 from "../pages/writingModule/writingStep2";
import WritingModule from "../pages/writingModule/writingTest";
import ListenlingConfigList from "../pages/config/listening/list";
import ListenlingConfigDetail from "../pages/config/listening/detail";
import ReadingConfigList from "../pages/config/reading/list";
import ReadingConfigDetail from "../pages/config/reading/detail";
import WritingConfigList from "../pages/config/writing/list";
import WritingConfigDetail from "../pages/config/writing/detail";
import TestConfigList from "../pages/config/test/list";
import TestConfigDetail from "../pages/config/test/detail";

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
        label: "首页",
        path: "index",
        element: <Home />,
        icon: <HomeOutlined />,
        showLink: true,
      },
      {
        name: "Test",
        label: "雅思机考",
        path: "test",
        icon: <DesktopOutlined />,
        children: [
          {
            name: "CambridgeIelts",
            label: "剑桥雅思",
            path: "cambridgeIelts",
            element: <CambridgeIelts />,
            showLink: true,
          },
          {
            name: "Examination",
            label: "考场真题",
            path: "examination",
            element: <Examination />,
            showLink: true,
          },
          {
            name: "CustomizedTest",
            label: "自定义题库",
            path: "customizedTest",
            element: <CustomizedTest />,
            showLink: true,
          },
        ],
      },
      {
        name: "Config",
        label: "配置题库",
        path: "config",
        redirect: "/config/listenlingConfigList",
        icon: <SettingOutlined />,
        children: [
          {
            name: "ListenlingConfigList",
            label: "听力",
            path: "listenlingConfigList",
            element: <ListenlingConfigList />,
            showLink: true,
          },
          {
            name: "ListenlingConfigDetail",
            label: "听力配置",
            path: "listenlingConfigDetail",
            element: <ListenlingConfigDetail />,
          },
          {
            name: "ReadingConfigList",
            label: "阅读",
            path: "readingConfigList",
            element: <ReadingConfigList />,
            showLink: true,
          },
          {
            name: "ReadingConfigDetail",
            label: "阅读配置",
            path: "readingConfigDetail",
            element: <ReadingConfigDetail />,
          },
          {
            name: "WritingConfigList",
            label: "写作",
            path: "writingConfigList",
            element: <WritingConfigList />,
            showLink: true,
          },
          {
            name: "WritingConfigDetail",
            label: "写作配置",
            path: "writingConfigDetail",
            element: <WritingConfigDetail />,
          },
          {
            name: "TestConfigList",
            label: "套题",
            path: "testConfigList",
            element: <TestConfigList />,
            showLink: true,
          },
          {
            name: "TestConfigDetail",
            label: "套题配置",
            path: "testConfigDetail",
            element: <TestConfigDetail />,
          },
        ],
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
    name: "WritingStep2",
    path: "writingStep2",
    element: <WritingStep2 />,
  },
  {
    name: "WritingModule",
    path: "writingModule",
    element: <WritingModule />,
  },
  {
    name: "root",
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
export default routes;