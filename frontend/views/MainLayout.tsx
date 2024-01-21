import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import React, {Suspense, useEffect, useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {useAuth} from "Frontend/auth";
import {Button} from "@hilla/react-components/Button.js";
import axios from 'axios';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';


const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  const [roles, setRoles] = useState(new Array<String>());
  const { state } = useAuth();
    const [isthemeNight, setThemeNight] = useState(false)

    const iconStyleNormal: React.CSSProperties = {
        boxSizing: 'border-box',
        marginInlineEnd: 'var(--lumo-space-m)',
        marginInlineStart: 'var(--lumo-space-xs)',
        padding: 'var(--lumo-space-xs)',
        paddingTop: '0px',
    };
    const iconStyleBlack: React.CSSProperties = {
        boxSizing: 'border-box',
        marginInlineEnd: 'var(--lumo-space-m)',
        marginInlineStart: 'var(--lumo-space-xs)',
        padding: 'var(--lumo-space-xs)',
        paddingTop: '0px',
        color: 'darkolivegreen',
    };

    function changeTheme() {
        const htmlElement= document.getElementsByTagName("html")[0];
        if(isthemeNight){
            htmlElement.setAttribute("theme", "light")
        }else{
            htmlElement.setAttribute("theme", "dark");
        }
        setThemeNight(!isthemeNight);
    }

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
              <h1 className="text-l m-0">Demo App</h1>
              <nav>
                  <NavLink className={navLinkClasses} to="/client/helloWorld">
                      <Icon icon="vaadin:smiley-o" style={iconStyleNormal} />Hello World
                  </NavLink>
                  <NavLink className={navLinkClasses} to="/client/user">
                      <Icon icon="vaadin:user" style={iconStyleNormal} />User
                  </NavLink>
                  {state.user?.authorities.includes('ROLE_admin') &&
                      <NavLink className={navLinkClasses} to="/client/admin">

                          <Icon icon="vaadin:lock" style={iconStyleNormal} />Admin

                      </NavLink>
                  }
                  <hr/>
                  <NavLink className={navLinkClasses} to="/client/grid-column-filter">
                      <Icon icon="vaadin:grid-v" style={iconStyleNormal} /> Grid Column Filter
                  </NavLink>
                  <NavLink className={navLinkClasses} to="/client/grid-external-filter">
                      <Icon icon="vaadin:grid-v" style={iconStyleNormal} /> Grid External Filter
                  </NavLink>
                  <NavLink className={navLinkClasses} to="/client/form">
                      <Icon icon="vaadin:clipboard-text" style={iconStyleNormal} />Form
                  </NavLink>
                  <NavLink className={navLinkClasses} to="/client/autogrid">
                      <Icon icon="vaadin:grid-v" style={iconStyleBlack} />AutoGrid
                  </NavLink>
                  <NavLink className={navLinkClasses} to="/client/autoform">
                      <Icon icon="vaadin:clipboard-text" style={iconStyleBlack} />AutoForm
                  </NavLink>
                  <NavLink className={navLinkClasses} to="/client/autocrud">
                      <Icon icon="vaadin:modal-list" style={iconStyleBlack} />AutoCrud
                  </NavLink>
                  <br/>
                  <Button onClick={() => logout()} className={'primary'}>
                      Logout
                  </Button>
              </nav>
          </header>
          <footer>
              <Button onClick={() => changeTheme()}>
                  <Icon icon="vaadin:adjust" style={{padding: '0rem'}}/>
              </Button>
          </footer>
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
