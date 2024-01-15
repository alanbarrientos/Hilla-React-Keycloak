import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import {Suspense, useEffect, useState} from 'react';
import {NavLink, Outlet, useBeforeUnload} from 'react-router-dom';
import {UserInfoService} from "Frontend/generated/endpoints";
import UserInfo from "Frontend/generated/com/example/application/services/UserInfo";
import {useAuth} from "Frontend/auth";
import {Button} from "@hilla/react-components/Button.js";
import axios from 'axios';


const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  const [roles, setRoles] = useState(new Array<String>());
  const { state } = useAuth();

    useEffect(() => {
        document.title = currentTitle;
        // UserInfoService.getUserInfo().then(userInfo => { setRoles(userInfo.authorities)
        // console.log(userInfo.authorities)});
  }, [currentTitle]);
    const logout = async () => {
        // @ts-ignore
        const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
        const formData = new FormData();
        // @ts-ignore
        formData.append('_csrf', csrfToken);
        await axios.post('/logout', formData); // Send POST request with credentials
        console.log('Logout successful!');
        // Redirect to login page or perform other actions
        window.location.href = '/';
    }

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">My App</h1>
          <nav>
              <NavLink className={navLinkClasses} to="/client/helloWorld">
                  Hello World
              </NavLink>
              <NavLink className={navLinkClasses} to="/client/user">
                  UserView
              </NavLink>
              {state.user?.authorities.includes('ROLE_admin') &&
                  <NavLink className={navLinkClasses} to="/client/admin">
                  AdminView
              </NavLink>
              }
              <Button onClick={() => logout()} className={'primary'}>
                    Logout
              </Button>
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
