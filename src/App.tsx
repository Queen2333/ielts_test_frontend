import React from 'react';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import Home from './pages/home';

const App = () => {


  return <>
    <ConfigProvider locale={zhCN}>
      <Home/>
    </ConfigProvider>
  </>
}


export default App