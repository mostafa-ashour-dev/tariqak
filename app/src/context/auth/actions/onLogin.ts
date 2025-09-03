import axiosInstance from "app/axios/instance";
import * as SecureStore from "expo-secure-store";

type Props = {
    credentials: {
        credential: string;
        password: string;
    };
    setState: any;
};

export const onLogin = async ({ credentials, setState }: Props) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            credential: credentials.credential,
            password: credentials.password,
        });

        const { data } = response;

        if (response.status === 200) {
            const user = data.data.user;
            let nextStep: "DRIVER_ONBOARDING" | "HOME" = "HOME";

            if (user.role === "driver" && !user.is_onboarded) {
                nextStep = "DRIVER_ONBOARDING";
            }

            setState((prev: any) => ({
                ...prev,
                user,
                is_verified: user.is_verified,
                tokens: data.data.tokens,
                nextStep,
            }));

            const authState = {
                user,
                is_verified: user.is_verified,
                tokens: data.data.tokens,
                nextStep,
            };

            await SecureStore.setItemAsync(
                "authState",
                JSON.stringify(authState)
            );
        }
    } catch (error: Error | any) {
        throw new Error(error.message as string);
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
