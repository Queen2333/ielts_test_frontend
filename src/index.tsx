import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import * as dayjs from "dayjs";
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(<App/>)