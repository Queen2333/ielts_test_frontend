import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.less";
import App from './App'
import * as dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </HashRouter>
  </React.StrictMode>
);