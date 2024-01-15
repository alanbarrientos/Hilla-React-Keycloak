import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "Frontend/auth";
import {LoginOverlay} from "@hilla/react-components/LoginOverlay";

export default function LoginView() {
    const { state, login } = useAuth();
    const [hasError, setError] = useState<boolean>();
    const [url, setUrl] = useState<string>();
    useEffect(() => {
        // @ts-ignore
        window.location = "http://localhost:8081/login"

    }, []);

    if (state.user && url) {
        const path = new URL(url, document.baseURI).pathname;
        return <Navigate to={path}/>;
    }

        return (
            <LoginOverlay
                opened
                error={hasError}
                noForgotPassword
                onLogin={async ({ detail: { username, password } }) => {
                    const { defaultUrl, error, redirectUrl } = await login(username, password);

                    if (error) {
                        setError(true);
                    } else {
                        setUrl(redirectUrl ?? defaultUrl ?? '/');
                    }
                }}
            />
        );
    // return <Navigate to={'/client/user'}/>;
}