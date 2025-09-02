import { createContext, useContext, useState, useMemo, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { onLogin } from "./actions/onLogin";

type ContextType = {
    user: null | object,
    tokens: {
        access_token: null | string,
        refresh_token: null | string
    },
    loading: boolean,
    onLogin: any
}

const AuthContext = createContext({} as ContextType);
export const useAuth = () => useContext(AuthContext);

type State = {
    user: null | object,
    tokens: {
        access_token: null | string,
        refresh_token: null | string
    },
    loading: boolean
}
export default function AuthProvider({ children }: any) {
    const [state, setState] = useState<State>({
        user: null,
        tokens: {
            access_token: null,
            refresh_token: null
        },
        loading: true
    })

    useEffect(() => {
        const getUser = async () => {
            const authState = await SecureStore.getItemAsync("authState");
            
            if (authState) {
              setState({ user: JSON.parse(authState).user, tokens: JSON.parse(authState).tokens, loading: false });
            } else {
              setState({ user: null, tokens: { access_token: null, refresh_token: null }, loading: false });
            }
        };
        getUser();
    }, []);

    const value = useMemo(
      () => ({
        ...state,
        onLogin: (credentials: { credential: string; password: string }) =>
          onLogin({ credentials, setState }),
      }),
      [state]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}