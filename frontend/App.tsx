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
       //  htmlElement.children[0].innerHTML += "<link rel=\"import\" href=\"bower_components/vaadin-material-theme/color.html\"><custom-style>"+
       //      "<style include='material-light-color'>.primary {\n" +
       //      "      background-color: rebeccapurple;\n" +
       //      "      color: lightpink;\n" +
       //      "    }</style>"+
       // " </custom-style>"
    }, []);
    // const userInfo = UserInfoService.getUserInfo();
    return(
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
