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
    // const user = {
    //     full_name: credentials.credential,
    //     phone_number: credentials.credential,
    //     email: credentials.credential,
    //     password: credentials.password,
    //     role: "driver",
    //     is_onboarded: false,
    // };
    // const tokens = {
    //     access_token: "ACCESS_TOKEN",
    //     refresh_token: "REFRESH_TOKEN",
    // };
    // let nextStep: "DRIVER_ONBOARDING" | "HOME" | "VERIFY" = "HOME";

    // if (user.role === "driver" && !user.is_onboarded) {
    //     nextStep = "DRIVER_ONBOARDING";
    // }

    // setState((prev: any) => ({
    //     ...prev,
    //     user,
    //     tokens: tokens,
    //     nextStep,
    // }));

    // const authState = {
    //     user,
    //     tokens: tokens,
    //     nextStep,
    // };

    // await SecureStore.setItemAsync("authState", JSON.stringify(authState));
    // return;
    try {
        const response = await axiosInstance.post("/auth/login", {
            credential: credentials.credential,
            password: credentials.password,
        });

        const { data } = response;

        if (response.status === 200) {
            const user = data?.data?.user;
            let nextStep: "DRIVER_ONBOARDING" | "HOME" | "VERIFY" = "HOME";

            if (user.role === "driver" && !user.is_onboarded) {
                nextStep = "DRIVER_ONBOARDING";
            }

            setState((prev: any) => ({
                ...prev,
                user,
                tokens: data?.data?.tokens,
                nextStep,
            }));

            const authState = {
                user,
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
