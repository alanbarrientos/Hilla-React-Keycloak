import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {AuthProvider} from "Frontend/auth";
import {UserInfoService} from "Frontend/generated/endpoints";
import UserInfo from 'Frontend/generated/com/example/application/services/UserInfo';

export default function App() {
    // const userInfo = UserInfoService.getUserInfo();
    return(
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
