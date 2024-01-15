import { configureAuth } from '@hilla/react-auth';
import { UserInfoService } from 'Frontend/generated/endpoints';
import UserInfo from "Frontend/generated/com/example/application/services/UserInfo";
import userInfo from "Frontend/generated/com/example/application/services/UserInfo";

// Configure auth to use `UserInfoService.getUserInfo`
const auth = configureAuth(UserInfoService.getUserInfo, {
    getRoles:(user: UserInfo) => user.authorities,
});

// Export auth provider and useAuth hook, which are automatically
// typed to the result of `UserInfoService.getUserInfo`
export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;