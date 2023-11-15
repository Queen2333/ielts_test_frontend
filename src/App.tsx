import './App.less';
import React from "react";
import routes from './router/index';
import chilidrenRoute from './router/routeWithSubRoutes';
import { Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
      <div className="App">
        <Routes>
          {routes.map((item: any) => {
            return (
              <Route path={item.path} key={item.name} element={item.element}>
                {chilidrenRoute(item)}
              </Route>
            )
          })}
        </Routes>
      </div>
  );
};

export default App;