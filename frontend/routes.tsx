import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import AdminView from "Frontend/views/admin/AdminView";
import UserView from "Frontend/views/user/UserView";
import {protectRoutes} from "@hilla/react-auth";
import LoginView from "Frontend/views/login/LoginView";

const AboutView = lazy(async () => import('Frontend/views/admin/AdminView'));

export const routes =
    protectRoutes(
    [
  {
    path: '/client',
    element: <MainLayout />,
    handle: { title: 'Main', requiresLogin: true},
    children: [
      { path: '/client/helloWorld', element: <HelloWorldView />, handle: { title: 'Hello World', requiresLogin: true}},
      { path: '/client/user', element: <UserView/>, handle: {title:'User', requiresLogin: true}},
      { path: '/client/admin', element: <AdminView />, handle: { title: 'Admin', requiresLogin: true
          , rolesAllowed: ['ROLE_admin']
      } },
    ],
  },
  {path: 'login', element:<LoginView/>}
]) as RouteObject[];

export default createBrowserRouter(routes);
