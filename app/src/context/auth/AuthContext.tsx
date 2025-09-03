import { createContext, useContext, useState, useMemo, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { onLogin } from "./actions/onLogin";
import { onRegister } from "./actions/onRegister";

type nextStep = "LOGIN" | "VERIFY" | "HOME" | "DRIVER_ONBOARDING" | null;

type State = {
    is_verified: boolean | null;
    user: null | object;
    tokens: {
        access_token: null | string;
        refresh_token: null | string;
    };
    loading: boolean;
    nextStep: nextStep;
};

type ContextType = State & {
    onRegister: any;
    onLogin: any;
};

const AuthContext = createContext({} as ContextType);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
    const [state, setState] = useState<State>({
        user: null,
        tokens: {
            access_token: null,
            refresh_token: null,
        },
        is_verified: null,
        loading: true,
        nextStep: "LOGIN",
    });

    useEffect(() => {
        const getUser = async () => {
            const authState = await SecureStore.getItemAsync("authState");

            if (authState) {
                const parsed = JSON.parse(authState);
                setState({
                    user: parsed.user,
                    tokens: parsed.tokens,
                    is_verified: parsed.is_verified,
                    loading: false,
                    nextStep: parsed.nextStep || "LOGIN",
                });
            } else {
                setState({
                    user: null,
                    tokens: { access_token: null, refresh_token: null },
                    is_verified: false,
                    loading: false,
                    nextStep: "LOGIN",
                });
            }
        };
        getUser();
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            onLogin: (credentials: { credential: string; password: string }) =>
                onLogin({ credentials, setState }),
            onRegister: (credentials: {
                full_name: string;
                phone_number: string;
                email: string;
                password: string;
                role: string;
            }) => onRegister({ credentials, setState }),
        }),
        [state]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
