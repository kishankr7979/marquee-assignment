import { useRoutes, useNavigate } from 'react-router-dom';
import routerPaths from '.';
import { Dashboard, LoginPage } from '../pages';
import { protectedRoutes } from '../utils';
import { useEffect } from 'react';

const RouterConfig = () => {
    const navigate = useNavigate();
    const routeProtection = () => {
        const pathname = window.location.pathname;
      const token = localStorage.getItem('todo-app-auth');
      if(token){
        if(protectedRoutes.includes(pathname)) return;
  
        else navigate(routerPaths.Dashboard)
      }
      else navigate(routerPaths.Login);
    }
  
    useEffect(() => {
      routeProtection();
    }, [])
    const routes = useRoutes([
        {
            path: routerPaths.Dashboard,
            element: <Dashboard />
        },
        {
            path: routerPaths.Login,
            element: <LoginPage />
        }
    ])

    return routes;
}

export default RouterConfig;