import React from 'react';
import { Route } from 'react-router-dom';

const chilidrenRoute: React.FC = ({ children }: any) => {
  if (!children) {
    return null
  }
  return children.map((value: any) => {
    return (
      <Route path={value.path} element={value.element} key={value.name}>
        {chilidrenRoute(value)}
      </Route>
    )
  })
}
export default chilidrenRoute;