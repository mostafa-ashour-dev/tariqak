import { createContext, useContext, useState, useMemo, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { onLogin } from "./actions/onLogin";
import { onRegister } from "./actions/onRegister";
type State = {
    is_verified: boolean | null;
    user: null | object;
    tokens: {
        access_token: null | string;
        refresh_token: null | string;
    };
    loading: boolean;
    nextStep: string;
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
        nextStep: "login",
    });

    useEffect(() => {
        const getUser = async () => {
            const authState = await SecureStore.getItemAsync("authState");

            if (authState) {
                setState({
                    user: JSON.parse(authState).user,
                    tokens: JSON.parse(authState).tokens,
                    is_verified: JSON.parse(authState).is_verified,
                    loading: false,
                    nextStep: "login",
                });
            } else {
                setState({
                    user: null,
                    tokens: { access_token: null, refresh_token: null },
                    is_verified: false,
                    loading: false,
                    nextStep: "login",
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
