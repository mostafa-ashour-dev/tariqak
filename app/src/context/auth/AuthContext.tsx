import { createContext, useContext, useState, useMemo, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { onLogin } from "./actions/onLogin";
import { onRegister } from "./actions/onRegister";
import { onVerifyCode } from "./actions/onVerifyCode";
import { onRequestVerificationCode } from "./actions/onRequestVerificationCode";
import { onLogout } from "./actions/onLogout";
import { onResetPassword } from "./actions/onResetPassword";
import { onVerifyResetCode } from "./actions/onVerifyResetCode";
import { onRequestPasswordCode } from "./actions/onRequestPasswordCode";
import { onDriverOnboarding } from "./actions/onDriverOnboarding";

type nextStep = "VERIFY" | "HOME" | "DRIVER_ONBOARDING" | "WELCOME";

type State = {
    user: null | {
        full_name: string;
        email: string;
        phone_number: string;
        role: string;
    };
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
    onRequestVerificationCode: any;
    onVerifyCode: any;
    onLogout: any;
    onResetPassword: any;
    onVerifyResetCode: any;
    onRequestResetPassword: any;
    onDriverOnboarding: any;
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
        loading: true,
        nextStep: "WELCOME",
    });

    useEffect(() => {
        const getUser = async () => {
            const authState = await SecureStore.getItemAsync("authState");
            console.log(authState);
            // _ CLEAR AUTH STATE:
            // SecureStore.deleteItemAsync("authState");
            if (authState) {
                const parsed = JSON.parse(authState);
                setState({
                    user: parsed.user,
                    tokens: parsed.tokens,
                    loading: false,
                    nextStep: parsed.nextStep,
                });
            } else {
                setState({
                    user: null,
                    tokens: { access_token: null, refresh_token: null },
                    loading: false,
                    nextStep: "WELCOME",
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
            }) => {
                onRegister({ credentials, setState });
            },
            onRequestVerificationCode: ({
                type,
                credential,
            }: {
                type: "email" | "phone_number";
                credential: string;
            }) => onRequestVerificationCode({ type, credential, setState }),
            onVerifyCode: ({ code }: { code: string }) =>
                onVerifyCode({ code, setState }),
            onLogout: () => onLogout({ setState }),
            onRequestResetPassword: ({
                type,
                credential,
            }: {
                type: "email" | "phone_number";
                credential: string;
            }) => onRequestPasswordCode({ type, credential, setState }),
            onVerifyResetCode: (code: string) =>
                onVerifyResetCode({ code, setState }),
            onResetPassword: ({
                credential,
                code,
                new_password,
            }: {
                credential: string;
                code: string;
                new_password: string;
            }) => onResetPassword({ credential, code, new_password, setState }),
            onDriverOnboarding: (data: {
                car_plate: {
                    numbers: string;
                    letters: string;
                };
                car_model: string;
                car_color: string;
                active_period: {
                    start: string;
                    end: string;
                };
                active_all_day: boolean;
                areas: {
                    name: string;
                    location: {
                        longitude: number;
                        latitude: number;
                    };
                }[];
                setState: any;
            }) => onDriverOnboarding({ ...data, setState }),
        }),
        [state]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
