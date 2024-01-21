import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {AuthProvider} from "Frontend/auth";
import {UserInfoService} from "Frontend/generated/endpoints";
import UserInfo from 'Frontend/generated/com/example/application/services/UserInfo';
import {useEffect} from "react";

export default function App() {
    useEffect(() => {
        const htmlElement= document.getElementsByTagName("html")[0];
        htmlElement.setAttribute("theme", "dark");
    }, []);
    // const userInfo = UserInfoService.getUserInfo();
    return(
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
