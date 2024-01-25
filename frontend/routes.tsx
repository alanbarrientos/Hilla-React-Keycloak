import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import React, { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import UserView from "Frontend/views/user/UserView";
import {protectRoutes} from "@hilla/react-auth";
import LoginView from "Frontend/views/login/LoginView";
import GridColumnFilterView from "Frontend/views/grid/GridColumnFilterView";
import ErrorView from "Frontend/views/error/ErrorView";
import AutoGridView from "Frontend/views/grid/AutoGridView";
import FormView from "Frontend/views/form/FormView";
import AutoFormView from "Frontend/views/form/AutoFormView";
import AutoCrudView from "Frontend/views/autocrud/AutoCrudView";
import GridExternalFilterView from "Frontend/views/grid/GridExternalFilterView";
import ProveedoresView from "Frontend/views/proveedores/ProveedoresView";

const AdminView = lazy(async () => import('Frontend/views/admin/AdminView'));

export const routes = protectRoutes(
    [
        {
            path: '/client',
            element: <MainLayout />,
            handle: { title: 'Main', requiresLogin: true},
            children: [
                { path: '/client/helloWorld', element: <HelloWorldView/>, handle: { title: 'Hello World'}},
                { path: '/client/user', element: <UserView/>, handle: {title:'User', requiresLogin: true}},
                { path: '/client/admin', element: <AdminView/>, handle: { title: 'Admin', requiresLogin: true, rolesAllowed: ['ROLE_admin']}},
                { path: '/client/grid-column-filter', element: <GridColumnFilterView/>, handle: {title: 'Grid-Column-Filter', requiresLogin: true}},
                { path: '/client/grid-external-filter', element: <GridExternalFilterView/>, handle: {title: 'Grid-External-Filter', requiresLogin: true}},
                { path: '/client/autogrid', element: <AutoGridView/>, handle: {title: 'AutoGrid', requiresLogin: true}},
                { path: '/client/form', element: <FormView/>, handle: {title: 'Form', requiresLogin: true}},
                { path: '/client/autoform', element: <AutoFormView/>, handle: {title: 'AutoForm', requiresLogin: true}},
                { path: '/client/autocrud', element: <AutoCrudView/>, handle: {title: 'AutoCrud', requiresLogin: true}},
                { path: '/client/proveedores', element: <ProveedoresView/>, handle: {title: 'Proveedores', requiresLogin: true}},
            ],
        },
        {path: 'login', element:<LoginView/>},
        {path: '*' , element:<ErrorView/>},
    ]
) as RouteObject[];

export default createBrowserRouter(routes);
