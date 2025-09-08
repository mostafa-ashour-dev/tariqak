import axiosInstance from "app/axios/instance";
import * as SecureStore from "expo-secure-store";

type Props = {
    setState: any;
};

export const onLogout = async ({ setState }: Props) => {
    const state = {
        user: null,
        nextStep: "WELCOME",
        tokens: { refresh_token: null, access_token: null },
    };

    setState(state);

    await SecureStore.setItemAsync("authState", JSON.stringify(state));
    return {
        success: true,
    };
    try {
        const response = await axiosInstance.post("/auth/logout");

        if (response.status === 200) {
            const state = {
                user: null,
                nextStep: "WELCOME",
                tokens: { refresh_token: null, access_token: null },
            };

            setState(state);

            await SecureStore.setItemAsync("authState", JSON.stringify(state));
            return {
                success: true,
            };
        }
    } catch (error) {
        // @ts-ignore

        throw new Error(error.message as string);
    }
};
